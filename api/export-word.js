/**
 * VERCEL SERVERLESS FUNCTION: /api/export-word
 * Xuất đề thi Microsoft Word (.docx) chuẩn Toán học
 * - Hỗ trợ cả Word Equation (OMML <m:oMath>) và MathType OLE (Equation.DSMT4 / MTEF)
 * - Tách và dịch chuẩn xác $...$ và $$...$$ thành Word Equation, không bị lỗi khoảng trắng, không cần Toggle TeX
 * - Định dạng văn bản font Times New Roman 12pt, chia cột chuẩn cho các phương án A, B, C, D
 * - Trả về binary buffer với Content-Disposition: attachment; filename="De_Thi_AI.docx"
 */

const docx = require('docx');
const JSZip = require('jszip');
const CFB = require('cfb');

// =========================================================================
// 1. CHUẨN HÓA VÀ SANITIZE MÃ LATEX
// =========================================================================

function sanitizeLatex(str) {
  if (!str) return '';
  let text = String(str);

  // a. Chuyển \dfrac và \tfrac về \frac chuẩn
  text = text.replace(/\\dfrac\b/g, '\\frac')
             .replace(/\\tfrac\b/g, '\\frac');

  // b. Xử lý triệt để vô cực: Thay toàn bộ biến thể thành Unicode '∞' (U+221E)
  text = text.replace(/\\in\s*fty/g, '∞')
             .replace(/∈\s*fty/g, '∞')
             .replace(/\\in\s*finity/gi, '∞')
             .replace(/\\pm\\infty\b/g, '±∞')
             .replace(/\\mp\\infty\b/g, '∓∞')
             .replace(/\+\\infty\b/g, '+∞')
             .replace(/-\\infty\b/g, '-∞')
             .replace(/\\infty\b/g, '∞');

  // c. Chuẩn hóa phép nhân, dấu cộng trừ, quan hệ so sánh
  text = text.replace(/\\cdot\b/g, '·')
             .replace(/\\times\b/g, '×')
             .replace(/\\pm\b/g, '±')
             .replace(/\\mp\b/g, '∓')
             .replace(/\\geq\b/g, '≥')
             .replace(/\\ge\b/g, '≥')
             .replace(/\\leq\b/g, '≤')
             .replace(/\\le\b/g, '≤')
             .replace(/\\neq\b/g, '≠')
             .replace(/\\ne\b/g, '≠');

  // d. Chuẩn hóa các quan hệ tập hợp, logic, mũi tên
  text = text.replace(/\\approx\b/g, '≈')
             .replace(/\\equiv\b/g, '≡')
             .replace(/\\forall\b/g, '∀')
             .replace(/\\exists\b/g, '∃')
             .replace(/\\notin\b/g, '∉')
             .replace(/\\in\b/g, '∈')
             .replace(/\\subset\b/g, '⊂')
             .replace(/\\subseteq\b/g, '⊆')
             .replace(/\\supset\b/g, '⊃')
             .replace(/\\supseteq\b/g, '⊇')
             .replace(/\\cup\b/g, '∪')
             .replace(/\\cap\b/g, '∩')
             .replace(/\\emptyset\b/g, '∅')
             .replace(/\\rightarrow\b/g, '→')
             .replace(/\\to\b/g, '→')
             .replace(/\\leftarrow\b/g, '←')
             .replace(/\\leftrightarrow\b/g, '↔')
             .replace(/\\Rightarrow\b/g, '⇒')
             .replace(/\\Leftarrow\b/g, '⇐')
             .replace(/\\Leftrightarrow\b/g, '⇔');

  // e. Ký hiệu tập hợp số
  text = text.replace(/\\mathbb\{R\}|\\mathbf\{R\}/g, 'ℝ')
             .replace(/\\mathbb\{N\}|\\mathbf\{N\}/g, 'ℕ')
             .replace(/\\mathbb\{Z\}|\\mathbf\{Z\}/g, 'ℤ')
             .replace(/\\mathbb\{Q\}|\\mathbf\{Q\}/g, 'ℚ')
             .replace(/\\mathbb\{C\}|\\mathbf\{C\}/g, 'ℂ');

  // f. Chuẩn hóa các dấu ngoặc LaTeX
  text = text.replace(/\\left\(/g, '(')
             .replace(/\\right\)/g, ')')
             .replace(/\\left\[/g, '[')
             .replace(/\\right\]/g, ']')
             .replace(/\\left\\\{/g, '{')
             .replace(/\\right\\\}/g, '}')
             .replace(/\\left\|/g, '|')
             .replace(/\\right\|/g, '|')
             .replace(/\\left\./g, '')
             .replace(/\\right\./g, '')
             .replace(/\\\{/g, '{')
             .replace(/\\\}/g, '}');

  // g. Khoảng trắng LaTeX
  text = text.replace(/\\quad\b/g, '   ')
             .replace(/\\qquad\b/g, '      ')
             .replace(/\\,/g, ' ')
             .replace(/\\;/g, ' ')
             .replace(/\\:/g, ' ')
             .replace(/\\!/g, '');

  // h. Xử lý phân số rút gọn
  text = text.replace(/\\frac\s*([0-9a-zA-Z])\s*([0-9a-zA-Z])/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');
  text = text.replace(/\\frac\s*\{([^{}]+)\}\s*([0-9a-zA-Z])/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');
  text = text.replace(/\\frac\s*([0-9a-zA-Z])\s*\{([^{}]+)\}/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');

  return text;
}

const GREEK_AND_MATH_SYMBOLS = {
  '\\infty': '∞',
  '\\pm\\infty': '±∞',
  '\\mp\\infty': '∓∞',
  '+\\infty': '+∞',
  '-\\infty': '-∞',
  '\\notin': '∉',
  '\\subseteq': '⊆',
  '\\supseteq': '⊇',
  '\\subsetneq': '⊊',
  '\\supsetneq': '⊋',
  '\\rightarrow': '→',
  '\\leftarrow': '←',
  '\\leftrightarrow': '↔',
  '\\Rightarrow': '⇒',
  '\\Leftarrow': '⇐',
  '\\Leftrightarrow': '⇔',
  '\\approx': '≈',
  '\\partial': '∂',
  '\\nabla': '∇',
  '\\degree': '°',
  '\\circ': '°',
  '\\forall': '∀',
  '\\exists': '∃',
  '\\emptyset': '∅',
  '\\times': '×',
  '\\cdot': '·',
  '\\neq': '≠',
  '\\ne': '≠',
  '\\leq': '≤',
  '\\le': '≤',
  '\\geq': '≥',
  '\\ge': '≥',
  '\\sim': '∼',
  '\\subset': '⊂',
  '\\supset': '⊃',
  '\\cup': '∪',
  '\\cap': '∩',
  '\\pm': '±',
  '\\mp': '∓',
  '\\to': '→',
  '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ', '\\Delta': 'Δ',
  '\\pi': 'π', '\\theta': 'θ', '\\lambda': 'λ', '\\sigma': 'σ', '\\omega': 'ω',
  '\\Omega': 'Ω', '\\phi': 'φ', '\\Phi': 'Φ', '\\epsilon': 'ε', '\\mu': 'μ',
  '\\mathbb{R}': 'ℝ', '\\mathbb{N}': 'ℕ', '\\mathbb{Z}': 'ℤ', '\\mathbb{Q}': 'ℚ', '\\mathbb{C}': 'ℂ',
  '\\in': '∈',
  '\\%': '%'
};

function findBalancedBraces(str, startIdx) {
  if (str[startIdx] !== '{') return null;
  let depth = 0;
  for (let i = startIdx; i < str.length; i++) {
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
      depth--;
      if (depth === 0) {
        return { content: str.substring(startIdx + 1, i), endIdx: i };
      }
    }
  }
  return null;
}

// =========================================================================
// 2. PARSER LATEX -> DOCX.MATH (OMML)
// =========================================================================

function parseLatexTokensToDocxMath(latexStr) {
  if (!latexStr) return [new docx.MathRun('')];

  let s = sanitizeLatex(latexStr).trim();

  // Ký hiệu vô cực
  s = s.replace(/\\in\s*fty/g, '∞')
       .replace(/∈\s*fty/g, '∞')
       .replace(/\\infty/g, '∞');

  const sortedKeys = Object.keys(GREEK_AND_MATH_SYMBOLS).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (s.includes(key)) {
      s = s.split(key).join(GREEK_AND_MATH_SYMBOLS[key]);
    }
  }

  s = s.replace(/\\quad/g, '   ')
       .replace(/\\qquad/g, '      ')
       .replace(/\\,/g, ' ')
       .replace(/\\;/g, ' ')
       .replace(/\\:/g, ' ')
       .replace(/\\!/g, '');

  function buildNodes(text) {
    const nodes = [];
    let i = 0;
    let textBuf = '';

    function flush() {
      if (textBuf.length > 0) {
        nodes.push(new docx.MathRun(textBuf));
        textBuf = '';
      }
    }

    while (i < text.length) {
      // 1. Phân số \frac{a}{b} hoặc \dfrac{a}{b}
      if (text.startsWith('\\frac', i) || text.startsWith('\\dfrac', i)) {
        flush();
        const cmdLen = text.startsWith('\\dfrac', i) ? 6 : 5;
        let next = i + cmdLen;
        while (text[next] === ' ') next++;
        const num = findBalancedBraces(text, next);
        if (num) {
          let denIdx = num.endIdx + 1;
          while (text[denIdx] === ' ') denIdx++;
          const den = findBalancedBraces(text, denIdx);
          if (den) {
            nodes.push(new docx.MathFraction({
              numerator: buildNodes(num.content),
              denominator: buildNodes(den.content)
            }));
            i = den.endIdx + 1;
            continue;
          }
        }
      }

      // 2. Căn thức \sqrt{...} hoặc \sqrt[n]{...}
      if (text.startsWith('\\sqrt', i)) {
        flush();
        let next = i + 5;
        while (text[next] === ' ') next++;
        let degreeStr = null;
        if (text[next] === '[') {
          const closeBracket = text.indexOf(']', next);
          if (closeBracket !== -1) {
            degreeStr = text.substring(next + 1, closeBracket);
            next = closeBracket + 1;
          }
        }
        while (text[next] === ' ') next++;
        const base = findBalancedBraces(text, next);
        if (base) {
          const radOpts = { children: buildNodes(base.content) };
          if (degreeStr) {
            radOpts.degree = buildNodes(degreeStr);
          }
          nodes.push(new docx.MathRadical(radOpts));
          i = base.endIdx + 1;
          continue;
        }
      }

      // 3. Tích phân \int_{a}^{b}
      if (text.startsWith('\\int', i)) {
        flush();
        let next = i + 4;
        let subStr = '', supStr = '';
        while (text[next] === ' ') next++;
        if (text[next] === '_' || text[next] === '^') {
          const isSub = (text[next] === '_');
          next++;
          if (text[next] === '{') {
            const b = findBalancedBraces(text, next);
            if (b) { if (isSub) subStr = b.content; else supStr = b.content; next = b.endIdx + 1; }
          } else {
            if (isSub) subStr = text[next] || ''; else supStr = text[next] || '';
            next++;
          }
          while (text[next] === ' ') next++;
          if (text[next] === '_' || text[next] === '^') {
            const isSecondSub = (text[next] === '_');
            next++;
            if (text[next] === '{') {
              const b = findBalancedBraces(text, next);
              if (b) { if (isSecondSub) subStr = b.content; else supStr = b.content; next = b.endIdx + 1; }
            } else {
              if (isSecondSub) subStr = text[next] || ''; else supStr = text[next] || '';
              next++;
            }
          }
        }

        const intOpts = { children: [new docx.MathRun(' ')] };
        if (subStr) intOpts.subScript = buildNodes(subStr);
        if (supStr) intOpts.superScript = buildNodes(supStr);
        nodes.push(new docx.MathIntegral(intOpts));
        i = next;
        continue;
      }

      // 4. Tổng \sum
      if (text.startsWith('\\sum', i)) {
        flush();
        let next = i + 4;
        let subStr = '', supStr = '';
        while (text[next] === ' ') next++;
        if (text[next] === '_' || text[next] === '^') {
          const isSub = (text[next] === '_');
          next++;
          if (text[next] === '{') {
            const b = findBalancedBraces(text, next);
            if (b) { if (isSub) subStr = b.content; else supStr = b.content; next = b.endIdx + 1; }
          } else {
            if (isSub) subStr = text[next] || ''; else supStr = text[next] || '';
            next++;
          }
        }
        const sumOpts = { children: [new docx.MathRun(' ')] };
        if (subStr) sumOpts.subScript = buildNodes(subStr);
        if (supStr) sumOpts.superScript = buildNodes(supStr);
        nodes.push(new docx.MathSum(sumOpts));
        i = next;
        continue;
      }

      // 5. Số mũ ^ và Chỉ số dưới _
      if (text[i] === '^' || text[i] === '_') {
        const isSup = (text[i] === '^');
        flush();
        let lastNode = nodes.pop();
        if (!lastNode) {
          lastNode = new docx.MathRun('');
        }

        let firstArg = '';
        let next = i + 1;
        while (text[next] === ' ') next++;
        if (text[next] === '{') {
          const b = findBalancedBraces(text, next);
          if (b) {
            firstArg = b.content;
            next = b.endIdx + 1;
          }
        } else {
          firstArg = text[next] || '';
          next = next + 1;
        }

        let hasSecond = false;
        let secondIdx = next;
        while (text[secondIdx] === ' ') secondIdx++;
        if ((isSup && text[secondIdx] === '_') || (!isSup && text[secondIdx] === '^')) {
          let secondArg = '';
          let sNext = secondIdx + 1;
          while (text[sNext] === ' ') sNext++;
          if (text[sNext] === '{') {
            const b = findBalancedBraces(text, sNext);
            if (b) {
              secondArg = b.content;
              next = b.endIdx + 1;
              hasSecond = true;
            }
          } else {
            secondArg = text[sNext] || '';
            next = sNext + 1;
            hasSecond = true;
          }

          if (hasSecond) {
            nodes.push(new docx.MathSubSuperScript({
              children: [lastNode],
              subScript: buildNodes(isSup ? secondArg : firstArg),
              superScript: buildNodes(isSup ? firstArg : secondArg)
            }));
            i = next;
            continue;
          }
        }

        if (isSup) {
          nodes.push(new docx.MathSuperScript({
            children: [lastNode],
            superScript: buildNodes(firstArg)
          }));
        } else {
          nodes.push(new docx.MathSubScript({
            children: [lastNode],
            subScript: buildNodes(firstArg)
          }));
        }
        i = next;
        continue;
      }

      // 6. Text Run \text{...}
      if (text.startsWith('\\text', i) || text.startsWith('\\mathrm', i)) {
        flush();
        const cmdLen = text.startsWith('\\mathrm', i) ? 7 : 5;
        let next = i + cmdLen;
        while (text[next] === ' ') next++;
        const t = findBalancedBraces(text, next);
        if (t) {
          nodes.push(new docx.MathRun(t.content));
          i = t.endIdx + 1;
          continue;
        }
      }

      // 7. Vector \vec{AB}
      if (text.startsWith('\\vec', i)) {
        flush();
        let next = i + 4;
        while (text[next] === ' ') next++;
        const v = findBalancedBraces(text, next);
        if (v) {
          nodes.push(new docx.MathRun(v.content + '⃗'));
          i = v.endIdx + 1;
          continue;
        }
      }

      // 8. Các hàm lượng giác & giải tích
      const funcs = ['\\sin', '\\cos', '\\tan', '\\cot', '\\lim', '\\ln', '\\log', '\\max', '\\min'];
      let foundFunc = false;
      for (const fn of funcs) {
        if (text.startsWith(fn, i)) {
          flush();
          nodes.push(new docx.MathRun(fn.substring(1) + ' '));
          i += fn.length;
          foundFunc = true;
          break;
        }
      }
      if (foundFunc) continue;

      // Ký tự thường
      textBuf += text[i];
      i++;
    }

    flush();
    return nodes;
  }

  return buildNodes(s);
}

function createDocxMathObject(latexStr, options = {}) {
  const baseSize = options.size || 24;
  const cleanLatex = sanitizeLatex(latexStr).trim();

  if (!cleanLatex) {
    return new docx.MathRun('');
  }

  try {
    const children = parseLatexTokensToDocxMath(cleanLatex);
    if (!children || children.length === 0) {
      throw new Error('Empty parsed tokens');
    }
    return new docx.Math({ children: children });
  } catch (err) {
    return new docx.TextRun({
      text: `$${cleanLatex}$`,
      font: 'Cambria Math',
      size: baseSize,
      color: options.color || '000000'
    });
  }
}

function splitTextAndMathRuns(rawText, options = {}, context = null) {
  if (!rawText) return [];

  rawText = sanitizeLatex(rawText);

  const elements = [];
  const baseFont = options.font || 'Times New Roman';
  const baseSize = options.size || 24; // 12pt
  const isBold = options.bold || false;
  const isItalic = options.italics || false;
  const color = options.color || '000000';

  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(rawText)) !== null) {
    if (match.index > lastIndex) {
      const textPart = rawText.substring(lastIndex, match.index);
      elements.push(new docx.TextRun({
        text: textPart,
        font: baseFont,
        size: baseSize,
        bold: isBold,
        italics: isItalic,
        color: color
      }));
    }

    const formulaToken = match[0];
    let latexCode = formulaToken;
    if (formulaToken.startsWith('$$') && formulaToken.endsWith('$$')) {
      latexCode = formulaToken.substring(2, formulaToken.length - 2);
    } else if (formulaToken.startsWith('\\[') && formulaToken.endsWith('\\]')) {
      latexCode = formulaToken.substring(2, formulaToken.length - 2);
    } else if (formulaToken.startsWith('$') && formulaToken.endsWith('$')) {
      latexCode = formulaToken.substring(1, formulaToken.length - 1);
    } else if (formulaToken.startsWith('\\(') && formulaToken.endsWith('\\)')) {
      latexCode = formulaToken.substring(2, formulaToken.length - 2);
    }

    if (context && context.renderMode === 'mathtype' && context.formulaRegistry) {
      const fId = context.formulaRegistry.length + 1;
      const cleanF = sanitizeLatex(latexCode);
      context.formulaRegistry.push({
        id: fId,
        latexCode: latexCode,
        cleanLatex: cleanF
      });
      elements.push(new docx.TextRun({
        text: `[[MATHTYPE_EQ_${fId}]]`,
        font: 'Cambria Math',
        size: baseSize
      }));
    } else {
      const mathComponent = createDocxMathObject(latexCode, { size: baseSize, color: color });
      elements.push(mathComponent);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < rawText.length) {
    const remainingText = rawText.substring(lastIndex);
    elements.push(new docx.TextRun({
      text: remainingText,
      font: baseFont,
      size: baseSize,
      bold: isBold,
      italics: isItalic,
      color: color
    }));
  }

  return elements;
}

// =========================================================================
// 3. MATHTYPE OLE PACKAGER (EQUATION.DSMT4 / MTEF v3)
// =========================================================================

function buildMtefFromLatex(latexStr) {
  const bytes = [];
  bytes.push(0x03, 0x01, 0x01, 0x01, 0x00); // MTEF v3 Header
  bytes.push(0x07, 0x00, 0x0C, 0x00); // 12pt

  function pushChar(ch, fontStyle = 0x00) {
    bytes.push(0x02, fontStyle);
    const code = ch.charCodeAt(0);
    if (code <= 0xFF) {
      bytes.push(code);
    } else {
      bytes.push(code & 0xFF, (code >> 8) & 0xFF);
    }
  }

  function parseLine(str) {
    bytes.push(0x01, 0x00);
    let i = 0;
    while (i < str.length) {
      const ch = str[i];
      if (ch === '^') {
        i++;
        let sup = '';
        if (str[i] === '{') {
          let depth = 1; i++;
          while (i < str.length && depth > 0) {
            if (str[i] === '{') depth++;
            else if (str[i] === '}') depth--;
            if (depth > 0) sup += str[i];
            i++;
          }
        } else {
          sup = str[i] || '';
          i++;
        }
        bytes.push(0x03, 0x02, 0x00);
        parseLine(sup);
        bytes.push(0x00);
        continue;
      }
      if (ch === '_') {
        i++;
        let sub = '';
        if (str[i] === '{') {
          let depth = 1; i++;
          while (i < str.length && depth > 0) {
            if (str[i] === '{') depth++;
            else if (str[i] === '}') depth--;
            if (depth > 0) sub += str[i];
            i++;
          }
        } else {
          sub = str[i] || '';
          i++;
        }
        bytes.push(0x03, 0x03, 0x00);
        parseLine(sub);
        bytes.push(0x00);
        continue;
      }
      if (str.startsWith('\\frac', i)) {
        i += 5;
        while (str[i] === ' ') i++;
        let num = '', den = '';
        if (str[i] === '{') {
          let depth = 1; i++;
          while (i < str.length && depth > 0) {
            if (str[i] === '{') depth++;
            else if (str[i] === '}') depth--;
            if (depth > 0) num += str[i];
            i++;
          }
        }
        while (str[i] === ' ') i++;
        if (str[i] === '{') {
          let depth = 1; i++;
          while (i < str.length && depth > 0) {
            if (str[i] === '{') depth++;
            else if (str[i] === '}') depth--;
            if (depth > 0) den += str[i];
            i++;
          }
        }
        bytes.push(0x03, 0x00, 0x00);
        parseLine(num);
        parseLine(den);
        bytes.push(0x00);
        continue;
      }
      if (str.startsWith('\\sqrt', i)) {
        i += 5;
        while (str[i] === ' ') i++;
        let rad = '';
        if (str[i] === '{') {
          let depth = 1; i++;
          while (i < str.length && depth > 0) {
            if (str[i] === '{') depth++;
            else if (str[i] === '}') depth--;
            if (depth > 0) rad += str[i];
            i++;
          }
        }
        bytes.push(0x03, 0x01, 0x00);
        parseLine(rad);
        bytes.push(0x00);
        continue;
      }
      pushChar(ch);
      i++;
    }
    bytes.push(0x00);
  }

  parseLine(latexStr);
  bytes.push(0x00);
  return Buffer.from(bytes);
}

function buildMathTypeOleCompoundFile(mtefBytes) {
  const compObj = [
    0x01, 0x00, 0xFE, 0xFF, 0x03, 0x0A, 0x00, 0x00,
    0xFF, 0xFF, 0xFF, 0xFF,
    0x02, 0xCE, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00,
    0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x46,
    0x16, 0x00, 0x00, 0x00
  ];
  for (let c of 'MathType 6.0 Equation\0') compObj.push(c.charCodeAt(0));
  compObj.push(0x0C, 0x00, 0x00, 0x00);
  for (let c of 'MathType EF\0') compObj.push(c.charCodeAt(0));
  compObj.push(0x0F, 0x00, 0x00, 0x00);
  for (let c of 'Equation.DSMT4\0') compObj.push(c.charCodeAt(0));
  compObj.push(0x00, 0x00, 0x00, 0x00);

  const objInfo = [0x00, 0x00, 0x03, 0x00, 0x0D, 0x00];

  const hdr = Buffer.alloc(28);
  hdr.writeUInt16LE(28, 0);
  hdr.writeUInt32LE(0x00020000, 2);
  hdr.writeUInt16LE(2, 6);
  hdr.writeUInt32LE(mtefBytes.length, 8);

  const eqNative = Buffer.concat([hdr, mtefBytes]);

  const cfb = CFB.utils.cfb_new();
  CFB.utils.cfb_add(cfb, '\u0001CompObj', Buffer.from(compObj));
  CFB.utils.cfb_add(cfb, '\u0003ObjInfo', Buffer.from(objInfo));
  CFB.utils.cfb_add(cfb, 'Equation Native', eqNative);
  return Buffer.from(CFB.write(cfb, { type: 'buffer' }));
}

async function injectMathTypeOleObjects(buffer, formulaRegistry) {
  if (!formulaRegistry || formulaRegistry.length === 0) return buffer;
  try {
    const zip = await JSZip.loadAsync(buffer);

    let ct = await zip.file('[Content_Types].xml').async('text');
    if (!ct.includes('Extension="bin"')) {
      ct = ct.replace('</Types>', '<Default Extension="bin" ContentType="application/vnd.openxmlformats-officedocument.oleObject"/></Types>');
      zip.file('[Content_Types].xml', ct);
    }

    let docXml = await zip.file('word/document.xml').async('text');
    if (!docXml.includes('xmlns:v=')) {
      docXml = docXml.replace('<w:document ', '<w:document xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" ');
    }

    let docRels = await zip.file('word/_rels/document.xml.rels').async('text');
    let newRels = '';

    const fallbackPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

    for (let idx = 0; idx < formulaRegistry.length; idx++) {
      const item = formulaRegistry[idx];
      const fId = item.id;
      const oleRelId = `rIdMathOle${fId}`;
      const imgRelId = `rIdMathImg${fId}`;

      const mtefBytes = buildMtefFromLatex(item.cleanLatex);
      const oleBin = buildMathTypeOleCompoundFile(mtefBytes);
      zip.file(`word/embeddings/oleObject${fId}.bin`, oleBin);
      zip.file(`word/media/image_math_${fId}.png`, fallbackPng);

      newRels += `
        <Relationship Id="${oleRelId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/oleObject" Target="embeddings/oleObject${fId}.bin"/>
        <Relationship Id="${imgRelId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image_math_${fId}.png"/>
      `;

      const approxWidth = Math.max(36, Math.min(300, Math.round((item.cleanLatex.length * 8.5))));
      const approxHeight = item.cleanLatex.includes('\\frac') ? 34 : 18;

      const oleXml = `
        <w:object w:dxaOrig="${approxWidth * 20}" w:dyaOrig="${approxHeight * 20}">
          <v:shape id="_x0000_i${1000 + fId}" type="#_x0000_t75" style="width:${approxWidth}pt;height:${approxHeight}pt" o:ole="">
            <v:imagedata r:id="${imgRelId}" o:title=""/>
          </v:shape>
          <o:OLEObject Type="Embed" ProgID="Equation.DSMT4" ShapeID="_x0000_i${1000 + fId}" DrawAspect="Content" ObjectID="_${fId}" r:id="${oleRelId}"/>
        </w:object>
      `;

      const tokenRegex = new RegExp(`<w:r[^>]*>(?:(?!<\\/w:r>)[\\s\\S])*?\\[\\[MATHTYPE_EQ_${fId}\\]\\][\\s\\S]*?<\\/w:r>`);
      if (tokenRegex.test(docXml)) {
        docXml = docXml.replace(tokenRegex, `<w:r>${oleXml}</w:r>`);
      } else {
        docXml = docXml.replace(`[[MATHTYPE_EQ_${fId}]]`, oleXml);
      }
    }

    docRels = docRels.replace('</Relationships>', `${newRels}</Relationships>`);
    zip.file('word/_rels/document.xml.rels', docRels);
    zip.file('word/document.xml', docXml);

    return await zip.generateAsync({ type: 'nodebuffer' });
  } catch (err) {
    console.error('Lỗi injectMathTypeOleObjects:', err);
    return buffer;
  }
}

// =========================================================================
// 4. PARSE RAW TEXT SANG CẤU TRÚC ĐỀ THI
// =========================================================================

function parseRawTextToExam(rawText) {
  if (!rawText) {
    return { title: 'Đề thi Toán học AI', questions: [] };
  }

  // 1. Kiểm tra nếu rawText chứa JSON
  const jsonMatch = rawText.match(/\{[\s\S]*"questions"[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.questions && Array.isArray(parsed.questions)) {
        return parsed;
      }
    } catch (e) {
      // Tiếp tục parse text
    }
  }

  // 2. Parse text thành các câu hỏi
  const questions = [];
  let title = 'ĐỀ KIỂM TRA TOÁN HỌC';
  let duration = 45;

  const lines = rawText.split('\n');
  let currentQuestion = null;
  let qIndex = 0;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Nhận diện tiêu đề đề thi
    if (line.match(/^(ĐỀ\s+THI|ĐỀ\s+KIỂM\s+TRA|KIỂM\s+TRA)/i) && !currentQuestion) {
      title = line.replace(/[*#]/g, '').trim();
      continue;
    }

    // Nhận diện bắt đầu câu hỏi: Câu 1: / Câu 1. / Bài 1: / Question 1:
    const qMatch = line.match(/^(?:Câu|Bài|Question)\s*(\d+)[\.:\s]+(.*)$/i);
    if (qMatch) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      qIndex++;
      currentQuestion = {
        id: qIndex,
        questionText: qMatch[2] || '',
        content: qMatch[2] || '',
        options: [],
        correctAnswer: 'A',
        explanation: ''
      };
      continue;
    }

    // Nhận diện phương án A, B, C, D
    const optMatch = line.match(/^([A-D])[\.:\)]\s*(.*)$/);
    if (optMatch && currentQuestion) {
      currentQuestion.options.push({
        id: optMatch[1],
        text: optMatch[2] || ''
      });
      continue;
    }

    // Nhận diện lời giải / hướng dẫn giải / đáp án đúng
    const solMatch = line.match(/^(?:Lời\s*giải|Hướng\s*dẫn\s*giải|Giải\s*chi\s*tiết|Đáp\s*án\s*đúng|Chọn)[\.:\s]*(.*)$/i);
    if (solMatch && currentQuestion) {
      const explContent = solMatch[1] || '';
      currentQuestion.explanation = (currentQuestion.explanation ? currentQuestion.explanation + ' ' : '') + explContent;
      const ansMatch = explContent.match(/\b([A-D])\b/);
      if (ansMatch) currentQuestion.correctAnswer = ansMatch[1];
      continue;
    }

    // Nếu đang trong câu hỏi, append text vào câu hỏi hoặc lời giải
    if (currentQuestion) {
      if (currentQuestion.options.length > 0) {
        // Có thể là lời giải dòng tiếp theo
        currentQuestion.explanation = (currentQuestion.explanation ? currentQuestion.explanation + ' ' : '') + line;
      } else {
        currentQuestion.questionText = (currentQuestion.questionText ? currentQuestion.questionText + ' ' : '') + line;
        currentQuestion.content = currentQuestion.questionText;
      }
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  // Nếu không tách được câu nào theo dạng Câu 1, coi toàn bộ đoạn văn bản như 1 danh sách câu hỏi
  if (questions.length === 0) {
    const paragraphs = rawText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    paragraphs.forEach((p, idx) => {
      questions.push({
        id: idx + 1,
        questionText: p.trim(),
        content: p.trim(),
        options: [],
        correctAnswer: '',
        explanation: ''
      });
    });
  }

  return {
    title: title,
    durationMinutes: duration,
    questions: questions
  };
}

// =========================================================================
// 5. TẠO BẢNG CHIA CỘT PHƯƠNG ÁN A, B, C, D
// =========================================================================

function createOptionsLayoutTable(rawOptions, context = null) {
  if (!rawOptions || rawOptions.length === 0) return [];

  const options = rawOptions.map(opt => {
    if (typeof opt === 'string') {
      const m = opt.match(/^([A-D])[\.:\)]\s*(.*)$/);
      return m ? { id: m[1], text: m[2] } : { id: '', text: opt };
    }
    return { id: opt.id || '', text: opt.text || opt.content || '' };
  });

  const totalLength = options.reduce((sum, o) => sum + (o.text ? o.text.length : 0), 0);
  const avgLen = totalLength / options.length;
  const noBorder = {
    top: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' }
  };

  function createCell(opt, widthPercent) {
    const label = opt.id ? `${opt.id}. ` : '';
    const runs = [
      new docx.TextRun({ text: label, font: 'Times New Roman', size: 24, bold: true, color: '1d4ed8' }),
      ...splitTextAndMathRuns(opt.text, { font: 'Times New Roman', size: 24 }, context)
    ];
    return new docx.TableCell({
      width: { size: widthPercent, type: docx.WidthType.PERCENTAGE },
      borders: noBorder,
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [
        new docx.Paragraph({
          spacing: { line: 260 },
          children: runs
        })
      ]
    });
  }

  // 1 DÒNG 4 CỘT (Nếu các phương án ngắn gọn <= 25 ký tự)
  if (avgLen <= 25 && options.length === 4) {
    return [
      new docx.Table({
        width: { size: 100, type: docx.WidthType.PERCENTAGE },
        borders: noBorder,
        rows: [
          new docx.TableRow({
            children: [
              createCell(options[0], 25),
              createCell(options[1], 25),
              createCell(options[2], 25),
              createCell(options[3], 25)
            ]
          })
        ]
      })
    ];
  }

  // 2 DÒNG 2 CỘT (Nếu các phương án dài vừa phải <= 60 ký tự)
  if (avgLen <= 60 && options.length === 4) {
    return [
      new docx.Table({
        width: { size: 100, type: docx.WidthType.PERCENTAGE },
        borders: noBorder,
        rows: [
          new docx.TableRow({
            children: [
              createCell(options[0], 50),
              createCell(options[1], 50)
            ]
          }),
          new docx.TableRow({
            children: [
              createCell(options[2], 50),
              createCell(options[3], 50)
            ]
          })
        ]
      })
    ];
  }

  // 4 DÒNG ĐỘC LẬP (Nếu phương án dài hoặc không phải 4 phương án chuẩn)
  return options.map(opt => {
    const label = opt.id ? `${opt.id}. ` : '';
    const runs = [
      new docx.TextRun({ text: `    ${label}`, font: 'Times New Roman', size: 24, bold: true, color: '1d4ed8' }),
      ...splitTextAndMathRuns(opt.text, { font: 'Times New Roman', size: 24 }, context)
    ];
    return new docx.Paragraph({
      spacing: { before: 40, after: 40, line: 260 },
      children: runs
    });
  });
}

// =========================================================================
// 6. BẢNG TỔNG HỢP ĐÁP ÁN CUỐI ĐỀ
// =========================================================================

function createSummaryAnswerTable(questions) {
  if (!questions || questions.length === 0) return [];

  const tableRows = [];
  const chunkSize = 10;
  const borderStyle = {
    top: { style: docx.BorderStyle.SINGLE, size: 4, color: '94A3B8' },
    bottom: { style: docx.BorderStyle.SINGLE, size: 4, color: '94A3B8' },
    left: { style: docx.BorderStyle.SINGLE, size: 4, color: '94A3B8' },
    right: { style: docx.BorderStyle.SINGLE, size: 4, color: '94A3B8' }
  };

  for (let i = 0; i < questions.length; i += chunkSize) {
    const slice = questions.slice(i, i + chunkSize);

    // Dòng số thứ tự câu
    const numCells = slice.map(q => new docx.TableCell({
      borders: borderStyle,
      shading: { fill: 'F1F5F9' },
      margins: { top: 60, bottom: 60, left: 40, right: 40 },
      children: [
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          children: [new docx.TextRun({ text: String(q.id || (i + 1)), font: 'Times New Roman', size: 20, bold: true })]
        })
      ]
    }));

    // Dòng đáp án đúng (A, B, C, D)
    const ansCells = slice.map(q => new docx.TableCell({
      borders: borderStyle,
      margins: { top: 60, bottom: 60, left: 40, right: 40 },
      children: [
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          children: [new docx.TextRun({ text: q.correctAnswer || 'A', font: 'Times New Roman', size: 22, bold: true, color: 'DC2626' })]
        })
      ]
    }));

    tableRows.push(new docx.TableRow({ children: numCells }));
    tableRows.push(new docx.TableRow({ children: ansCells }));
  }

  return [
    new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      spacing: { before: 240, after: 120 },
      children: [
        new docx.TextRun({ text: 'BẢNG ĐÁP ÁN TRẮC NGHIỆM', font: 'Times New Roman', size: 24, bold: true, color: '1E40AF' })
      ]
    }),
    new docx.Table({
      alignment: docx.AlignmentType.CENTER,
      borders: borderStyle,
      rows: tableRows
    })
  ];
}

// =========================================================================
// 7. BUILD WORD DOCUMENT & BUFFER
// =========================================================================

async function generateDocxBuffer(examData, options = {}) {
  const isMathType = (options.format === 'mathtype');
  const includeSolutions = (options.includeSolutions !== false);
  const context = {
    renderMode: isMathType ? 'mathtype' : 'omml',
    formulaRegistry: []
  };

  const title = examData.title || 'ĐỀ THI TRẮC NGHIỆM TOÁN HỌC';
  const duration = examData.durationMinutes || 45;
  const questions = examData.questions || [];

  const docChildren = [];

  // HEADER: 2 CỘT (BỘ GD&ĐT / TRƯỜNG & ĐỀ THI)
  const headerBorders = {
    top: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: docx.BorderStyle.NONE, size: 0, color: 'FFFFFF' }
  };

  docChildren.push(new docx.Table({
    width: { size: 100, type: docx.WidthType.PERCENTAGE },
    borders: headerBorders,
    rows: [
      new docx.TableRow({
        children: [
          new docx.TableCell({
            width: { size: 45, type: docx.WidthType.PERCENTAGE },
            borders: headerBorders,
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new docx.TextRun({ text: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO', font: 'Times New Roman', size: 20 }),
                  new docx.TextRun({ text: '\nTRƯỜNG THPT / THCS CHUYÊN', font: 'Times New Roman', size: 20, bold: true })
                ]
              })
            ]
          }),
          new docx.TableCell({
            width: { size: 55, type: docx.WidthType.PERCENTAGE },
            borders: headerBorders,
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new docx.TextRun({ text: title.toUpperCase(), font: 'Times New Roman', size: 24, bold: true, color: '1e3a8a' }),
                  new docx.TextRun({ text: `\nThời gian làm bài: ${duration} phút (Không kể phát đề)`, font: 'Times New Roman', size: 20, italics: true }),
                  new docx.TextRun({ text: isMathType ? '\n(Bản công thức chuẩn MathType OLE)' : '\n(Bản công thức chuẩn Word Equation)', font: 'Times New Roman', size: 18, color: '64748b' })
                ]
              })
            ]
          })
        ]
      })
    ]
  }));

  // ĐƯỜNG KẺ NGANG TRANG TRÍ
  docChildren.push(new docx.Paragraph({
    alignment: docx.AlignmentType.CENTER,
    spacing: { before: 80, after: 180 },
    children: [
      new docx.TextRun({ text: '────────────────────────────────────────', font: 'Times New Roman', size: 18, color: '94a3b8' })
    ]
  }));

  // DANH SÁCH CÁC CÂU HỎI
  questions.forEach((q, idx) => {
    const qNum = q.id || (idx + 1);
    const qContent = q.content || q.questionText || '';

    // Dòng đề bài
    const questionRuns = [
      new docx.TextRun({ text: `Câu ${qNum}: `, font: 'Times New Roman', size: 24, bold: true, color: '1e3a8a' }),
      ...splitTextAndMathRuns(qContent, { font: 'Times New Roman', size: 24 }, context)
    ];

    docChildren.push(new docx.Paragraph({
      spacing: { before: 140, after: 80, line: 280 },
      children: questionRuns
    }));

    // Bảng/danh sách 4 đáp án A, B, C, D
    if (q.options && q.options.length > 0) {
      const optionElements = createOptionsLayoutTable(q.options, context);
      optionElements.forEach(el => docChildren.push(el));
    }

    // Lời giải chi tiết
    if (includeSolutions && (q.explanation || q.correctAnswer)) {
      const correctLabel = q.correctAnswer || 'A';
      const explText = q.explanation || 'Chưa có lời giải chi tiết.';

      const solutionRuns = [
        new docx.TextRun({ text: '  ➥ Chọn đáp án: ', font: 'Times New Roman', size: 22, bold: true, color: '15803d' }),
        new docx.TextRun({ text: `${correctLabel}. `, font: 'Times New Roman', size: 22, bold: true, color: '15803d' }),
        new docx.TextRun({ text: 'Lời giải: ', font: 'Times New Roman', size: 22, italics: true, bold: true }),
        ...splitTextAndMathRuns(explText, { font: 'Times New Roman', size: 22, italics: true, color: '334155' }, context)
      ];

      docChildren.push(new docx.Paragraph({
        spacing: { before: 80, after: 120, line: 260 },
        children: solutionRuns
      }));
    }

    docChildren.push(new docx.Paragraph({ spacing: { after: 60 }, children: [] }));
  });

  // BẢNG ĐÁP ÁN TỔNG HỢP CUỐI ĐỀ
  if (includeSolutions && questions.length > 0) {
    const summaryTable = createSummaryAnswerTable(questions);
    summaryTable.forEach(el => docChildren.push(el));
  }

  // LỜI KẾT
  docChildren.push(new docx.Paragraph({
    alignment: docx.AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new docx.TextRun({ text: '────────── HẾT ──────────', font: 'Times New Roman', size: 22, bold: true, color: '64748b' })
    ]
  }));

  // TẠO TÀI LIỆU DOCX VỚI KHỔ GIẤY A4
  const doc = new docx.Document({
    creator: 'LMS STEM AI Platform',
    title: title,
    description: isMathType ? 'Đề thi chuẩn MathType OLE' : 'Đề thi chuẩn Word Equation (OMML)',
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24 // 12pt
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906, // A4 width
              height: 16838 // A4 height
            },
            margin: {
              top: 1134,    // 2.0 cm
              bottom: 1134, // 2.0 cm
              left: 1417,   // 2.5 cm
              right: 1134   // 2.0 cm
            }
          }
        },
        children: docChildren
      }
    ]
  });

  let buffer = await docx.Packer.toBuffer(doc);

  if (isMathType && context.formulaRegistry.length > 0) {
    buffer = await injectMathTypeOleObjects(buffer, context.formulaRegistry);
  }

  return buffer;
}

// =========================================================================
// 8. VERCEL SERVERLESS FUNCTION HANDLER
// =========================================================================

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST để xuất file Word.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = { rawText: body };
      }
    } else if (!body) {
      body = {};
    }

    const rawText = body.rawText || body.text || '';
    const format = (body.format === 'mathtype') ? 'mathtype' : 'omml';
    const includeSolutions = (body.includeSolutions !== false);
    const filename = body.filename || 'De_Thi_AI.docx';

    let examData = body.examData;
    if (!examData || !examData.questions || examData.questions.length === 0) {
      examData = parseRawTextToExam(rawText);
    }
    if (body.title && (!examData.title || examData.title === 'ĐỀ KIỂM TRA TOÁN HỌC')) {
      examData.title = body.title;
    }

    const docBuffer = await generateDocxBuffer(examData, {
      format,
      includeSolutions,
      filename
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', docBuffer.length);

    return res.status(200).send(docBuffer);
  } catch (err) {
    console.error('[API /api/export-word] Error:', err);
    return res.status(500).json({
      error: 'Lỗi khi tạo file Word từ serverless function',
      message: err.message || String(err)
    });
  }
};
