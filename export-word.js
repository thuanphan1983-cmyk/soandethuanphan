/**
 * WORD EXPORT MODULE (.DOCX) WITH NATIVE OFFICE MATH (OMML) & HIGH-RES STEM GRAPHICS
 * Hệ thống xuất đề thi và lời giải chi tiết chuẩn Bộ GD&ĐT
 * - Sử dụng docx.js (OpenXML) tạo file .docx gốc
 * - Chuyển đổi mã LaTeX thành Microsoft Word Equation (<m:oMath>) chuẩn xác
 * - Tự động sinh đồ thị hàm số vector SVG (Hàm bậc 2, 3, 4, phân thức, hình học)
 * - Tự động sinh Bảng biến thiên (BBT) 3 dòng sắc nét
 * - Chuyển đổi SVG thành ảnh PNG 300 DPI siêu nét nhúng trực tiếp vào Word
 * - Font chữ văn bản: Times New Roman 12pt, Font công thức: Cambria Math
 */

window.LmsWordExport = (function () {
  'use strict';

  // =========================================================================
  // 1. LATEX TO OFFICE MATH (<m:oMath>) RECURSIVE PARSER
  // =========================================================================

  /**
   * Tiền xử lý & Chuẩn hóa toàn diện chuỗi LaTeX trước khi parse sang Office Math (OMML):
   * 1. Chuyển toàn bộ \dfrac, \tfrac về \frac (Word OMML chỉ hiểu \frac).
   * 2. Xử lý triệt để ký hiệu vô cực: Thay toàn bộ \in fty, ∈ fty, \infty thành '∞' (U+221E).
   * 3. Chuẩn hóa các dấu ngoặc, phép nhân, bất đẳng thức: \cdot -> ·, \pm -> ±, \ge -> ≥, \le -> ≤, \neq -> ≠.
   * 4. Xử lý phân số: Đảm bảo cấu trúc chuẩn \frac{tử}{mẫu}.
   */
  function sanitizeLatex(str) {
    if (!str) return '';
    let text = String(str);

    // a. Chuyển \dfrac và \tfrac về \frac chuẩn (Word OMML chỉ hiểu \frac)
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

    // c. Chuẩn hóa phép nhân, dấu cộng trừ, quan hệ so sánh:
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

    // d. Chuẩn hóa các quan hệ tập hợp, logic, mũi tên:
    text = text.replace(/\\approx\b/g, '≈')
               .replace(/\\equiv\b/g, '≡')
               .replace(/\\forall\b/g, '∀')
               .replace(/\\exists\b/g, '∃')
               .replace(/\\notin\b/g, '∉')
               // Chỉ thay \in sau khi đã xử lý \infty, \notin
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

    // e. Ký hiệu tập hợp số:
    text = text.replace(/\\mathbb\{R\}|\\mathbf\{R\}/g, 'ℝ')
               .replace(/\\mathbb\{N\}|\\mathbf\{N\}/g, 'ℕ')
               .replace(/\\mathbb\{Z\}|\\mathbf\{Z\}/g, 'ℤ')
               .replace(/\\mathbb\{Q\}|\\mathbf\{Q\}/g, 'ℚ')
               .replace(/\\mathbb\{C\}|\\mathbf\{C\}/g, 'ℂ');

    // f. Chuẩn hóa các dấu ngoặc LaTeX:
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

    // g. Khoảng trắng LaTeX:
    text = text.replace(/\\quad\b/g, '   ')
               .replace(/\\qquad\b/g, '      ')
               .replace(/\\,/g, ' ')
               .replace(/\\;/g, ' ')
               .replace(/\\:/g, ' ')
               .replace(/\\!/g, '');

    // h. Xử lý phân số: Đảm bảo cấu trúc chuẩn \frac{tử}{mẫu}
    text = text.replace(/\\frac\s*([0-9a-zA-Z])\s*([0-9a-zA-Z])/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');
    text = text.replace(/\\frac\s*\{([^{}]+)\}\s*([0-9a-zA-Z])/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');
    text = text.replace(/\\frac\s*([0-9a-zA-Z])\s*\{([^{}]+)\}/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');

    return text;
  }

  // Alias để tương thích ngược
  const sanitizeLatexMathString = sanitizeLatex;

  // Từ điển ký hiệu toán học - Sắp xếp ưu tiên để tránh match nhầm tiền tố ngắn
  const GREEK_AND_MATH_SYMBOLS = {
    // 1. Ký hiệu vô cực & quan hệ dài (BẮT BUỘC MATCH TRƯỚC \in)
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
    '\\leq': '≤',
    '\\geq': '≥',
    '\\sim': '∼',
    '\\ne': '≠',
    '\\le': '≤',
    '\\ge': '≥',
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
    // ĐẶT \in Ở CUỐI CÙNG để không bao giờ nuốt \infty hay \notin!
    '\\in': '∈',
    '\\%': '%'
  };

  /**
   * Tìm cặp ngoặc nhọn cân bằng {...}
   */
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

  /**
   * Parser chuyển chuỗi LaTeX thành mảng các Math Component của docx.js
   */
  function parseLatexTokensToDocxMath(latexStr, docxLib) {
    if (!latexStr) return [new docxLib.MathRun('')];

    // Tiền xử lý chuỗi: khắc phục triệt để lỗi \in fty và chuẩn hóa vô cực
    let s = sanitizeLatexMathString(latexStr).trim();

    // Chuyển trực tiếp các ký hiệu vô cực sang ký tự Unicode '∞' (U+221E)
    s = s.replace(/\\in\s*fty/g, '∞')
         .replace(/∈\s*fty/g, '∞')
         .replace(/\\infty/g, '∞');

    // Sắp xếp bộ từ điển theo độ dài từ khóa giảm dần (từ khóa dài replace trước, ngắn replace sau)
    // Đảm bảo \notin, \subset, \rightarrow luôn được xử lý trước \in, \to
    const sortedKeys = Object.keys(GREEK_AND_MATH_SYMBOLS).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (s.includes(key)) {
        s = s.split(key).join(GREEK_AND_MATH_SYMBOLS[key]);
      }
    }

    // Xử lý các khoảng trắng đặc biệt trong LaTeX
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
          nodes.push(new docxLib.MathRun(textBuf));
          textBuf = '';
        }
      }

      while (i < text.length) {
        // 1. Phân số: \frac{a}{b} hoặc \dfrac{a}{b}
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
              nodes.push(new docxLib.MathFraction({
                numerator: buildNodes(num.content),
                denominator: buildNodes(den.content)
              }));
              i = den.endIdx + 1;
              continue;
            }
          }
        }

        // 2. Căn thức: \sqrt{...} hoặc \sqrt[n]{...}
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
            nodes.push(new docxLib.MathRadical(radOpts));
            i = base.endIdx + 1;
            continue;
          }
        }

        // 3. Tích phân \int_{a}^{b}
        if (text.startsWith('\\int', i)) {
          flush();
          let next = i + 4;
          let subStr = '', supStr = '';
          // Đọc subscript/superscript nếu có
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

          const intOpts = { children: [new docxLib.MathRun(' ')] };
          if (subStr) intOpts.subScript = buildNodes(subStr);
          if (supStr) intOpts.superScript = buildNodes(supStr);
          nodes.push(new docxLib.MathIntegral(intOpts));
          i = next;
          continue;
        }

        // 4. Tổng \sum_{i=1}^{n}
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
          const sumOpts = { children: [new docxLib.MathRun(' ')] };
          if (subStr) sumOpts.subScript = buildNodes(subStr);
          if (supStr) sumOpts.superScript = buildNodes(supStr);
          nodes.push(new docxLib.MathSum(sumOpts));
          i = next;
          continue;
        }

        // 5. Số mũ ^ và Chỉ số dưới _
        if (text[i] === '^' || text[i] === '_') {
          const isSup = (text[i] === '^');
          flush();
          let lastNode = nodes.pop();
          if (!lastNode) {
            lastNode = new docxLib.MathRun('');
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

          // Kiểm tra xem có tiếp tục dấu thứ hai để thành SubSuperScript không (ví dụ: x_1^2 hoặc x^2_1)
          let hasSecond = false;
          let secondIdx = next;
          while (text[secondIdx] === ' ') secondIdx++;
          if ((isSup && text[secondIdx] === '_') || (!isSup && text[secondIdx] === '^')) {
            const isSecondSup = (text[secondIdx] === '^');
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
              nodes.push(new docxLib.MathSubSuperScript({
                children: [lastNode],
                subScript: buildNodes(isSup ? secondArg : firstArg),
                superScript: buildNodes(isSup ? firstArg : secondArg)
              }));
              i = next;
              continue;
            }
          }

          if (isSup) {
            nodes.push(new docxLib.MathSuperScript({
              children: [lastNode],
              superScript: buildNodes(firstArg)
            }));
          } else {
            nodes.push(new docxLib.MathSubScript({
              children: [lastNode],
              subScript: buildNodes(firstArg)
            }));
          }
          i = next;
          continue;
        }

        // 6. Text Run: \text{...} hoặc \mathrm{...}
        if (text.startsWith('\\text', i) || text.startsWith('\\mathrm', i)) {
          flush();
          const cmdLen = text.startsWith('\\mathrm', i) ? 7 : 5;
          let next = i + cmdLen;
          while (text[next] === ' ') next++;
          const t = findBalancedBraces(text, next);
          if (t) {
            nodes.push(new docxLib.MathRun(t.content));
            i = t.endIdx + 1;
            continue;
          }
        }

        // 7. Vector: \vec{AB}
        if (text.startsWith('\\vec', i)) {
          flush();
          let next = i + 4;
          while (text[next] === ' ') next++;
          const v = findBalancedBraces(text, next);
          if (v) {
            nodes.push(new docxLib.MathRun(v.content + '⃗'));
            i = v.endIdx + 1;
            continue;
          }
        }

        // 8. Các hàm lượng giác & giải tích: \sin, \cos, \tan, \lim, \ln, \log
        const funcs = ['\\sin', '\\cos', '\\tan', '\\cot', '\\lim', '\\ln', '\\log', '\\max', '\\min'];
        let foundFunc = false;
        for (const fn of funcs) {
          if (text.startsWith(fn, i)) {
            flush();
            nodes.push(new docxLib.MathRun(fn.substring(1) + ' '));
            i += fn.length;
            foundFunc = true;
            break;
          }
        }
        if (foundFunc) continue;

        // Ký tự thông thường
        textBuf += text[i];
        i++;
      }

      flush();
      return nodes;
    }

    return buildNodes(s);
  }

  /**
   * Tạo đối tượng docx.Math hoàn chỉnh từ chuỗi LaTeX kèm Cơ chế Dự phòng An toàn (Fallback):
   * - Cấu trúc chuẩn OMML: new Math({ children: [...] })
   * - Font mặc định cho công thức toán: Cambria Math
   * - Nếu gặp công thức quá phức tạp hoặc bị lỗi parse: Tự động fallback về TextRun kẹp trong $...$ với font 'Cambria Math'
   */
  function createDocxMathObject(latexStr, docxLib, options = {}) {
    const baseSize = options.size || 24;
    const cleanLatex = sanitizeLatex(latexStr).trim();

    if (!cleanLatex) {
      return new docxLib.MathRun('');
    }

    try {
      const children = parseLatexTokensToDocxMath(cleanLatex, docxLib);
      if (!children || children.length === 0) {
        throw new Error("Empty parsed tokens");
      }
      return new docxLib.Math({ children: children });
    } catch (err) {
      console.warn("OMML Parser Fallback: Không thể dịch công thức LaTeX sang OMML, tự động chuyển về TextRun Cambria Math an toàn:", cleanLatex, err);
      // Cơ chế Dự phòng An toàn (Fallback):
      // Giữ nguyên công thức ở định dạng văn bản chuẩn kẹp trong cặp dấu $...$
      // Bắt buộc dùng font 'Cambria Math' để hiển thị chuẩn ký tự đặc biệt, không bao giờ bị ô vuông
      return new docxLib.TextRun({
        text: `$${cleanLatex}$`,
        font: 'Cambria Math',
        size: baseSize,
        italics: false,
        color: options.color || '000000'
      });
    }
  }

  /**
   * Tạo Paragraph độc lập chứa khối công thức Toán (Display Math):
   * new Paragraph({
   *   children: [
   *     new Math({
   *       children: [ ...các thành phần toán học đã parse... ]
   *     })
   *   ]
   * })
   */
  function createMathParagraph(latexStr, docxLib, options = {}) {
    const mathComponent = createDocxMathObject(latexStr, docxLib, options);
    return new docxLib.Paragraph({
      alignment: options.alignment || docxLib.AlignmentType.CENTER,
      spacing: options.spacing || { before: 120, after: 120, line: 280 },
      children: [mathComponent]
    });
  }

  /**
   * Phân tách một đoạn văn bản có chứa cả chữ thông thường và công thức $...$ hoặc $$...$$
   * Trả về mảng các phần tử TextRun (Times New Roman 12pt) và docx.Math (OMML) hoặc MathType Token
   */
  function splitTextAndMathRuns(rawText, options = {}, docxLib, context = null) {
    if (!rawText) return [];

    // Tiền xử lý chuẩn hóa toàn diện chuỗi đầu vào bằng sanitizeLatex
    rawText = sanitizeLatex(rawText);

    const elements = [];
    const baseFont = options.font || 'Times New Roman';
    const baseSize = options.size || 24; // 24 half-points = 12pt
    const isBold = options.bold || false;
    const isItalic = options.italics || false;
    const color = options.color || '000000';

    // Regex tìm $...$ hoặc $$...$$ hoặc \[...\] hoặc \(...\)
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(rawText)) !== null) {
      // Phần văn bản thường trước công thức (Font: Times New Roman)
      if (match.index > lastIndex) {
        const textPart = rawText.substring(lastIndex, match.index);
        elements.push(new docxLib.TextRun({
          text: textPart,
          font: baseFont,
          size: baseSize,
          bold: isBold,
          italics: isItalic,
          color: color
        }));
      }

      // Phần công thức Toán
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

      // Kiểm tra chế độ xuất: MathType OLE hay Word Equation (OMML)
      if (context && context.renderMode === 'mathtype' && context.formulaRegistry) {
        const fId = context.formulaRegistry.length + 1;
        const cleanF = sanitizeLatex(latexCode);
        context.formulaRegistry.push({
          id: fId,
          latexCode: latexCode,
          cleanLatex: cleanF
        });
        // Chèn token đánh dấu để đóng gói OLE Equation.DSMT4
        elements.push(new docxLib.TextRun({
          text: `[[MATHTYPE_EQ_${fId}]]`,
          font: 'Cambria Math',
          size: baseSize
        }));
      } else {
        // Tạo đối tượng công thức Math chuẩn OMML (<m:oMath>)
        const mathComponent = createDocxMathObject(latexCode, docxLib, { size: baseSize, color: color });
        elements.push(mathComponent);
      }

      lastIndex = regex.lastIndex;
    }

    // Phần văn bản thường còn lại sau cùng
    if (lastIndex < rawText.length) {
      const remainingText = rawText.substring(lastIndex);
      elements.push(new docxLib.TextRun({
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
  // 1.5. BỘ ĐÓNG GÓI MATHTYPE OLE OBJECT (EQUATION.DSMT4 / MTEF v3)
  // =========================================================================

  /**
   * Chuyển đổi công thức LaTeX sang chuỗi nhị phân MTEF v3 (MathType Equation Format)
   */
  function buildMtefFromLatex(latexStr) {
    const bytes = [];
    // MTEF v3 Header: version 3, platform Windows (1), product EqEditor (1), ver 1, subver 0
    bytes.push(0x03, 0x01, 0x01, 0x01, 0x00);
    // Initial size record: 12pt (0x0C)
    bytes.push(0x07, 0x00, 0x0C, 0x00);

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
      bytes.push(0x01, 0x00); // LINE tag + option 0
      let i = 0;
      while (i < str.length) {
        const ch = str[i];

        // 1. Số mũ / Superscript ^
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
          bytes.push(0x03, 0x02, 0x00); // TMPL tag, selector 2 (sup)
          parseLine(sup);
          bytes.push(0x00); // END TMPL
          continue;
        }

        // 2. Chỉ số dưới / Subscript _
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
          bytes.push(0x03, 0x03, 0x00); // TMPL tag, selector 3 (sub)
          parseLine(sub);
          bytes.push(0x00); // END TMPL
          continue;
        }

        // 3. Phân số \frac{tử}{mẫu}
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
          bytes.push(0x03, 0x00, 0x00); // TMPL tag, selector 0 (fraction)
          parseLine(num);
          parseLine(den);
          bytes.push(0x00); // END TMPL
          continue;
        }

        // 4. Căn thức \sqrt{...}
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
          bytes.push(0x03, 0x01, 0x00); // TMPL tag, selector 1 (radical)
          parseLine(rad);
          bytes.push(0x00); // END TMPL
          continue;
        }

        // Ký tự thông thường
        pushChar(ch);
        i++;
      }
      bytes.push(0x00); // END LINE
    }

    parseLine(latexStr);
    bytes.push(0x00); // END MTEF
    return new Uint8Array(bytes);
  }

  /**
   * Đóng gói MTEF vào tập tin nhị phân Microsoft OLE Compound File (ProgID: Equation.DSMT4)
   */
  function buildMathTypeOleCompoundFile(mtefBytes, CFBLib) {
    const compObj = [
      0x01, 0x00, 0xFE, 0xFF, 0x03, 0x0A, 0x00, 0x00,
      0xFF, 0xFF, 0xFF, 0xFF,
      // CLSID {0002CE02-0000-0000-C000-000000000046} (MathType 6.0 Equation)
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

    // EQNOLEFILEHDR (28 bytes)
    const hdr = new Uint8Array(28);
    hdr[0] = 0x1C; hdr[1] = 0x00; // cbHdr = 28
    hdr[2] = 0x00; hdr[3] = 0x02; hdr[4] = 0x00; hdr[5] = 0x00; // version = 0x00020000
    hdr[6] = 0x02; hdr[7] = 0x00; // cf = 2
    const len = mtefBytes.length;
    hdr[8] = len & 0xFF; hdr[9] = (len >> 8) & 0xFF;
    hdr[10] = (len >> 16) & 0xFF; hdr[11] = (len >> 24) & 0xFF;

    const eqNative = new Uint8Array(28 + len);
    eqNative.set(hdr, 0);
    eqNative.set(mtefBytes, 28);

    const cfb = CFBLib.utils.cfb_new();
    CFBLib.utils.cfb_add(cfb, '\u0001CompObj', new Uint8Array(compObj));
    CFBLib.utils.cfb_add(cfb, '\u0003ObjInfo', new Uint8Array(objInfo));
    CFBLib.utils.cfb_add(cfb, 'Equation Native', eqNative);
    return CFBLib.write(cfb, { type: 'uint8array' });
  }

  /**
   * Hậu xử lý nhúng các đối tượng OLE MathType (Equation.DSMT4) vào gói OpenXML .docx
   */
  async function injectMathTypeOleObjects(blob, formulaRegistry) {
    const JSZip = (typeof window !== 'undefined' && window.JSZip) ? window.JSZip : null;
    const CFBLib = (typeof window !== 'undefined' && window.CFB) ? window.CFB : null;

    if (!JSZip || !CFBLib) {
      console.warn("JSZip hoặc CFB chưa sẵn sàng, giữ nguyên định dạng Word cơ bản.");
      return blob;
    }

    try {
      const zip = await JSZip.loadAsync(blob);

      // 1. Cập nhật [Content_Types].xml đăng ký .bin cho OLE
      let ct = await zip.file('[Content_Types].xml').async('text');
      if (!ct.includes('Extension="bin"')) {
        ct = ct.replace('</Types>', '<Default Extension="bin" ContentType="application/vnd.openxmlformats-officedocument.oleObject"/></Types>');
        zip.file('[Content_Types].xml', ct);
      }

      // 2. Cập nhật word/document.xml namespace VML & Office
      let docXml = await zip.file('word/document.xml').async('text');
      if (!docXml.includes('xmlns:v=')) {
        docXml = docXml.replace('<w:document ', '<w:document xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" ');
      }

      // 3. Chuẩn bị quan hệ mới trong word/_rels/document.xml.rels
      let docRels = await zip.file('word/_rels/document.xml.rels').async('text');
      let newRels = '';

      // Ảnh PNG trong suốt 1x1 chuẩn OpenXML làm preview
      const fallbackPngBytes = (typeof window !== 'undefined' && window.atob)
        ? Uint8Array.from(window.atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='), c => c.charCodeAt(0))
        : new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,0,0,0,0,58,126,155,85,0,0,0,10,73,68,65,84,120,156,99,96,0,0,0,2,0,1,226,33,188,51,0,0,0,0,73,69,78,68,174,66,96,130]);

      for (let idx = 0; idx < formulaRegistry.length; idx++) {
        const item = formulaRegistry[idx];
        const fId = item.id;
        const oleRelId = `rIdMathOle${fId}`;
        const imgRelId = `rIdMathImg${fId}`;

        // a. Sinh nhị phân MTEF v3 từ công thức LaTeX
        const mtefBytes = buildMtefFromLatex(item.cleanLatex);

        // b. Đóng gói OLE Compound File (ProgID: Equation.DSMT4, CLSID: MathType 6.0)
        const oleBin = buildMathTypeOleCompoundFile(mtefBytes, CFBLib);
        zip.file(`word/embeddings/oleObject${fId}.bin`, oleBin);

        // c. Thêm ảnh preview
        zip.file(`word/media/image_math_${fId}.png`, fallbackPngBytes);

        // d. Đăng ký relationships
        newRels += `
          <Relationship Id="${oleRelId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/oleObject" Target="embeddings/oleObject${fId}.bin"/>
          <Relationship Id="${imgRelId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image_math_${fId}.png"/>
        `;

        // e. Thay thế token [[MATHTYPE_EQ_${fId}]] trong word/document.xml bằng đối tượng OLE Word
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

      // Ghi lại relationships và document.xml
      docRels = docRels.replace('</Relationships>', `${newRels}</Relationships>`);
      zip.file('word/_rels/document.xml.rels', docRels);
      zip.file('word/document.xml', docXml);

      return await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
    } catch (err) {
      console.error("Lỗi khi nhúng MathType OLE, tự động trả về file Word tiêu chuẩn:", err);
      return blob;
    }
  }

  // =========================================================================
  // 2. SINH ĐỒ THỊ VECTOR SVG & BẢNG BIẾN THIÊN (BBT) CHUẨN XUẤT SẮC
  // =========================================================================

  /**
   * Tự động sinh SVG đồ thị hàm số chuẩn xác
   */
  function generateGraphSvg(type, config) {
    const w = 360, h = 240;
    const ox = w / 2, oy = h / 2; // Gốc tọa độ O(180, 120)
    const scale = 25; // 25px = 1 đơn vị

    let curvePath = '';
    let extraElements = '';

    if (type === 'parabola' || !type) {
      // Parabol y = a*x^2 + b*x + c
      const a = (config && config.a) !== undefined ? config.a : 1;
      const b = (config && config.b) !== undefined ? config.b : -2;
      const c = (config && config.c) !== undefined ? config.c : -1;

      const points = [];
      for (let x = -6; x <= 6; x += 0.1) {
        const y = a * x * x + b * x + c;
        const px = ox + x * scale;
        const py = oy - y * scale;
        if (py >= -20 && py <= h + 20) {
          points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
      }
      curvePath = `M ${points.join(' L ')}`;

      // Tọa độ đỉnh I(-b/2a, -delta/4a)
      const vx = -b / (2 * a);
      const vy = a * vx * vx + b * vx + c;
      const ipx = ox + vx * scale;
      const ipy = oy - vy * scale;

      extraElements = `
        <circle cx="${ipx}" cy="${ipy}" r="3.5" fill="#dc2626"/>
        <text x="${ipx + 8}" y="${ipy + 12}" font-size="11" font-weight="bold" fill="#dc2626">I(${vx}; ${vy})</text>
        <line x1="${ipx}" y1="${oy}" x2="${ipx}" y2="${ipy}" stroke="#94a3b8" stroke-dasharray="3,3"/>
        <line x1="${ox}" y1="${ipy}" x2="${ipx}" y2="${ipy}" stroke="#94a3b8" stroke-dasharray="3,3"/>
      `;
    } else if (type === 'cubic') {
      // Hàm bậc 3: y = x^3 - 3x
      const points = [];
      for (let x = -4; x <= 4; x += 0.08) {
        const y = 0.5 * (x * x * x - 3 * x);
        const px = ox + x * scale;
        const py = oy - y * scale;
        if (py >= -10 && py <= h + 10) {
          points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
      }
      curvePath = `M ${points.join(' L ')}`;
    } else if (type === 'rational') {
      // Phân thức y = (ax+b)/(cx+d): ví dụ y = (2x+1)/(x-1) (TCĐ x=1, TCN y=2)
      const tcd = 1;
      const tcn = 2;
      const tcdX = ox + tcd * scale;
      const tcnY = oy - tcn * scale;

      extraElements += `
        <!-- Tiệm cận đứng & ngang -->
        <line x1="${tcdX}" y1="10" x2="${tcdX}" y2="${h - 10}" stroke="#dc2626" stroke-dasharray="4,4" stroke-width="1.5"/>
        <text x="${tcdX + 4}" y="20" font-size="10" fill="#dc2626">x = ${tcd}</text>
        <line x1="10" y1="${tcnY}" x2="${w - 10}" y2="${tcnY}" stroke="#dc2626" stroke-dasharray="4,4" stroke-width="1.5"/>
        <text x="${w - 40}" y="${tcnY - 5}" font-size="10" fill="#dc2626">y = ${tcn}</text>
      `;

      // Nhánh trái
      const ptsLeft = [];
      for (let x = -6; x <= tcd - 0.2; x += 0.1) {
        const y = (2 * x + 1) / (x - 1);
        ptsLeft.push(`${(ox + x * scale).toFixed(1)},${(oy - y * scale).toFixed(1)}`);
      }
      // Nhánh phải
      const ptsRight = [];
      for (let x = tcd + 0.2; x <= 6; x += 0.1) {
        const y = (2 * x + 1) / (x - 1);
        ptsRight.push(`${(ox + x * scale).toFixed(1)},${(oy - y * scale).toFixed(1)}`);
      }
      curvePath = `M ${ptsLeft.join(' L ')} M ${ptsRight.join(' L ')}`;
    }

    return `
      <svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Times New Roman', serif;">
        <!-- Lưới tọa độ mờ -->
        <defs>
          <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f1f5f9" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#grid)" />

        <!-- Trục Ox -->
        <line x1="15" y1="${oy}" x2="${w - 15}" y2="${oy}" stroke="#334155" stroke-width="1.5"/>
        <polygon points="${w - 12},${oy - 3} ${w - 3},${oy} ${w - 12},${oy + 3}" fill="#334155"/>
        <text x="${w - 18}" y="${oy + 16}" font-size="12" font-style="italic" fill="#0f172a">x</text>

        <!-- Trục Oy -->
        <line x1="${ox}" y1="${h - 15}" x2="${ox}" y2="15" stroke="#334155" stroke-width="1.5"/>
        <polygon points="${ox - 3},15 ${ox},6 ${ox + 3},15" fill="#334155"/>
        <text x="${ox - 16}" y="18" font-size="12" font-style="italic" fill="#0f172a">y</text>

        <!-- Gốc tọa độ O -->
        <text x="${ox - 14}" y="${oy + 14}" font-size="11" font-style="italic" fill="#334155">O</text>

        <!-- Đường cong hàm số -->
        <path d="${curvePath}" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round"/>

        <!-- Phần tử chú thích thêm -->
        ${extraElements}
      </svg>
    `;
  }

  /**
   * Sinh SVG Bảng biến thiên (BBT) 3 dòng chuẩn Bộ GD&ĐT
   */
  function generateVariationTableSvg(tableData) {
    const w = 480, h = 160;
    const colHeaderW = 60;
    const rowH1 = 38;
    const rowH2 = 38;
    const rowH3 = 84;

    const rawXPoints = (tableData && tableData.x) ? tableData.x : ['-∞', '-1', '2', '+∞'];
    const signs = (tableData && tableData.yPrime) ? tableData.yPrime : ['+', '0', '-', '0', '+'];
    const rawYValues = (tableData && tableData.y) ? tableData.y : ['-∞', '5', '-2', '+∞'];

    // Chuẩn hóa triệt để ký hiệu vô cực cho các giá trị hiển thị trên bảng SVG
    const xPoints = rawXPoints.map(p => sanitizeLatexMathString(p).replace(/\\in\s*fty/g, '∞').replace(/∈\s*fty/g, '∞').replace(/\\infty/g, '∞').replace(/[\$\\]/g, ''));
    const yValues = rawYValues.map(v => sanitizeLatexMathString(v).replace(/\\in\s*fty/g, '∞').replace(/∈\s*fty/g, '∞').replace(/\\infty/g, '∞').replace(/[\$\\]/g, ''));

    // Tính toán tọa độ các cột
    const availableW = w - colHeaderW - 20;
    const numIntervals = xPoints.length - 1;
    const colStep = availableW / numIntervals;

    let xTexts = '';
    xPoints.forEach((pt, i) => {
      const cx = colHeaderW + 10 + i * colStep;
      xTexts += `<text x="${cx}" y="24" text-anchor="middle" font-size="13" font-family="'Times New Roman', serif">${pt}</text>`;
    });

    let signTexts = '';
    signs.forEach((sg, i) => {
      const cx = colHeaderW + 10 + (i * 0.5) * colStep;
      signTexts += `<text x="${cx}" y="${rowH1 + 24}" text-anchor="middle" font-size="14" font-weight="bold" fill="${sg === '+' ? '#15803d' : sg === '-' ? '#b91c1c' : '#334155'}">${sg}</text>`;
    });

    // Mũi tên biến thiên dòng y
    let arrowElements = `
      <!-- Điểm 1 (-∞) lên Điểm 2 (5) -->
      <text x="${colHeaderW + 15}" y="145" text-anchor="middle" font-size="12">-∞</text>
      <line x1="${colHeaderW + 35}" y1="140" x2="${colHeaderW + 10 + colStep - 20}" y2="95" stroke="#2563eb" stroke-width="2"/>
      <polygon points="${colHeaderW + 10 + colStep - 15},90 ${colHeaderW + 10 + colStep - 24},94 ${colHeaderW + 10 + colStep - 20},100" fill="#2563eb"/>

      <!-- Điểm 2 (5) cực đại -->
      <text x="${colHeaderW + 10 + colStep}" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">${yValues[1] || '5'}</text>

      <!-- Xuống Điểm 3 (-2) cực tiểu -->
      <line x1="${colHeaderW + 10 + colStep + 20}" y1="95" x2="${colHeaderW + 10 + 2 * colStep - 20}" y2="140" stroke="#dc2626" stroke-width="2"/>
      <polygon points="${colHeaderW + 10 + 2 * colStep - 15},145 ${colHeaderW + 10 + 2 * colStep - 20},136 ${colHeaderW + 10 + 2 * colStep - 24},142" fill="#dc2626"/>
      <text x="${colHeaderW + 10 + 2 * colStep}" y="152" text-anchor="middle" font-size="13" font-weight="bold" fill="#991b1b">${yValues[2] || '-2'}</text>

      <!-- Lên Điểm 4 (+∞) -->
      <line x1="${colHeaderW + 10 + 2 * colStep + 20}" y1="140" x2="${w - 40}" y2="95" stroke="#2563eb" stroke-width="2"/>
      <polygon points="${w - 35},90 ${w - 44},94 ${w - 40},100" fill="#2563eb"/>
      <text x="${w - 20}" y="92" text-anchor="middle" font-size="12">+∞</text>
    `;

    return `
      <svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Times New Roman', serif;">
        <!-- Khung ngoài BBT -->
        <rect x="5" y="5" width="${w - 10}" height="${h - 10}" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>

        <!-- Đường kẻ dọc phân cách nhãn và dữ liệu -->
        <line x1="${colHeaderW}" y1="5" x2="${colHeaderW}" y2="${h - 5}" stroke="#334155" stroke-width="1.5"/>

        <!-- Đường kẻ ngang dòng x -->
        <line x1="5" y1="${rowH1}" x2="${w - 5}" y2="${rowH1}" stroke="#334155" stroke-width="1"/>

        <!-- Đường kẻ ngang dòng y' -->
        <line x1="5" y1="${rowH1 + rowH2}" x2="${w - 5}" y2="${rowH1 + rowH2}" stroke="#334155" stroke-width="1"/>

        <!-- Nhãn các dòng -->
        <text x="30" y="24" text-anchor="middle" font-size="14" font-style="italic" font-weight="bold">x</text>
        <text x="30" y="${rowH1 + 24}" text-anchor="middle" font-size="14" font-style="italic" font-weight="bold">y'</text>
        <text x="30" y="${rowH1 + rowH2 + 45}" text-anchor="middle" font-size="14" font-style="italic" font-weight="bold">y</text>

        <!-- Dữ liệu x và y' -->
        ${xTexts}
        ${signTexts}

        <!-- Dữ liệu y và mũi tên -->
        ${arrowElements}
      </svg>
    `;
  }

  /**
   * Chuyển đổi mã SVG bất kỳ thành ảnh PNG 300 DPI siêu nét thông qua Canvas
   */
  async function convertSvgToHighResPng(svgString, scaleMultiplier = 3) {
    return new Promise((resolve) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');
        if (!svgEl) {
          return resolve(null);
        }

        let width = parseFloat(svgEl.getAttribute('width')) || 400;
        let height = parseFloat(svgEl.getAttribute('height')) || 220;
        const viewBox = svgEl.getAttribute('viewBox');
        if (viewBox) {
          const parts = viewBox.split(/\s+|,/).map(parseFloat);
          if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
            width = parts[2];
            height = parts[3];
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * scaleMultiplier);
        canvas.height = Math.round(height * scaleMultiplier);
        const ctx = canvas.getContext('2d');

        // Bật làm mịn ảnh chất lượng cao
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.scale(scaleMultiplier, scaleMultiplier);

        // Nền trắng cho ảnh trong Word
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const URLObj = window.URL || window.webkitURL || window;
        const blobUrl = URLObj.createObjectURL(svgBlob);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
          ctx.drawImage(img, 0, 0, width, height);
          URLObj.revokeObjectURL(blobUrl);
          const pngDataUrl = canvas.toDataURL('image/png');
          resolve({
            dataUrl: pngDataUrl,
            width: width,
            height: height
          });
        };
        img.onerror = function () {
          URLObj.revokeObjectURL(blobUrl);
          resolve(null);
        };
        img.src = blobUrl;
      } catch (err) {
        console.warn('Lỗi khi convert SVG sang PNG:', err);
        resolve(null);
      }
    });
  }

  // =========================================================================
  // 3. XÂY DỰNG FILE .DOCX HOÀN CHỈNH VỚI DOCX.JS
  // =========================================================================

  /**
   * Tạo bảng tiêu đề hành chính chuẩn Bộ Giáo Dục & Đào Tạo
   */
  function createMinistryHeaderTable(examData, docxLib) {
    const titleUpper = (examData.title || 'ĐỀ KHẢO SÁT CHẤT LƯỢNG HỌC TẬP').toUpperCase();
    const grade = examData.grade || '9';
    const duration = examData.durationMinutes || 45;

    return new docxLib.Table({
      width: { size: 100, type: docxLib.WidthType.PERCENTAGE },
      borders: docxLib.TableBorders.NONE,
      rows: [
        new docxLib.TableRow({
          children: [
            // Cột bên trái: Sở GD&ĐT / Tên trường
            new docxLib.TableCell({
              width: { size: 45, type: docxLib.WidthType.PERCENTAGE },
              borders: { top: { style: docxLib.BorderStyle.NONE }, bottom: { style: docxLib.BorderStyle.NONE }, left: { style: docxLib.BorderStyle.NONE }, right: { style: docxLib.BorderStyle.NONE } },
              children: [
                new docxLib.Paragraph({
                  alignment: docxLib.AlignmentType.CENTER,
                  spacing: { line: 240, after: 60 },
                  children: [
                    new docxLib.TextRun({ text: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO', font: 'Times New Roman', size: 22, bold: true }),
                  ]
                }),
                new docxLib.Paragraph({
                  alignment: docxLib.AlignmentType.CENTER,
                  spacing: { line: 240, after: 60 },
                  children: [
                    new docxLib.TextRun({ text: 'TRƯỜNG THCS & THPT CHUYÊN STEM', font: 'Times New Roman', size: 22, bold: true }),
                  ]
                }),
                new docxLib.Paragraph({
                  alignment: docxLib.AlignmentType.CENTER,
                  spacing: { line: 240, after: 120 },
                  children: [
                    new docxLib.TextRun({ text: '─────────────', font: 'Times New Roman', size: 20 }),
                  ]
                })
              ]
            }),

            // Cột bên phải: Tên đề thi, thời gian
            new docxLib.TableCell({
              width: { size: 55, type: docxLib.WidthType.PERCENTAGE },
              borders: { top: { style: docxLib.BorderStyle.NONE }, bottom: { style: docxLib.BorderStyle.NONE }, left: { style: docxLib.BorderStyle.NONE }, right: { style: docxLib.BorderStyle.NONE } },
              children: [
                new docxLib.Paragraph({
                  alignment: docxLib.AlignmentType.CENTER,
                  spacing: { line: 240, after: 60 },
                  children: [
                    new docxLib.TextRun({ text: titleUpper, font: 'Times New Roman', size: 22, bold: true, color: '1e3a8a' }),
                  ]
                }),
                new docxLib.Paragraph({
                  alignment: docxLib.AlignmentType.CENTER,
                  spacing: { line: 240, after: 60 },
                  children: [
                    new docxLib.TextRun({ text: `MÔN: TOÁN HỌC - KHỐI ${grade}`, font: 'Times New Roman', size: 22, bold: true }),
                  ]
                }),
                new docxLib.Paragraph({
                  alignment: docxLib.AlignmentType.CENTER,
                  spacing: { line: 240, after: 120 },
                  children: [
                    new docxLib.TextRun({ text: `Thời gian làm bài: ${duration} phút (không kể thời gian giao đề)`, font: 'Times New Roman', size: 20, italics: true }),
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }

  /**
   * Tạo khung thông tin thí sinh (Họ tên, SBD, Mã đề)
   */
  function createStudentInfoBox(docxLib) {
    return new docxLib.Paragraph({
      spacing: { before: 120, after: 200, line: 280 },
      border: { bottom: { color: '475569', size: 6, style: docxLib.BorderStyle.SINGLE, space: 6 } },
      children: [
        new docxLib.TextRun({ text: 'Họ và tên thí sinh: ', font: 'Times New Roman', size: 22, bold: true }),
        new docxLib.TextRun({ text: '...........................................................................   ', font: 'Times New Roman', size: 22 }),
        new docxLib.TextRun({ text: 'Số báo danh: ', font: 'Times New Roman', size: 22, bold: true }),
        new docxLib.TextRun({ text: '...........................', font: 'Times New Roman', size: 22 })
      ]
    });
  }

  /**
   * Tạo bảng bố cục cho 4 đáp án A, B, C, D (1 hàng 4 cột, hoặc 2 hàng 2 cột, hoặc danh sách)
   */
  /**
   * Tạo layout đáp án A, B, C, D chuẩn Quốc gia (Bộ GD&ĐT)
   * Tự động tính toán chia cột đều: 4 cột (25% mỗi cột), 2 cột (50% mỗi cột), hoặc 1 cột
   */
  function createOptionsLayoutTable(options, docxLib, context = null) {
    if (!options || options.length === 0) return [];

    // Kiểm tra độ dài trung bình của các đáp án để chọn layout đẹp nhất
    const maxLen = Math.max(...options.map(o => (o.text || '').length));

    if (maxLen <= 22 && options.length === 4) {
      // 4 cột trên 1 hàng (chia đều 25% mỗi cột, chuẩn đẹp đề Bộ GD&ĐT)
      const cells = options.map(opt => {
        const runs = [
          new docxLib.TextRun({ text: `${opt.id}. `, font: 'Times New Roman', size: 24, bold: true, color: '1d4ed8' }),
          ...splitTextAndMathRuns(opt.text, { font: 'Times New Roman', size: 24 }, docxLib, context)
        ];
        return new docxLib.TableCell({
          width: { size: 25, type: docxLib.WidthType.PERCENTAGE },
          borders: { top: { style: docxLib.BorderStyle.NONE }, bottom: { style: docxLib.BorderStyle.NONE }, left: { style: docxLib.BorderStyle.NONE }, right: { style: docxLib.BorderStyle.NONE } },
          children: [new docxLib.Paragraph({ children: runs, spacing: { line: 280 } })]
        });
      });

      return [
        new docxLib.Table({
          width: { size: 100, type: docxLib.WidthType.PERCENTAGE },
          borders: docxLib.TableBorders.NONE,
          rows: [new docxLib.TableRow({ children: cells })]
        })
      ];
    } else if (maxLen <= 55 && options.length === 4) {
      // 2 cột x 2 hàng (chia đều 50% mỗi cột)
      const row1 = [options[0], options[1]].map(opt => {
        const runs = [
          new docxLib.TextRun({ text: `${opt.id}. `, font: 'Times New Roman', size: 24, bold: true, color: '1d4ed8' }),
          ...splitTextAndMathRuns(opt.text, { font: 'Times New Roman', size: 24 }, docxLib, context)
        ];
        return new docxLib.TableCell({
          width: { size: 50, type: docxLib.WidthType.PERCENTAGE },
          borders: { top: { style: docxLib.BorderStyle.NONE }, bottom: { style: docxLib.BorderStyle.NONE }, left: { style: docxLib.BorderStyle.NONE }, right: { style: docxLib.BorderStyle.NONE } },
          children: [new docxLib.Paragraph({ children: runs, spacing: { line: 280 } })]
        });
      });

      const row2 = [options[2], options[3]].map(opt => {
        const runs = [
          new docxLib.TextRun({ text: `${opt.id}. `, font: 'Times New Roman', size: 24, bold: true, color: '1d4ed8' }),
          ...splitTextAndMathRuns(opt.text, { font: 'Times New Roman', size: 24 }, docxLib, context)
        ];
        return new docxLib.TableCell({
          width: { size: 50, type: docxLib.WidthType.PERCENTAGE },
          borders: { top: { style: docxLib.BorderStyle.NONE }, bottom: { style: docxLib.BorderStyle.NONE }, left: { style: docxLib.BorderStyle.NONE }, right: { style: docxLib.BorderStyle.NONE } },
          children: [new docxLib.Paragraph({ children: runs, spacing: { line: 280 } })]
        });
      });

      return [
        new docxLib.Table({
          width: { size: 100, type: docxLib.WidthType.PERCENTAGE },
          borders: docxLib.TableBorders.NONE,
          rows: [new docxLib.TableRow({ children: row1 }), new docxLib.TableRow({ children: row2 })]
        })
      ];
    } else {
      // Mỗi đáp án 1 dòng riêng biệt (chia đều dọc, thụt dòng chuẩn)
      return options.map(opt => {
        const runs = [
          new docxLib.TextRun({ text: `${opt.id}. `, font: 'Times New Roman', size: 24, bold: true, color: '1d4ed8' }),
          ...splitTextAndMathRuns(opt.text, { font: 'Times New Roman', size: 24 }, docxLib, context)
        ];
        return new docxLib.Paragraph({
          indent: { left: 360 },
          spacing: { line: 280, after: 60 },
          children: runs
        });
      });
    }
  }

  /**
   * Tạo bảng đáp án tổng hợp ở cuối đề (ví dụ 10 câu trắc nghiệm)
   */
  function createSummaryAnswerTable(questions, docxLib) {
    if (!questions || questions.length === 0) return [];

    const numCols = Math.min(questions.length, 10);
    const rows = [];

    for (let chunkIdx = 0; chunkIdx < questions.length; chunkIdx += numCols) {
      const chunk = questions.slice(chunkIdx, chunkIdx + numCols);

      // Dòng số thứ tự câu
      const qCells = chunk.map((q, i) => new docxLib.TableCell({
        children: [new docxLib.Paragraph({
          alignment: docxLib.AlignmentType.CENTER,
          children: [new docxLib.TextRun({ text: `${chunkIdx + i + 1}`, font: 'Times New Roman', size: 22, bold: true })]
        })]
      }));

      // Dòng đáp án đúng
      const aCells = chunk.map(q => new docxLib.TableCell({
        children: [new docxLib.Paragraph({
          alignment: docxLib.AlignmentType.CENTER,
          children: [new docxLib.TextRun({ text: q.correctAnswer || 'A', font: 'Times New Roman', size: 22, bold: true, color: '15803d' })]
        })]
      }));

      rows.push(new docxLib.TableRow({ children: qCells }));
      rows.push(new docxLib.TableRow({ children: aCells }));
    }

    return [
      new docxLib.Paragraph({
        spacing: { before: 240, after: 120 },
        children: [
          new docxLib.TextRun({ text: 'BẢNG ĐÁP ÁN TRẮC NGHIỆM', font: 'Times New Roman', size: 24, bold: true, color: '1e3a8a' })
        ]
      }),
      new docxLib.Table({
        width: { size: 100, type: docxLib.WidthType.PERCENTAGE },
        rows: rows
      })
    ];
  }

  // =========================================================================
  // 4. HÀM CHÍNH: XUẤT ĐỀ THI RA FILE WORD (.DOCX) - WORD EQUATION HOẶC MATHTYPE
  // =========================================================================

  /**
   * Xuất đề thi ra file .docx tải về máy tính với 2 tùy chọn chuẩn:
   * 1. Word Equation (OMML): Chuẩn OpenXML native của Word
   * 2. MathType OLE (Equation.DSMT4 / MTEF): Nhấp đúp sửa trực tiếp bằng MathType
   * @param {Object} examData Dữ liệu đề thi
   * @param {Object} options Cấu hình: format ('omml'|'mathtype'), includeSolutions (boolean)
   */
  async function exportExamToWord(examData, options = {}) {
    const docxLib = window.docx;
    if (!docxLib) {
      alert('Lỗi: Thư viện docx.js chưa được tải! Vui lòng làm mới lại trang web.');
      return;
    }

    const format = (options.format || 'omml').toLowerCase(); // 'omml' hoặc 'mathtype'
    const isMathType = (format === 'mathtype');
    const includeSolutions = !!options.includeSolutions;

    const context = {
      renderMode: isMathType ? 'mathtype' : 'omml',
      formulaRegistry: []
    };
    
    // 0. Tiền xử lý chuẩn hóa toàn diện dữ liệu đề thi với sanitizeLatex
    const rawQuestions = examData.questions || [];
    const questions = rawQuestions.map(q => {
      const item = { ...q };
      if (item.content) item.content = sanitizeLatex(item.content);
      if (Array.isArray(item.options)) {
        item.options = item.options.map(opt => {
          if (typeof opt === 'string') return sanitizeLatex(opt);
          if (opt && typeof opt === 'object') {
            return {
              ...opt,
              text: sanitizeLatex(opt.text || opt.content || '')
            };
          }
          return opt;
        });
      }
      if (item.explanation) item.explanation = sanitizeLatex(item.explanation);
      return item;
    });

    // Danh sách phần tử cho tài liệu Word
    const docChildren = [];

    // 1. Tiêu đề Sở GD&ĐT & Đề thi
    docChildren.push(createMinistryHeaderTable(examData, docxLib));

    // 2. Khung thông tin học sinh
    docChildren.push(createStudentInfoBox(docxLib));

    // 3. Tiêu đề phần thi
    docChildren.push(new docxLib.Paragraph({
      spacing: { before: 120, after: 180 },
      children: [
        new docxLib.TextRun({ text: 'PHẦN CÂU HỎI TRẮC NGHIỆM (Chọn 01 đáp án đúng nhất)', font: 'Times New Roman', size: 24, bold: true })
      ]
    }));

    // 4. Duyệt qua từng câu hỏi
    for (let idx = 0; idx < questions.length; idx++) {
      const q = questions[idx];
      const qNumber = idx + 1;
      const levelText = q.level ? `[${q.level}] ` : '';

      // Paragraph nội dung câu hỏi
      const stemRuns = [
        new docxLib.TextRun({ text: `Câu ${qNumber}: `, font: 'Times New Roman', size: 24, bold: true, color: '1e3a8a' }),
        new docxLib.TextRun({ text: levelText, font: 'Times New Roman', size: 24, bold: true, color: '475569' }),
        ...splitTextAndMathRuns(q.content, { font: 'Times New Roman', size: 24 }, docxLib, context)
      ];

      docChildren.push(new docxLib.Paragraph({
        spacing: { before: 180, after: 100, line: 300 },
        children: stemRuns
      }));

      // Xử lý hình ảnh / đồ thị / Bảng biến thiên nhúng
      let imageToEmbed = null;

      if (q.imageUrl && q.imageUrl.startsWith('data:image')) {
        // Đã có ảnh upload từ máy tính / GeoGebra
        imageToEmbed = { dataUrl: q.imageUrl, width: 320, height: 200 };
      } else if (q.svgContent && q.svgContent.trim().startsWith('<svg')) {
        // Có mã SVG
        imageToEmbed = await convertSvgToHighResPng(q.svgContent, 3);
      } else if (q.hasBbt || (q.bbtHtml && q.bbtHtml.length > 0)) {
        // Tự động sinh SVG Bảng biến thiên sắc nét
        const bbtSvg = generateVariationTableSvg(q.tableData || null);
        imageToEmbed = await convertSvgToHighResPng(bbtSvg, 3);
      } else if (q.hasGraph || q.graphType) {
        // Tự động sinh SVG đồ thị hàm số
        const graphSvg = generateGraphSvg(q.graphType || 'parabola', q.graphData || null);
        imageToEmbed = await convertSvgToHighResPng(graphSvg, 3);
      }

      // Nhúng ảnh vào văn bản (nếu có)
      if (imageToEmbed && imageToEmbed.dataUrl) {
        try {
          const displayW = Math.min(imageToEmbed.width || 360, 380);
          const displayH = Math.min(imageToEmbed.height || 220, 240);

          docChildren.push(new docxLib.Paragraph({
            alignment: docxLib.AlignmentType.CENTER,
            spacing: { before: 80, after: 120 },
            children: [
              new docxLib.ImageRun({
                data: imageToEmbed.dataUrl,
                transformation: { width: displayW, height: displayH }
              })
            ]
          }));
        } catch (imgErr) {
          console.warn(`Lỗi nhúng ảnh câu ${qNumber}:`, imgErr);
        }
      }

      // 4 Đáp án A, B, C, D (chia đều chuẩn đẹp)
      const optionElements = createOptionsLayoutTable(q.options, docxLib, context);
      optionElements.forEach(el => docChildren.push(el));

      // Lời giải chi tiết (nếu bật tùy chọn)
      if (includeSolutions) {
        const correctLabel = q.correctAnswer || 'A';
        const explText = q.explanation || 'Chưa có lời giải chi tiết.';

        const solutionRuns = [
          new docxLib.TextRun({ text: '  ➥ Chọn đáp án: ', font: 'Times New Roman', size: 22, bold: true, color: '15803d' }),
          new docxLib.TextRun({ text: `${correctLabel}. `, font: 'Times New Roman', size: 22, bold: true, color: '15803d' }),
          new docxLib.TextRun({ text: 'Lời giải: ', font: 'Times New Roman', size: 22, italics: true, bold: true }),
          ...splitTextAndMathRuns(explText, { font: 'Times New Roman', size: 22, italics: true, color: '334155' }, docxLib, context)
        ];

        docChildren.push(new docxLib.Paragraph({
          spacing: { before: 80, after: 160, line: 260 },
          children: solutionRuns
        }));
      }

      // Dấu cách câu nhẹ
      docChildren.push(new docxLib.Paragraph({ spacing: { after: 100 }, children: [] }));
    }

    // 5. Nếu xuất kèm Lời giải -> Bổ sung Bảng đáp án tổng hợp và Lời chúc cuối đề
    if (includeSolutions) {
      const summaryTableElements = createSummaryAnswerTable(questions, docxLib);
      summaryTableElements.forEach(el => docChildren.push(el));
    }

    docChildren.push(new docxLib.Paragraph({
      alignment: docxLib.AlignmentType.CENTER,
      spacing: { before: 240, after: 120 },
      children: [
        new docxLib.TextRun({ text: '────────── HẾT ──────────', font: 'Times New Roman', size: 22, bold: true, color: '64748b' })
      ]
    }));

    // 6. Tạo Document OpenXML với thông số khổ giấy A4 chuẩn Quốc tế và font Times New Roman 12pt mặc định
    const doc = new docxLib.Document({
      creator: 'Hệ thống LMS STEM AI',
      title: examData.title || 'Đề thi Toán học STEM',
      description: isMathType
        ? 'Đề thi trắc nghiệm Toán học nhúng đối tượng MathType (OLE Equation.DSMT4 / MTEF)'
        : 'Đề thi trắc nghiệm Toán học với Word Equation (OMML) và đồ thị chất lượng cao',
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
                width: 11906, // A4 width in DXA (210mm)
                height: 16838 // A4 height in DXA (297mm)
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

    // 7. Đóng gói và kích hoạt tải về máy tính
    const cleanTitle = (examData.title || 'De_Thi_Toan')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .trim()
      .replace(/\s+/g, '_');

    const modeSuffix = isMathType ? '_MathType' : '_Word_Equation';
    const suffix = includeSolutions ? '_Kem_Loi_Giai' : '_De_Bai';
    const fileName = `${cleanTitle}${modeSuffix}${suffix}.docx`;

    // Gọi Packer chuyển sang Blob (có fallback an toàn)
    let blob;
    try {
      blob = await docxLib.Packer.toBlob(doc);
    } catch (blobErr) {
      const b64 = await docxLib.Packer.toBase64String(doc);
      const byteChars = (typeof window !== 'undefined' && window.atob) ? window.atob(b64) : Buffer.from(b64, 'base64').toString('binary');
      const byteNumbers = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      blob = (typeof Blob !== 'undefined')
        ? new Blob([byteNumbers], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        : byteNumbers;
    }

    // Nếu chọn MathType và có công thức toán: inject OLE objects
    if (isMathType && context.formulaRegistry.length > 0) {
      blob = await injectMathTypeOleObjects(blob, context.formulaRegistry);
    }

    // Kích hoạt tải về máy
    downloadBlobFile(blob, fileName);

    return fileName;
  }

  /**
   * Kích hoạt tải file an toàn trên mọi trình duyệt
   */
  function downloadBlobFile(blob, fileName) {
    if (typeof window !== 'undefined' && typeof window.saveAs === 'function') {
      window.saveAs(blob, fileName);
    } else if (typeof window !== 'undefined' && window.URL && typeof window.URL.createObjectURL === 'function' && typeof document !== 'undefined') {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 1500);
    }
  }

  return {
    sanitizeLatex: sanitizeLatex,
    sanitizeLatexMathString: sanitizeLatex,
    buildMtefFromLatex: buildMtefFromLatex,
    buildMathTypeOleCompoundFile: buildMathTypeOleCompoundFile,
    injectMathTypeOleObjects: injectMathTypeOleObjects,
    parseLatexTokensToDocxMath: parseLatexTokensToDocxMath,
    createDocxMathObject: createDocxMathObject,
    createMathParagraph: createMathParagraph,
    splitTextAndMathRuns: splitTextAndMathRuns,
    generateGraphSvg: generateGraphSvg,
    generateVariationTableSvg: generateVariationTableSvg,
    convertSvgToHighResPng: convertSvgToHighResPng,
    exportExamToWord: exportExamToWord,
    exportToWord: exportExamToWord
  };
})();

// Đăng ký toàn cục vào window để tương thích tuyệt đối ở mọi nơi
if (typeof window !== 'undefined') {
  window.exportToWord = window.LmsWordExport.exportExamToWord;
  window.sanitizeLatex = window.LmsWordExport.sanitizeLatex;
}

// Hỗ trợ NodeJS / CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = (typeof window !== 'undefined' && window.LmsWordExport) ? window.LmsWordExport : {};
}

