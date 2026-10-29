/**
 * KaTeX Math Rendering Utility for LMS STEM System
 * Supports:
 * - Inline formulas: \( ... \) and $ ... $
 * - Display formulas: \[ ... \] and $$ ... $$
 * - HTML Table Bảng Biến Thiên (Variation Table)
 */

window.LmsMath = (function () {
  'use strict';

  /**
   * Tiền xử lý chuỗi: khắc phục triệt để lỗi \in fty hoặc ∈ fty thành \infty
   */
  function sanitizeLatexMathString(str) {
    if (!str) return '';
    return String(str)
      .replace(/\\in\s*fty/g, "\\infty")
      .replace(/∈\s*fty/g, "∞")
      .replace(/\\in\s*finity/gi, "\\infty");
  }

  /**
   * Helper to render math inside an element using katex renderMathInElement
   */
  function renderMath(element) {
    if (!element) return;
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false,
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option']
        });
      } catch (err) {
        console.warn('KaTeX rendering warning:', err);
      }
    } else {
      console.warn('renderMathInElement from KaTeX auto-render extension is not loaded yet.');
    }
  }

  /**
   * Parses string with inline LaTeX and returns HTML string with rendered KaTeX
   * Useful when setting innerHTML of options or text spans
   */
  function renderLatexToString(text) {
    if (!text) return '';
    if (typeof katex === 'undefined') return text;

    let output = sanitizeLatexMathString(text);

    // Display math: $$ ... $$ and \[ ... \]
    output = output.replace(/\$\$([\s\S]*?)\$\$/g, function (_, tex) {
      try {
        return katex.renderToString(tex, { displayMode: true, throwOnError: false });
      } catch (e) {
        return '$$' + tex + '$$';
      }
    });

    output = output.replace(/\\\[([\s\S]*?)\\\]/g, function (_, tex) {
      try {
        return katex.renderToString(tex, { displayMode: true, throwOnError: false });
      } catch (e) {
        return '\\[' + tex + '\\]';
      }
    });

    // Inline math: \( ... \) and $ ... $
    output = output.replace(/\\\(([\s\S]*?)\\\)/g, function (_, tex) {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch (e) {
        return '\\(' + tex + '\\)';
      }
    });

    output = output.replace(/\$([^\$\n]+?)\$/g, function (_, tex) {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch (e) {
        return '$' + tex + '$';
      }
    });

    return output;
  }

  /**
   * Generates standard HTML Table template for Bảng Biến Thiên
   * Sample:
   * x:   -∞      x1      x2      +∞
   * y':      +    0   -   0   +
   * y:   -∞  ↗   y1  ↘   y2  ↗  +∞
   */
  function generateBbtTableHtml(config) {
    // config: { points: ['-\\infty', '1', '3', '+\\infty'], signs: ['+', '0', '-', '0', '+'], values: ['-\\infty', '4', '0', '+\\infty'], arrows: ['↗', '↘', '↗'] }
    if (!config) {
      // Default standard quadratic / cubic template
      return `
      <div class="bbt-table-wrapper">
        <table class="bbt-table">
          <thead>
            <tr>
              <th class="col-header">$x$</th>
              <th>$-\\infty$</th>
              <th>$1$</th>
              <th>$3$</th>
              <th>$+\\infty$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-header">$y'$</td>
              <td>$+$</td>
              <td>$0$</td>
              <td>$-$</td>
              <td>$+$</td>
            </tr>
            <tr>
              <td class="col-header">$y$</td>
              <td>$-\\infty$</td>
              <td><span class="bbt-arrow-up">↗</span> $4$</td>
              <td><span class="bbt-arrow-down">↘</span> $0$</td>
              <td><span class="bbt-arrow-up">↗</span> $+\\infty$</td>
            </tr>
          </tbody>
        </table>
      </div>`;
    }
    return config;
  }

  return {
    renderMath: renderMath,
    renderLatexToString: renderLatexToString,
    generateBbtTableHtml: generateBbtTableHtml
  };
})();
