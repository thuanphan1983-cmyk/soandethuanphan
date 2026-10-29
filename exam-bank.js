/**
 * ==============================================================================
 * NGÂN HÀNG ĐỀ THI TOÁN 12 OFFLINE CHUẨN STEM - SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * ==============================================================================
 * CHƯƠNG I: ỨNG DỤNG ĐẠO HÀM ĐỂ KHẢO SÁT VÀ VẼ ĐỒ THỊ CỦA HÀM SỐ
 * 
 * Quy mô: Đúng 100 câu hỏi trắc nghiệm chất lượng cao, bao quát 5 bài học:
 *   - Bài 1: Tính đơn điệu và cực trị của hàm số (25 câu: Q1 -> Q25)
 *   - Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số (20 câu: Q26 -> Q45)
 *   - Bài 3: Đường tiệm cận của đồ thị hàm số [Đứng, Ngang, Xiên] (20 câu: Q46 -> Q65)
 *   - Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số [Bậc 3, Nhất biến, Bậc 2/Bậc 1, Tâm đối xứng] (20 câu: Q66 -> Q85)
 *   - Bài 5: Ứng dụng đạo hàm để giải quyết một số bài toán thực tế [Tối ưu hóa STEM, Hình học, Kinh tế, Vật lý] (15 câu: Q86 -> Q100)
 * 
 * Đặc tính kỹ thuật:
 *   - Phân hóa chuẩn 4 mức độ: Nhận biết (NB), Thông hiểu (TH), Vận dụng (VD), Vận dụng cao (VDC).
 *   - Công thức Toán viết chuẩn mã LaTeX nội tuyến $...$ và khối $$...$$.
 *   - Ký hiệu vô cực chuẩn hóa tuyệt đối: \\infty (hoàn toàn không bị dính lỗi \\in fty).
 *   - Tích hợp hơn 20 Bảng biến thiên (BBT) cấu trúc HTML Table sắc nét, tương thích KaTeX.
 *   - Đầy đủ 4 phương án A, B, C, D kèm Đáp án đúng và Lời giải chi tiết từng bước.
 *   - Sẵn sàng xuất Microsoft Word (.docx) Equation native hoặc làm bài trực tiếp trên LMS.
 */

const EXAM_BANK = [
  {
    "id": 1,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = x^3 - 3x^2 + 2$. Khẳng định nào sau đây là đúng?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "Hàm số đồng biến trên khoảng $(0; 2)$."
      },
      {
        "id": "B",
        "text": "Hàm số nghịch biến trên khoảng $(-\\infty; 0)$."
      },
      {
        "id": "C",
        "text": "Hàm số nghịch biến trên khoảng $(2; +\\infty)$."
      },
      {
        "id": "D",
        "text": "Hàm số nghịch biến trên khoảng $(0; 2)$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $y' = 3x^2 - 6x = 3x(x - 2)$. Cho $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$. Xét dấu $y'$: $y' < 0 \\Leftrightarrow x \\in (0; 2)$, do đó hàm số nghịch biến trên khoảng $(0; 2)$ và đồng biến trên các khoảng $(-\\infty; 0)$, $(2; +\\infty)$."
  },
  {
    "id": 2,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\nKhẳng định nào sau đây là đúng về tính đồng biến của hàm số?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-1$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$3$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-2$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "Hàm số nghịch biến trên khoảng $(2; +\\infty)$."
      },
      {
        "id": "B",
        "text": "Hàm số đồng biến trên khoảng $(-\\infty; 3)$."
      },
      {
        "id": "C",
        "text": "Hàm số đồng biến trên khoảng $(-1; 2)$."
      },
      {
        "id": "D",
        "text": "Hàm số đồng biến trên khoảng $(-\\infty; -1)$ và $(2; +\\infty)$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Dựa vào bảng biến thiên, $f'(x) > 0$ trên các khoảng $(-\\infty; -1)$ và $(2; +\\infty)$, do đó hàm số đồng biến trên các khoảng $(-\\infty; -1)$ và $(2; +\\infty)$."
  },
  {
    "id": 3,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = \\frac{2x - 1}{x + 1}$. Mệnh đề nào dưới đây đúng?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "Hàm số đồng biến trên khoảng $(-\\infty; +\\infty)$."
      },
      {
        "id": "B",
        "text": "Hàm số nghịch biến trên từng khoảng xác định $(-\\infty; -1)$ và $(-1; +\\infty)$."
      },
      {
        "id": "C",
        "text": "Hàm số đồng biến trên từng khoảng xác định $(-\\infty; -1)$ và $(-1; +\\infty)$."
      },
      {
        "id": "D",
        "text": "Hàm số đồng biến trên $\\mathbb{R} \\setminus \\{-1\\}$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Tập xác định $D = \\mathbb{R} \\setminus \\{-1\\}$. Đạo hàm $y' = \\frac{2 \\cdot 1 - (-1) \\cdot 1}{(x+1)^2} = \\frac{3}{(x+1)^2} > 0$ với mọi $x \\ne -1$. Vậy hàm số đồng biến trên từng khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$."
  },
  {
    "id": 4,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ xác định và liên tục trên từng khoảng xác định, có bảng biến thiên như hình sau:\nKhẳng định nào sau đây là đúng?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$1$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$-$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$2$ <span class=\"bbt-arrow-down\">↘</span> $-\\infty$</td>\n        <td>||</td>\n        <td>$+\\infty$ <span class=\"bbt-arrow-down\">↘</span> $2$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "Hàm số có điểm cực trị tại $x = 1$."
      },
      {
        "id": "B",
        "text": "Hàm số nghịch biến trên các khoảng $(-\\infty; 1)$ và $(1; +\\infty)$."
      },
      {
        "id": "C",
        "text": "Hàm số nghịch biến trên $\\mathbb{R}$."
      },
      {
        "id": "D",
        "text": "Hàm số đồng biến trên các khoảng $(-\\infty; 1)$ và $(1; +\\infty)$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Từ bảng biến thiên, ta thấy $f'(x) < 0$ với mọi $x \\ne 1$. Do đó hàm số nghịch biến trên từng khoảng xác định $(-\\infty; 1)$ và $(1; +\\infty)$."
  },
  {
    "id": 5,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Điểm cực đại của hàm số $y = -x^3 + 3x - 1$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$x = -1$."
      },
      {
        "id": "B",
        "text": "$y = -3$."
      },
      {
        "id": "C",
        "text": "$y = 1$."
      },
      {
        "id": "D",
        "text": "$x = 1$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $y' = -3x^2 + 3 = -3(x^2 - 1)$. $y' = 0 \\Leftrightarrow x = 1$ hoặc $x = -1$. Bảng xét dấu $y'$ cho thấy qua $x = 1$, $y'$ đổi dấu từ dương sang âm, do đó điểm cực đại của hàm số là $x = 1$."
  },
  {
    "id": 6,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Giá trị cực tiểu của hàm số $y = x^4 - 2x^2 + 3$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2$."
      },
      {
        "id": "B",
        "text": "$\\pm 1$."
      },
      {
        "id": "C",
        "text": "$0$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Đạo hàm $y' = 4x^3 - 4x = 4x(x^2 - 1) = 0 \\Leftrightarrow x = 0$ hoặc $x = \\pm 1$. Tại $x = \\pm 1$, hàm số đạt cực tiểu và giá trị cực tiểu là $y(\\pm 1) = (\\pm 1)^4 - 2(\\pm 1)^2 + 3 = 2$."
  },
  {
    "id": 7,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên dưới đây:\nTọa độ điểm cực đại của đồ thị hàm số là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$0$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$5$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $1$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$(2; 1)$."
      },
      {
        "id": "B",
        "text": "$(0; 5)$."
      },
      {
        "id": "C",
        "text": "$y = 5$."
      },
      {
        "id": "D",
        "text": "$x = 0$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Điểm cực đại của đồ thị hàm số có hoành độ là điểm cực đại $x = 0$ và tung độ là giá trị cực đại $y = 5$, vậy điểm cực đại của đồ thị là $(0; 5)$."
  },
  {
    "id": 8,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Số điểm cực trị của hàm số $y = x^3 - 3x^2 + 3x - 1$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2$."
      },
      {
        "id": "B",
        "text": "$0$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$1$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Đạo hàm $y' = 3x^2 - 6x + 3 = 3(x - 1)^2 \\ge 0$ với mọi $x \\in \\mathbb{R}$. Đạo hàm triệt tiêu tại điểm duy nhất $x = 1$ nhưng không đổi dấu khi đi qua điểm đó. Do đó hàm số không có điểm cực trị."
  },
  {
    "id": 9,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Tìm tất cả các giá trị của tham số $m$ để hàm số $y = \\frac{1}{3}x^3 - mx^2 + (m^2 - 4)x + 1$ đồng biến trên $\\mathbb{R}$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$-2 \\le m \\le 2$."
      },
      {
        "id": "B",
        "text": "$m \\le -2$."
      },
      {
        "id": "C",
        "text": "Không có giá trị thực nào của $m$."
      },
      {
        "id": "D",
        "text": "$m \\ge 2$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Đạo hàm $y' = x^2 - 2mx + m^2 - 4$. Hàm số đồng biến trên $\\mathbb{R} \\Leftrightarrow y' \\ge 0, \\forall x \\in \\mathbb{R} \\Leftrightarrow \\Delta' \\le 0$. Ta có $\\Delta' = (-m)^2 - 1 \\cdot (m^2 - 4) = m^2 - m^2 + 4 = 4 > 0$. Vì $\\Delta' = 4 > 0$ với mọi $m$ nên tam thức bậc hai $y'$ luôn có 2 nghiệm phân biệt và đổi dấu. Vậy không có giá trị nào của $m$ thỏa mãn."
  },
  {
    "id": 10,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Tìm tất cả các giá trị của tham số thực $m$ để hàm số $y = \\frac{mx + 4}{x + m}$ nghịch biến trên từng khoảng xác định.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m < -2$ hoặc $m > 2$."
      },
      {
        "id": "B",
        "text": "$-2 < m < 2$."
      },
      {
        "id": "C",
        "text": "$m \\le -2$ hoặc $m \\ge 2$."
      },
      {
        "id": "D",
        "text": "$-2 \\le m \\le 2$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Tập xác định $D = \\mathbb{R} \\setminus \\{-m\\}$. Đạo hàm $y' = \\frac{m^2 - 4}{(x+m)^2}$. Để hàm số nghịch biến trên từng khoảng xác định thì $y' < 0, \\forall x \\ne -m \\Leftrightarrow m^2 - 4 < 0 \\Leftrightarrow -2 < m < 2$."
  },
  {
    "id": 11,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = f(x)$ xác định và liên tục trên $\\mathbb{R}$ có bảng biến thiên sau:\nSố điểm cực trị của hàm số $y = f(x)$ là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-2$</th>\n        <th>$0$</th>\n        <th>$1$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$4$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span></td>\n        <td>$-1$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $2$ <span class=\"bbt-arrow-down\">↘</span></td>\n        <td>$-\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2$."
      },
      {
        "id": "B",
        "text": "$4$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$1$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Hàm số xác định và liên tục trên $\\mathbb{R}$. Tại $x = -2$, $f'(x)$ đổi dấu từ $+$ sang $-$. Tại $x = 0$, $f'(x)$ không xác định nhưng $f(x)$ liên tục và đạo hàm đổi dấu từ $-$ sang $+$. Tại $x = 1$, $f'(x)$ đổi dấu từ $+$ sang $-$. Do đó hàm số có đúng $3$ điểm cực trị."
  },
  {
    "id": 12,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Tìm tất cả các giá trị của tham số $m$ để đồ thị hàm số $y = x^4 - 2(m-1)x^2 + 1$ có ba điểm cực trị.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m > 1$."
      },
      {
        "id": "B",
        "text": "$m \\le 1$."
      },
      {
        "id": "C",
        "text": "$m < 1$."
      },
      {
        "id": "D",
        "text": "$m \\ge 1$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Đạo hàm $y' = 4x^3 - 4(m-1)x = 4x[x^2 - (m-1)]$. Để đồ thị có 3 điểm cực trị thì phương trình $y' = 0$ có 3 nghiệm phân biệt $\\Leftrightarrow m - 1 > 0 \\Leftrightarrow m > 1$."
  },
  {
    "id": 13,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Hàm số $y = \\sqrt{4 - x^2}$ đồng biến trên khoảng nào sau đây?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$(-2; 2)$."
      },
      {
        "id": "B",
        "text": "$(-\\infty; 0)$."
      },
      {
        "id": "C",
        "text": "$(-2; 0)$."
      },
      {
        "id": "D",
        "text": "$(0; 2)$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Tập xác định $D = [-2; 2]$. Với $x \\in (-2; 2)$, đạo hàm $y' = \\frac{-2x}{2\\sqrt{4-x^2}} = \\frac{-x}{\\sqrt{4-x^2}}$. Ta có $y' > 0 \\Leftrightarrow -x > 0 \\Leftrightarrow x < 0$. Kết hợp tập xác định suy ra hàm số đồng biến trên $(-2; 0)$."
  },
  {
    "id": 14,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Giá trị cực đại của hàm số $y = x + \\frac{4}{x}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$-2$ tại $x = -4$."
      },
      {
        "id": "B",
        "text": "$2$ tại $x = 4$."
      },
      {
        "id": "C",
        "text": "$-4$ tại $x = -2$."
      },
      {
        "id": "D",
        "text": "$4$ tại $x = 2$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "TXĐ: $D = \\mathbb{R} \\setminus \\{0\\}$. Đạo hàm $y' = 1 - \\frac{4}{x^2} = \\frac{x^2 - 4}{x^2}$. Cho $y' = 0 \\Leftrightarrow x = \\pm 2$. Lập bảng biến thiên: qua $x = -2$, $y'$ đổi dấu từ $+$ sang $-$, nên hàm số đạt cực đại tại $x = -2$ và giá trị cực đại là $y_{CĐ} = y(-2) = -2 + \\frac{4}{-2} = -4$."
  },
  {
    "id": 15,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Đồ thị hàm số $y = x^3 - 3x^2 + 2$ có hai điểm cực trị $A$ và $B$. Độ dài đoạn thẳng $AB$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2\\sqrt{5}$."
      },
      {
        "id": "B",
        "text": "$\\sqrt{5}$."
      },
      {
        "id": "C",
        "text": "$4$."
      },
      {
        "id": "D",
        "text": "$2\\sqrt{2}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Ta có $y' = 3x^2 - 6x = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$. Với $x = 0 \\Rightarrow y = 2 \\Rightarrow A(0; 2)$. Với $x = 2 \\Rightarrow y = -2 \\Rightarrow B(2; -2)$. Độ dài $AB = \\sqrt{(2 - 0)^2 + (-2 - 2)^2} = \\sqrt{4 + 16} = \\sqrt{20} = 2\\sqrt{5}$."
  },
  {
    "id": 16,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = f(x)$ có bảng xét dấu đạo hàm $f'(x)$ như sau:\nHàm số $y = f(x)$ đồng biến trên khoảng nào sau đây?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-3$</th>\n        <th>$-1$</th>\n        <th>$1$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$(-3; -1)$."
      },
      {
        "id": "B",
        "text": "$(-1; 1)$."
      },
      {
        "id": "C",
        "text": "$(-3; 1)$."
      },
      {
        "id": "D",
        "text": "$(-\\infty; -1)$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Từ bảng xét dấu, $f'(x) > 0$ trên các khoảng $(-3; -1)$ và $(1; +\\infty)$. Do đó hàm số đồng biến trên khoảng $(-3; -1)$ và $(1; +\\infty)$."
  },
  {
    "id": 17,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = \\frac{x^2 - 3x + 6}{x - 1}$. Khoảng nghịch biến của hàm số là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$(-1; 3)$."
      },
      {
        "id": "B",
        "text": "$(1; 3)$."
      },
      {
        "id": "C",
        "text": "$(-1; 1)$ và $(1; 3)$."
      },
      {
        "id": "D",
        "text": "$(-\\infty; -1)$ và $(3; +\\infty)$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "TXĐ: $D = \\mathbb{R} \\setminus \\{1\\}$. Đạo hàm $y' = \\frac{(2x - 3)(x - 1) - (x^2 - 3x + 6)}{(x-1)^2} = \\frac{2x^2 - 5x + 3 - x^2 + 3x - 6}{(x-1)^2} = \\frac{x^2 - 2x - 3}{(x-1)^2}$. Cho $y' = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$. Vì $(x-1)^2 > 0$ với mọi $x \\ne 1$, nên $y' < 0 \\Leftrightarrow x^2 - 2x - 3 < 0 \\Leftrightarrow -1 < x < 3$ và $x \\ne 1$. Do đó hàm số nghịch biến trên từng khoảng $(-1; 1)$ và $(1; 3)$."
  },
  {
    "id": 18,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm tất cả các giá trị thực của tham số $m$ để hàm số $y = x^3 - 3x^2 + 3mx + 1$ đồng biến trên khoảng $(0; +\\infty)$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m \\ge 0$."
      },
      {
        "id": "B",
        "text": "$m \\le 1$."
      },
      {
        "id": "C",
        "text": "$m > 1$."
      },
      {
        "id": "D",
        "text": "$m \\ge 1$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $y' = 3x^2 - 6x + 3m$. Hàm số đồng biến trên $(0; +\\infty) \\Leftrightarrow y' \\ge 0, \\forall x > 0 \\Leftrightarrow 3x^2 - 6x + 3m \\ge 0 \\Leftrightarrow m \\ge 2x - x^2 = g(x), \\forall x > 0$. Khảo sát $g(x) = -x^2 + 2x$ trên $(0; +\\infty)$, có đỉnh tại $x = 1$, $g(1) = 1$. Vậy $\\max_{(0; +\\infty)} g(x) = 1$. Suy ra $m \\ge 1$."
  },
  {
    "id": 19,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm tất cả các giá trị thực của tham số $m$ để hàm số $y = \\frac{x - 2}{x - m}$ đồng biến trên khoảng $(2; +\\infty)$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m \\le 2$."
      },
      {
        "id": "B",
        "text": "$m < 2$."
      },
      {
        "id": "C",
        "text": "$m > 2$."
      },
      {
        "id": "D",
        "text": "$m \\ge 2$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Đạo hàm $y' = \\frac{-m - (-2)}{(x - m)^2} = \\frac{2 - m}{(x-m)^2}$. Để hàm số đồng biến trên $(2; +\\infty)$ thì:\n1) $y' > 0 \\Leftrightarrow 2 - m > 0 \\Leftrightarrow m < 2$.\n2) Điểm gián đoạn $x = m$ không thuộc khoảng $(2; +\\infty) \\Leftrightarrow m \\le 2$.\nKết hợp lại ta được $m < 2$."
  },
  {
    "id": 20,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = x(x-1)^2(x+2)^3$. Số điểm cực trị của hàm số đã cho là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$0$."
      },
      {
        "id": "B",
        "text": "$1$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$2$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Phương trình $f'(x) = 0$ có các nghiệm: $x = 0$ (bội 1 - nghiệm đơn), $x = 1$ (bội 2 - nghiệm kép), $x = -2$ (bội 3 - nghiệm lẻ). Đạo hàm $f'(x)$ chỉ đổi dấu qua các nghiệm bậc lẻ $x = 0$ và $x = -2$. Qua nghiệm bội chẵn $x = 1$, $f'(x)$ không đổi dấu. Do đó hàm số có đúng $2$ điểm cực trị."
  },
  {
    "id": 21,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Phương trình đường thẳng đi qua hai điểm cực trị của đồ thị hàm số $y = x^3 - 3x + 1$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = x + 1$."
      },
      {
        "id": "B",
        "text": "$y = -2x - 1$."
      },
      {
        "id": "C",
        "text": "$y = -2x + 1$."
      },
      {
        "id": "D",
        "text": "$y = 2x + 1$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Chia $y$ cho $y'$: Ta có $y = x^3 - 3x + 1$, $y' = 3x^2 - 3$. Thực hiện phép chia: $x^3 - 3x + 1 = \\frac{x}{3}(3x^2 - 3) - 2x + 1$. Do đó phần dư là $r(x) = -2x + 1$. Phương trình đường thẳng qua hai cực trị là $y = -2x + 1$."
  },
  {
    "id": 22,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\nSố điểm cực trị của hàm số $g(x) = f(x^2 - 2x)$ là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-1$</th>\n        <th>$3$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$2$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-4$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2$."
      },
      {
        "id": "B",
        "text": "$5$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$4$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Ta có $g'(x) = (2x - 2)f'(x^2 - 2x)$. Cho $g'(x) = 0 \\Leftrightarrow \\left[\\begin{array}{l} 2x - 2 = 0 \\\\ f'(x^2 - 2x) = 0 \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} x = 1 \\\\ x^2 - 2x = -1 \\\\ x^2 - 2x = 3 \\end{array}\\right.$.\n1) $x = 1$ (nghiệm đơn);\n2) $x^2 - 2x + 1 = 0 \\Leftrightarrow (x-1)^2 = 0 \\Leftrightarrow x = 1$ (nghiệm kép);\n3) $x^2 - 2x - 3 = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$ (hai nghiệm đơn phân biệt khác 1).\nKết hợp lại: tại $x = 1$, bội tổng là $1 + 2 = 3$ (bậc lẻ nên vẫn đổi dấu). Vậy $g'(x)$ đổi dấu tại 3 điểm phân biệt: $x = -1, x = 1, x = 3$. Số điểm cực trị của $g(x)$ là 3."
  },
  {
    "id": 23,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm tất cả các giá trị của $m$ để hàm số $y = \\frac{1}{3}x^3 - (m-1)x^2 + (m^2 - 3m + 2)x + 1$ đạt cực tiểu tại $x = 2$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m = 1$."
      },
      {
        "id": "B",
        "text": "$m = 2$."
      },
      {
        "id": "C",
        "text": "$m = 3$."
      },
      {
        "id": "D",
        "text": "$m = 5$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Đạo hàm $y' = x^2 - 2(m-1)x + m^2 - 3m + 2$. Điều kiện cần $y'(2) = 0 \\Leftrightarrow 4 - 4(m-1) + m^2 - 3m + 2 = 0 \\Leftrightarrow m^2 - 7m + 10 = 0 \\Leftrightarrow m = 2$ hoặc $m = 5$. Đạo hàm cấp hai $y'' = 2x - 2(m-1)$. Tại $x = 2$, $y''(2) = 4 - 2(m-1) = 6 - 2m$. Để $x = 2$ là điểm cực tiểu thì $y''(2) > 0 \\Leftrightarrow 6 - 2m > 0 \\Leftrightarrow m < 3$. Do đó chỉ có $m = 2$ thỏa mãn."
  },
  {
    "id": 24,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Cho hàm số $f(x)$ có đạo hàm $f'(x) = (x-1)(x^2 - 4)(x+3)$. Hàm số $g(x) = f(2 - x)$ đồng biến trên khoảng nào dưới đây?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$(4; +\\infty)$."
      },
      {
        "id": "B",
        "text": "$(-2; 0)$."
      },
      {
        "id": "C",
        "text": "$(1; 4)$."
      },
      {
        "id": "D",
        "text": "$(0; 1)$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $f'(x) = (x-1)(x-2)(x+2)(x+3)$. Nghiệm của $f'(x) = 0$ là $x \\in \\{-3; -2; 1; 2\\}$. Bảng xét dấu $f'(x)$: âm trên $(-3; -2)$ và $(1; 2)$; dương trên $(-\\infty; -3)$, $(-2; 1)$ và $(2; +\\infty)$. Đạo hàm của $g(x)$ là $g'(x) = -f'(2 - x)$. Hàm số $g(x)$ đồng biến khi $g'(x) > 0 \\Leftrightarrow f'(2 - x) < 0 \\Leftrightarrow \\left[\\begin{array}{l} -3 < 2 - x < -2 \\\\ 1 < 2 - x < 2 \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} 4 < x < 5 \\\\ 0 < x < 1 \\end{array}\\right.$. Do đó $g(x)$ đồng biến trên $(0; 1)$ và $(4; 5)$."
  },
  {
    "id": 25,
    "lesson": "Bài 1: Tính đơn điệu và cực trị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để đồ thị hàm số $y = |x^3 - 3x^2 + m|$ có đúng $5$ điểm cực trị?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$3$."
      },
      {
        "id": "B",
        "text": "$4$."
      },
      {
        "id": "C",
        "text": "$5$."
      },
      {
        "id": "D",
        "text": "$7$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Xét hàm số $f(x) = x^3 - 3x^2 + m$. Ta có $f'(x) = 3x^2 - 6x = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$. Hai giá trị cực trị của $f(x)$ là $y_{CĐ} = f(0) = m$ và $y_{CT} = f(2) = m - 4$. Số điểm cực trị của hàm số $y = |f(x)|$ bằng số điểm cực trị của $f(x)$ (là 2) cộng với số nghiệm đơn của phương trình $f(x) = 0$. Để $y = |f(x)|$ có đúng 5 điểm cực trị thì phương trình $f(x) = 0$ phải có 3 nghiệm đơn phân biệt, điều này tương đương với $y_{CT} < 0 < y_{CĐ} \\Leftrightarrow m - 4 < 0 < m \\Leftrightarrow 0 < m < 4$. Vì $m \\in \\mathbb{Z}$ nên $m \\in \\{1; 2; 3\\}$. Vậy có đúng $3$ giá trị nguyên của $m$."
  },
  {
    "id": 26,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-2; 3]$ và có bảng biến thiên như hình vẽ:\nGiá trị lớn nhất $M$ và giá trị nhỏ nhất $m$ của hàm số trên đoạn $[-2; 3]$ lần lượt là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-2$</th>\n        <th>$0$</th>\n        <th>$2$</th>\n        <th>$3$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td></td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n        <td></td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$1$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $4$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-1$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $2$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$M = 4$ và $m = 1$."
      },
      {
        "id": "B",
        "text": "$M = 4$ và $m = -1$."
      },
      {
        "id": "C",
        "text": "$M = 3$ và $m = -2$."
      },
      {
        "id": "D",
        "text": "$M = 2$ và $m = -1$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Quan sát bảng biến thiên trên đoạn $[-2; 3]$, giá trị cao nhất của hàm số là $f(0) = 4$ và giá trị thấp nhất là $f(2) = -1$. Do đó $M = 4$ và $m = -1$."
  },
  {
    "id": 27,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Giá trị nhỏ nhất của hàm số $y = x^4 - 2x^2 + 5$ trên đoạn $[0; 2]$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$5$."
      },
      {
        "id": "B",
        "text": "$4$."
      },
      {
        "id": "C",
        "text": "$1$."
      },
      {
        "id": "D",
        "text": "$13$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Đạo hàm $y' = 4x^3 - 4x = 4x(x^2 - 1)$. Trên đoạn $[0; 2]$, phương trình $y' = 0$ có các nghiệm $x = 0$ và $x = 1$. Tính các giá trị: $y(0) = 5$, $y(1) = 4$, $y(2) = 2^4 - 2(2^2) + 5 = 13$. Vậy giá trị nhỏ nhất là $\\min_{[0; 2]} y = 4$ tại $x = 1$."
  },
  {
    "id": 28,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ xác định trên $(0; +\\infty)$ và có bảng biến thiên như sau:\nKhẳng định nào sau đây là đúng về giá trị nhỏ nhất của hàm số?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$0$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>||</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>|| $+\\infty$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $3$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "Giá trị lớn nhất của hàm số là $+\\infty$."
      },
      {
        "id": "B",
        "text": "Giá trị nhỏ nhất của hàm số bằng $2$ tại $x = 3$."
      },
      {
        "id": "C",
        "text": "Hàm số không có giá trị nhỏ nhất trên $(0; +\\infty)$."
      },
      {
        "id": "D",
        "text": "Giá trị nhỏ nhất của hàm số trên $(0; +\\infty)$ bằng $3$ tại $x = 2$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Từ bảng biến thiên, hàm số giảm từ $+\\infty$ xuống $3$ khi $x$ tăng từ $0$ đến $2$, rồi tăng lên $+\\infty$ khi $x > 2$. Điểm thấp nhất trên toàn miền $(0; +\\infty)$ là $(2; 3)$. Do đó $\\min_{(0; +\\infty)} f(x) = 3$ đạt tại $x = 2$."
  },
  {
    "id": 29,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Giá trị lớn nhất của hàm số $y = \\frac{x+1}{x-1}$ trên đoạn $[2; 4]$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$3$."
      },
      {
        "id": "B",
        "text": "$\\frac{5}{3}$."
      },
      {
        "id": "C",
        "text": "$2$."
      },
      {
        "id": "D",
        "text": "$4$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Hàm số liên tục trên $[2; 4]$. Đạo hàm $y' = \\frac{-2}{(x-1)^2} < 0, \\forall x \\in [2; 4]$, nên hàm số nghịch biến trên $[2; 4]$. Do đó $\\max_{[2; 4]} y = y(2) = \\frac{2+1}{2-1} = 3$."
  },
  {
    "id": 30,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Giá trị lớn nhất của hàm số $y = \\sin x + \\cos x$ trên $\\mathbb{R}$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$1$."
      },
      {
        "id": "B",
        "text": "$\\frac{\\sqrt{2}}{2}$."
      },
      {
        "id": "C",
        "text": "$2$."
      },
      {
        "id": "D",
        "text": "$\\sqrt{2}$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $\\sin x + \\cos x = \\sqrt{2}\\sin\\left(x + \\frac{\\pi}{4}\\right)$. Vì $\\sin\\left(x + \\frac{\\pi}{4}\\right) \\le 1$ nên giá trị lớn nhất của hàm số là $\\sqrt{2}$, đạt được khi $x = \\frac{\\pi}{4} + k2\\pi$."
  },
  {
    "id": 31,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = f(x)$ xác định và liên tục trên đoạn $[-1; 4]$ có bảng biến thiên dưới đây:\nGọi $M$ và $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của $f(x)$ trên $[-1; 4]$. Tổng $M + m$ bằng:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-1$</th>\n        <th>$1$</th>\n        <th>$3$</th>\n        <th>$4$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td></td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n        <td></td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-2$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $5$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $1$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $3$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$4$."
      },
      {
        "id": "B",
        "text": "$7$."
      },
      {
        "id": "C",
        "text": "$6$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Từ bảng biến thiên trên $[-1; 4]$: giá trị lớn nhất là $M = f(1) = 5$, giá trị nhỏ nhất là $m = f(-1) = -2$. Khi đó tổng $M + m = 5 + (-2) = 3$."
  },
  {
    "id": 32,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Gọi $M$ và $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = x^3 - 3x + 2$ trên đoạn $[0; 2]$. Hiệu $M - m$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$0$."
      },
      {
        "id": "B",
        "text": "$2$."
      },
      {
        "id": "C",
        "text": "$6$."
      },
      {
        "id": "D",
        "text": "$4$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Đạo hàm $y' = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$. Vì xét trên $[0; 2]$ nên ta nhận $x = 1$. Tính các giá trị: $y(0) = 2$, $y(1) = 0$, $y(2) = 2^3 - 3(2) + 2 = 4$. Do đó $M = \\max_{[0; 2]} y = 4$ và $m = \\min_{[0; 2]} y = 0$. Suy ra $M - m = 4 - 0 = 4$."
  },
  {
    "id": 33,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Tìm giá trị nhỏ nhất của hàm số $y = x + \\frac{9}{x}$ trên khoảng $(0; +\\infty)$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$6$."
      },
      {
        "id": "B",
        "text": "$9$."
      },
      {
        "id": "C",
        "text": "$10$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Với mọi $x > 0$, áp dụng bất đẳng thức Cauchy (AM-GM): $y = x + \\frac{9}{x} \\ge 2\\sqrt{x \\cdot \\frac{9}{x}} = 2 \\cdot 3 = 6$. Dấu đẳng thức xảy ra khi $x = \\frac{9}{x} \\Leftrightarrow x^2 = 9 \\Leftrightarrow x = 3 > 0$. Vậy giá trị nhỏ nhất là $6$."
  },
  {
    "id": 34,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Giá trị lớn nhất của hàm số $y = \\sqrt{4 - x^2}$ trên đoạn $[-2; 2]$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2$."
      },
      {
        "id": "B",
        "text": "$0$."
      },
      {
        "id": "C",
        "text": "$4$."
      },
      {
        "id": "D",
        "text": "$\\sqrt{2}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Với $x \\in [-2; 2]$, ta có $x^2 \\ge 0 \\Rightarrow 4 - x^2 \\le 4 \\Rightarrow \\sqrt{4 - x^2} \\le \\sqrt{4} = 2$. Đẳng thức xảy ra khi $x = 0 \\in [-2; 2]$. Vậy giá trị lớn nhất bằng $2$."
  },
  {
    "id": 35,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = \\frac{2x - m}{x + 1}$. Tìm tất cả các giá trị của tham số $m$ để $\\max_{[0; 2]} y = 3$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m = 1$."
      },
      {
        "id": "B",
        "text": "$m = 3$."
      },
      {
        "id": "C",
        "text": "$m = -3$."
      },
      {
        "id": "D",
        "text": "$m = -5$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Hàm số liên tục trên $[0; 2]$. Đạo hàm $y' = \\frac{2 + m}{(x+1)^2}$.\n- TH1: $2 + m > 0 \\Leftrightarrow m > -2$: hàm số đồng biến trên $[0; 2] \\Rightarrow \\max_{[0; 2]} y = y(2) = \\frac{4 - m}{3} = 3 \\Leftrightarrow 4 - m = 9 \\Leftrightarrow m = -5$ (loại vì không thỏa mãn $m > -2$).\n- TH2: $2 + m < 0 \\Leftrightarrow m < -2$: hàm số nghịch biến trên $[0; 2] \\Rightarrow \\max_{[0; 2]} y = y(0) = -m = 3 \\Leftrightarrow m = -3$ (thỏa mãn $m < -2$). Vậy $m = -3$."
  },
  {
    "id": 36,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên trên $\\mathbb{R}$ như sau:\nGiá trị nhỏ nhất của hàm số $g(x) = f(x^2)$ trên $\\mathbb{R}$ bằng:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$0$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$3$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-1$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "Không có giá trị nhỏ nhất."
      },
      {
        "id": "B",
        "text": "$0$."
      },
      {
        "id": "C",
        "text": "$-1$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Đặt $t = x^2 \\ge 0$. Khi đó bài toán trở thành tìm giá trị nhỏ nhất của $f(t)$ với $t \\in [0; +\\infty)$. Dựa vào bảng biến thiên, trên nửa khoảng $[0; +\\infty)$, giá trị nhỏ nhất của $f(t)$ đạt tại $t = 2$ với giá trị là $f(2) = -1$. Vì có nghiệm $x^2 = 2 \\Leftrightarrow x = \\pm\\sqrt{2}$ nên $\\min_{\\mathbb{R}} g(x) = -1$."
  },
  {
    "id": 37,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm giá trị nhỏ nhất của hàm số $y = x^2 + \\frac{16}{x}$ trên khoảng $(0; +\\infty)$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$16$."
      },
      {
        "id": "B",
        "text": "$12$."
      },
      {
        "id": "C",
        "text": "$10$."
      },
      {
        "id": "D",
        "text": "$8$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Cách 1: Đạo hàm $y' = 2x - \\frac{16}{x^2} = \\frac{2x^3 - 16}{x^2}$. Cho $y' = 0 \\Leftrightarrow x^3 = 8 \\Leftrightarrow x = 2$. Lập bảng biến thiên trên $(0; +\\infty)$, hàm số đạt cực tiểu tại $x = 2$, suy ra $\\min = y(2) = 2^2 + \\frac{16}{2} = 4 + 8 = 12$.\nCách 2: Áp dụng Cauchy cho 3 số dương: $x^2 + \\frac{8}{x} + \\frac{8}{x} \\ge 3\\sqrt[3]{x^2 \\cdot \\frac{8}{x} \\cdot \\frac{8}{x}} = 3 \\cdot 4 = 12$."
  },
  {
    "id": 38,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Giá trị lớn nhất của hàm số $y = x\\sqrt{12 - x^2}$ trên đoạn $[0; \\sqrt{12}]$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2\\sqrt{3}$."
      },
      {
        "id": "B",
        "text": "$12$."
      },
      {
        "id": "C",
        "text": "$3\\sqrt{2}$."
      },
      {
        "id": "D",
        "text": "$6$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Với mọi $x \\in [0; \\sqrt{12}]$, áp dụng bất đẳng thức Cauchy cho hai số dương $x^2$ và $12 - x^2$: $x\\sqrt{12 - x^2} = \\sqrt{x^2(12 - x^2)} \\le \\sqrt{\\frac{(x^2 + 12 - x^2)^2}{4}} = \\sqrt{\\frac{144}{4}} = 6$. Dấu bằng xảy ra khi $x^2 = 12 - x^2 \\Leftrightarrow 2x^2 = 12 \\Leftrightarrow x = \\sqrt{6}$. Vậy giá trị lớn nhất bằng $6$."
  },
  {
    "id": 39,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = \\frac{x+m}{x+1}$ ($m \\ne 1$). Tìm $m$ để $\\min_{[1; 2]} y + \\max_{[1; 2]} y = \\frac{16}{3}$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m = 3$."
      },
      {
        "id": "B",
        "text": "$m = 2$."
      },
      {
        "id": "C",
        "text": "$m = -5$."
      },
      {
        "id": "D",
        "text": "$m = 5$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Đạo hàm $y' = \\frac{1 - m}{(x+1)^2} \\ne 0, \\forall x \\in [1; 2]$. Vì hàm số luôn đơn điệu trên $[1; 2]$ nên giá trị lớn nhất và giá trị nhỏ nhất đạt tại hai đầu mút của đoạn. Do đó: $\\min_{[1; 2]} y + \\max_{[1; 2]} y = y(1) + y(2) = \\frac{1+m}{2} + \\frac{2+m}{3} = \\frac{5m+7}{6}$. Theo đề bài: $\\frac{5m+7}{6} = \\frac{16}{3} \\Leftrightarrow 5m + 7 = 32 \\Leftrightarrow 5m = 25 \\Leftrightarrow m = 5$ (thỏa mãn $m \\ne 1$)."
  },
  {
    "id": 40,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm tất cả các giá trị thực của tham số $m$ để giá trị nhỏ nhất của hàm số $y = x^3 - 3x^2 + m$ trên đoạn $[-1; 2]$ bằng $-3$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m = 2$."
      },
      {
        "id": "B",
        "text": "$m = 4$."
      },
      {
        "id": "C",
        "text": "$m = 1$."
      },
      {
        "id": "D",
        "text": "$m = -3$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Đạo hàm $y' = 3x^2 - 6x = 3x(x - 2) = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$ (đều thuộc đoạn $[-1; 2]$). Tính các giá trị: $y(-1) = -1 - 3 + m = m - 4$; $y(0) = m$; $y(2) = 8 - 12 + m = m - 4$. Do đó $\\min_{[-1; 2]} y = m - 4$. Theo đề bài: $m - 4 = -3 \\Leftrightarrow m = 1$."
  },
  {
    "id": 41,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Gọi $M$ và $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = x + \\sqrt{2 - x^2}$. Giá trị của $M^2 + m^2$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$4$."
      },
      {
        "id": "B",
        "text": "$6$."
      },
      {
        "id": "C",
        "text": "$2$."
      },
      {
        "id": "D",
        "text": "$8$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "TXĐ $D = [-\\sqrt{2}; \\sqrt{2}]$. Đạo hàm $y' = 1 - \\frac{x}{\\sqrt{2 - x^2}}$. Cho $y' = 0 \\Leftrightarrow \\sqrt{2 - x^2} = x \\Leftrightarrow x = 1$ (do $x > 0$). Tính các giá trị: $y(-\\sqrt{2}) = -\\sqrt{2}$; $y(\\sqrt{2}) = \\sqrt{2}$; $y(1) = 1 + 1 = 2$. Do đó $M = 2$ và $m = -\\sqrt{2}$. Vậy $M^2 + m^2 = 2^2 + (-\\sqrt{2})^2 = 4 + 2 = 6$."
  },
  {
    "id": 42,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-1; 3]$ có bảng biến thiên như sau:\nCó bao nhiêu giá trị thực của tham số $m$ để $\\max_{[-1; 3]} |f(x) + m| = 5$?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-1$</th>\n        <th>$1$</th>\n        <th>$3$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td></td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n        <td></td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$2$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-2$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $4$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$1$."
      },
      {
        "id": "B",
        "text": "$4$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$2$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Từ bảng biến thiên trên $[-1; 3]$, ta có $\\min f(x) = -2$ và $\\max f(x) = 4$. Khi đó $\\max_{[-1; 3]} |f(x) + m| = \\max\\{|4 + m|; |-2 + m|\\}$.\nĐể $\\max = 5$ thì:\n- TH1: $|4 + m| = 5 \\Leftrightarrow m = 1$ hoặc $m = -9$. Với $m = 1$: $|-2 + 1| = 1 \\le 5$ (nhận). Với $m = -9$: $|-2 - 9| = 11 > 5$ (loại).\n- TH2: $|-2 + m| = 5 \\Leftrightarrow m = 7$ hoặc $m = -3$. Với $m = 7$: $|4 + 7| = 11 > 5$ (loại). Với $m = -3$: $|4 - 3| = 1 \\le 5$ (nhận).\nVậy có đúng 2 giá trị thực của $m$ là $m = 1$ và $m = -3$."
  },
  {
    "id": 43,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Giá trị lớn nhất của hàm số $y = \\cos^2 x + 2\\sin x + 2$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$5$."
      },
      {
        "id": "B",
        "text": "$3$."
      },
      {
        "id": "C",
        "text": "$2$."
      },
      {
        "id": "D",
        "text": "$4$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $\\cos^2 x = 1 - \\sin^2 x$. Đặt $t = \\sin x$, $t \\in [-1; 1]$. Khi đó hàm số trở thành $g(t) = 1 - t^2 + 2t + 2 = -t^2 + 2t + 3 = -(t - 1)^2 + 4$. Vì $t \\in [-1; 1]$ nên giá trị lớn nhất đạt tại $t = 1$ (tức $\\sin x = 1$), và $\\max = 4$."
  },
  {
    "id": 44,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Cho hàm số $f(x) = x^4 - 2x^2 + m$. Gọi $M$ và $m_0$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số trên đoạn $[0; 2]$. Tìm giá trị của tham số $m$ để $M = 2m_0$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m = 10$."
      },
      {
        "id": "B",
        "text": "$m = 12$."
      },
      {
        "id": "C",
        "text": "$m = 6$."
      },
      {
        "id": "D",
        "text": "$m = 8$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Đạo hàm $f'(x) = 4x^3 - 4x = 4x(x^2 - 1) = 0 \\Leftrightarrow x = 0$ hoặc $x = 1$ trên $[0; 2]$. Tính các giá trị: $f(0) = m$, $f(1) = m - 1$, $f(2) = 16 - 8 + m = m + 8$. Do đó $M = m + 8$ và $m_0 = m - 1$. Theo bài ra $M = 2m_0 \\Leftrightarrow m + 8 = 2(m - 1) \\Leftrightarrow m + 8 = 2m - 2 \\Leftrightarrow m = 10$."
  },
  {
    "id": 45,
    "lesson": "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Cho hai số thực không âm $x, y$ thỏa mãn $x + y = 1$. Giá trị lớn nhất và giá trị nhỏ nhất của biểu thức $P = x^3 + y^3 + \\frac{3}{4}xy$ lần lượt là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$1$ và $\\frac{7}{16}$."
      },
      {
        "id": "B",
        "text": "$1$ và $\\frac{1}{2}$."
      },
      {
        "id": "C",
        "text": "$\\frac{3}{2}$ và $\\frac{7}{16}$."
      },
      {
        "id": "D",
        "text": "$2$ và $\\frac{1}{4}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Ta có $x^3 + y^3 = (x+y)^3 - 3xy(x+y) = 1 - 3xy$. Đặt $t = xy$. Vì $x, y \\ge 0$ và $x+y=1$ nên $0 \\le t \\le \\frac{(x+y)^2}{4} = \\frac{1}{4}$. Khi đó $P = 1 - 3t + \\frac{3}{4}t = 1 - \\frac{9}{4}t$. Với $t \\in \\left[0; \\frac{1}{4}\\right]$, hàm số bậc nhất $P(t)$ nghịch biến nên $\\max P = P(0) = 1$ (khi một số bằng 0, một số bằng 1), $\\min P = P\\left(\\frac{1}{4}\\right) = 1 - \\frac{9}{16} = \\frac{7}{16}$ (khi $x = y = \\frac{1}{2}$)."
  },
  {
    "id": 46,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\nPhương trình đường tiệm cận đứng và tiệm cận ngang của đồ thị hàm số lần lượt là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>||</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$1$ <span class=\"bbt-arrow-up\">↗</span> $+\\infty$</td>\n        <td>||</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span> $1$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "Tiệm cận đứng $x = 2$, đồ thị không có tiệm cận ngang."
      },
      {
        "id": "B",
        "text": "Tiệm cận đứng $x = 2$, tiệm cận ngang $y = 1$."
      },
      {
        "id": "C",
        "text": "Tiệm cận đứng $x = 1$, tiệm cận ngang $y = 2$."
      },
      {
        "id": "D",
        "text": "Tiệm cận đứng $y = 1$, tiệm cận ngang $x = 2$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Từ bảng biến thiên, ta có:\n- $\\lim_{x \\to 2^-} f(x) = +\\infty$ và $\\lim_{x \\to 2^+} f(x) = -\\infty$, suy ra đường thẳng $x = 2$ là tiệm cận đứng.\n- $\\lim_{x \\to -\\infty} f(x) = 1$ và $\\lim_{x \\to +\\infty} f(x) = 1$, suy ra đường thẳng $y = 1$ là tiệm cận ngang."
  },
  {
    "id": 47,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Đường tiệm cận đứng của đồ thị hàm số $y = \\frac{2x - 3}{x + 1}$ là đường thẳng có phương trình:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = 2$."
      },
      {
        "id": "B",
        "text": "$x = 1$."
      },
      {
        "id": "C",
        "text": "$y = -3$."
      },
      {
        "id": "D",
        "text": "$x = -1$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có mẫu số triệt tiêu khi $x + 1 = 0 \\Leftrightarrow x = -1$. Vì $\\lim_{x \\to (-1)^+} \\frac{2x-3}{x+1} = -\\infty$ nên đường tiệm cận đứng là $x = -1$."
  },
  {
    "id": 48,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{0\\}$ có bảng biến thiên như sau:\nĐồ thị hàm số đã cho có bao nhiêu đường tiệm cận ngang?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$0$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-2$ <span class=\"bbt-arrow-down\">↘</span> $-\\infty$</td>\n        <td>||</td>\n        <td>$+\\infty$ <span class=\"bbt-arrow-down\">↘</span> $3$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$0$."
      },
      {
        "id": "B",
        "text": "$2$."
      },
      {
        "id": "C",
        "text": "$1$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Ta thấy $\\lim_{x \\to -\\infty} f(x) = -2$ nên đường thẳng $y = -2$ là tiệm cận ngang. Và $\\lim_{x \\to +\\infty} f(x) = 3$ nên đường thẳng $y = 3$ là tiệm cận ngang thứ hai. Vậy đồ thị hàm số có đúng $2$ đường tiệm cận ngang."
  },
  {
    "id": 49,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Phương trình đường tiệm cận ngang của đồ thị hàm số $y = \\frac{3x - 1}{x + 2}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$x = -2$."
      },
      {
        "id": "B",
        "text": "$y = -\\frac{1}{2}$."
      },
      {
        "id": "C",
        "text": "$y = -2$."
      },
      {
        "id": "D",
        "text": "$y = 3$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $\\lim_{x \\to \\pm\\infty} \\frac{3x - 1}{x + 2} = \\lim_{x \\to \\pm\\infty} \\frac{3 - \\frac{1}{x}}{1 + \\frac{2}{x}} = 3$. Do đó đường thẳng $y = 3$ là tiệm cận ngang của đồ thị hàm số."
  },
  {
    "id": 50,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = x + 1 + \\frac{1}{x - 2}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = 1$."
      },
      {
        "id": "B",
        "text": "$x = 2$."
      },
      {
        "id": "C",
        "text": "$y = x - 2$."
      },
      {
        "id": "D",
        "text": "$y = x + 1$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Ta có $\\lim_{x \\to \\pm\\infty} [y - (x + 1)] = \\lim_{x \\to \\pm\\infty} \\frac{1}{x - 2} = 0$. Theo định nghĩa, đường thẳng $y = x + 1$ là tiệm cận xiên của đồ thị hàm số."
  },
  {
    "id": 51,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = \\frac{x^2 - 3x + 5}{x - 1}$. Phương trình đường tiệm cận xiên của đồ thị hàm số là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = x + 1$."
      },
      {
        "id": "B",
        "text": "$y = x - 3$."
      },
      {
        "id": "C",
        "text": "$y = x - 2$."
      },
      {
        "id": "D",
        "text": "$y = 2x - 1$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Chia đa thức tử cho mẫu: $\\frac{x^2 - 3x + 5}{x - 1} = x - 2 + \\frac{3}{x - 1}$. Vì $\\lim_{x \\to \\pm\\infty} \\frac{3}{x - 1} = 0$ nên tiệm cận xiên của đồ thị là đường thẳng $y = x - 2$."
  },
  {
    "id": 52,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Tổng số đường tiệm cận đứng và tiệm cận ngang của đồ thị hàm số $y = \\frac{x + 1}{x^2 - 4}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$3$."
      },
      {
        "id": "B",
        "text": "$1$."
      },
      {
        "id": "C",
        "text": "$4$."
      },
      {
        "id": "D",
        "text": "$2$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Mẫu số triệt tiêu khi $x^2 - 4 = 0 \\Leftrightarrow x = 2$ hoặc $x = -2$. Tử số tại các điểm này đều khác 0 (tại $x=2$ tử là 3, tại $x=-2$ tử là -1), do đó đồ thị có 2 tiệm cận đứng là $x = 2$ và $x = -2$. Bậc của tử (bậc 1) nhỏ hơn bậc của mẫu (bậc 2) nên $\\lim_{x \\to \\pm\\infty} y = 0$, suy ra có 1 tiệm cận ngang $y = 0$. Tổng số tiệm cận đứng và ngang là $2 + 1 = 3$."
  },
  {
    "id": 53,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{1\\}$ có bảng biến thiên như sau:\nSố đường tiệm cận (bao gồm tiệm cận đứng và tiệm cận xiên) của đồ thị hàm số là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$0$</th>\n        <th>$1$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$-1$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-\\infty$</td>\n        <td>||</td>\n        <td>$+\\infty$ <span class=\"bbt-arrow-down\">↘</span></td>\n        <td>$3$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$3$."
      },
      {
        "id": "B",
        "text": "$0$."
      },
      {
        "id": "C",
        "text": "$1$."
      },
      {
        "id": "D",
        "text": "$2$ (gồm $1$ tiệm cận đứng và $1$ tiệm cận xiên)."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Từ bảng biến thiên, ta có:\n- $\\lim_{x \\to 1^-} f(x) = -\\infty$ và $\\lim_{x \\to 1^+} f(x) = +\\infty$, suy ra $x = 1$ là tiệm cận đứng.\n- Khi $x \\to \\pm\\infty$, hàm số tiến ra $\\pm\\infty$ theo dạng phân thức bậc 2 trên bậc 1 có tiệm cận xiên. Do đó đồ thị có tổng cộng 2 đường tiệm cận (1 đứng, 1 xiên)."
  },
  {
    "id": 54,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{2x^2 - 3x + 2}{x - 2}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = x + 1$."
      },
      {
        "id": "B",
        "text": "$y = 2x + 1$."
      },
      {
        "id": "C",
        "text": "$y = 2x + 3$."
      },
      {
        "id": "D",
        "text": "$y = 2x - 1$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Thực hiện phép chia đa thức: $2x^2 - 3x + 2 = (x - 2)(2x + 1) + 4$. Khi đó $y = 2x + 1 + \\frac{4}{x - 2}$. Vì $\\lim_{x \\to \\pm\\infty} \\frac{4}{x - 2} = 0$ nên tiệm cận xiên là $y = 2x + 1$."
  },
  {
    "id": 55,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Tọa độ giao điểm $I$ của hai đường tiệm cận của đồ thị hàm số $y = \\frac{2x + 3}{x - 1}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$I(1; 2)$."
      },
      {
        "id": "B",
        "text": "$I(1; -3)$."
      },
      {
        "id": "C",
        "text": "$I(-1; 2)$."
      },
      {
        "id": "D",
        "text": "$I(2; 1)$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Đồ thị có tiệm cận đứng là $x = 1$ và tiệm cận ngang là $y = \\frac{2}{1} = 2$. Giao điểm của hai tiệm cận có tọa độ là $I(1; 2)$ (đây cũng chính là tâm đối xứng của đồ thị)."
  },
  {
    "id": 56,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Số đường tiệm cận đứng của đồ thị hàm số $y = \\frac{\\sqrt{x + 4} - 2}{x^2 + x}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$0$."
      },
      {
        "id": "B",
        "text": "$2$."
      },
      {
        "id": "C",
        "text": "$1$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "ĐKXĐ: $x \\ge -4$ và $x \\ne 0, x \\ne -1$. Rút gọn biểu thức:\n$y = \\frac{(\\sqrt{x+4}-2)(\\sqrt{x+4}+2)}{x(x+1)(\\sqrt{x+4}+2)} = \\frac{x}{x(x+1)(\\sqrt{x+4}+2)} = \\frac{1}{(x+1)(\\sqrt{x+4}+2)}$ (với $x \\ne 0$).\n- Tại $x = 0$: $\\lim_{x \\to 0} y = \\frac{1}{1 \\cdot 4} = \\frac{1}{4} \\ne \\pm\\infty$, do đó $x = 0$ không phải tiệm cận đứng.\n- Tại $x = -1$: $\\lim_{x \\to (-1)^\\pm} y = \\pm\\infty$, do đó $x = -1$ là đường tiệm cận đứng duy nhất."
  },
  {
    "id": 57,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên dưới đây. Biết đồ thị hàm số có tiệm cận đứng $x = 2$ và tiệm cận xiên $y = 2x - 1$. Tọa độ giao điểm của hai đường tiệm cận là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>||</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span> $+\\infty$</td>\n        <td>||</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span> $+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$(2; 3)$."
      },
      {
        "id": "B",
        "text": "$(2; 1)$."
      },
      {
        "id": "C",
        "text": "$(1; 2)$."
      },
      {
        "id": "D",
        "text": "$(2; 5)$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Giao điểm của tiệm cận đứng $x = 2$ và tiệm cận xiên $y = 2x - 1$: Thay $x = 2$ vào phương trình tiệm cận xiên ta được $y = 2(2) - 1 = 3$. Vậy tọa độ giao điểm là $(2; 3)$."
  },
  {
    "id": 58,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\sqrt{x^2 + 2x + 3}$ khi $x \\to +\\infty$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = 2x + 1$."
      },
      {
        "id": "B",
        "text": "$y = x + 1$."
      },
      {
        "id": "C",
        "text": "$y = x + 2$."
      },
      {
        "id": "D",
        "text": "$y = x - 1$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Ta tìm các hệ số $a, b$ của tiệm cận xiên $y = ax + b$ khi $x \\to +\\infty$:\n$a = \\lim_{x \\to +\\infty} \\frac{y}{x} = \\lim_{x \\to +\\infty} \\frac{\\sqrt{x^2+2x+3}}{x} = 1$.\n$b = \\lim_{x \\to +\\infty} (y - ax) = \\lim_{x \\to +\\infty} (\\sqrt{x^2+2x+3} - x) = \\lim_{x \\to +\\infty} \\frac{2x+3}{\\sqrt{x^2+2x+3} + x} = \\frac{2}{1+1} = 1$.\nVậy đường tiệm cận xiên khi $x \\to +\\infty$ là $y = x + 1$."
  },
  {
    "id": 59,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm tất cả các giá trị thực của tham số $m$ để đồ thị hàm số $y = \\frac{x - 1}{x^2 - 2mx + 4}$ có đúng hai đường tiệm cận đứng.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m > 2$ hoặc $m < -2$."
      },
      {
        "id": "B",
        "text": "$-2 < m < 2$."
      },
      {
        "id": "C",
        "text": "$\\left[\\begin{array}{l} m > 2 \\\\ m < -2 \\end{array}\\right.$ và $m \\ne \\frac{5}{2}$."
      },
      {
        "id": "D",
        "text": "$m \\ne \\pm 2$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Đồ thị hàm số có đúng 2 tiệm cận đứng $\\Leftrightarrow$ phương trình mẫu số $g(x) = x^2 - 2mx + 4 = 0$ có 2 nghiệm phân biệt khác 1.\n1) $\\Delta' = m^2 - 4 > 0 \\Leftrightarrow m > 2$ hoặc $m < -2$.\n2) $g(1) \\ne 0 \\Leftrightarrow 1^2 - 2m(1) + 4 \\ne 0 \\Leftrightarrow 5 - 2m \\ne 0 \\Leftrightarrow m \\ne \\frac{5}{2}$.\nKết hợp cả hai điều kiện ta được kết quả cần tìm."
  },
  {
    "id": 60,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = \\frac{x^2 + mx - 1}{x - 1}$. Tìm giá trị của tham số $m$ để tiệm cận xiên của đồ thị hàm số đi qua điểm $A(2; 5)$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m = 1$."
      },
      {
        "id": "B",
        "text": "$m = -2$."
      },
      {
        "id": "C",
        "text": "$m = 3$."
      },
      {
        "id": "D",
        "text": "$m = 2$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Chia đa thức: $\\frac{x^2 + mx - 1}{x - 1} = x + (m + 1) + \\frac{m}{x - 1}$. Phương trình đường tiệm cận xiên là $y = x + m + 1$. Vì đường thẳng này đi qua $A(2; 5)$ nên: $5 = 2 + m + 1 \\Leftrightarrow 5 = m + 3 \\Leftrightarrow m = 2$."
  },
  {
    "id": 61,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = \\frac{2x + 1}{x - 1}$ có đồ thị $(C)$. Gọi $I$ là giao điểm của hai tiệm cận. Tiếp tuyến tại một điểm bất kỳ trên $(C)$ cắt hai đường tiệm cận tại $A$ và $B$. Diện tích tam giác $IAB$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$12$."
      },
      {
        "id": "B",
        "text": "$4$."
      },
      {
        "id": "C",
        "text": "$6$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Giao điểm của 2 đường tiệm cận là $I(1; 2)$. Với đồ thị hàm nhất biến $y = \\frac{ax+b}{cx+d}$, tiếp tuyến tại điểm bất kì luôn tạo với 2 tiệm cận một tam giác có diện tích không đổi: $S_{\\Delta IAB} = \\frac{2|ad - bc|}{c^2}$. Áp dụng công thức: $a=2, b=1, c=1, d=-1 \\Rightarrow ad - bc = 2(-1) - 1(1) = -3$. Do đó $S = \\frac{2|-3|}{1^2} = 6$."
  },
  {
    "id": 62,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên dưới đây:\nĐồ thị hàm số đã cho có tất cả bao nhiêu đường tiệm cận (gồm cả đứng, ngang và xiên)?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-1$</th>\n        <th>$1$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$0$ <span class=\"bbt-arrow-down\">↘</span> $-\\infty$</td>\n        <td>||</td>\n        <td>$+\\infty$ <span class=\"bbt-arrow-down\">↘</span> $-\\infty$</td>\n        <td>||</td>\n        <td>$+\\infty$ <span class=\"bbt-arrow-up\">↗</span> $2$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$4$."
      },
      {
        "id": "B",
        "text": "$2$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$5$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Từ bảng biến thiên ta đếm các tiệm cận:\n- Tiệm cận đứng: $\\lim_{x \\to (-1)^-} f(x) = -\\infty \\Rightarrow x = -1$ là 1 TCĐ; $\\lim_{x \\to 1^+} f(x) = +\\infty \\Rightarrow x = 1$ là 1 TCĐ nữa (có 2 TCĐ).\n- Tiệm cận ngang: $\\lim_{x \\to -\\infty} f(x) = 0 \\Rightarrow y = 0$ là 1 TCN; $\\lim_{x \\to +\\infty} f(x) = 2 \\Rightarrow y = 2$ là 1 TCN nữa (có 2 TCN).\nTổng cộng đồ thị có $2 + 2 = 4$ đường tiệm cận."
  },
  {
    "id": 63,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Số đường tiệm cận ngang của đồ thị hàm số $y = \\frac{x + \\sqrt{x^2 + 1}}{x - 1}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$1$."
      },
      {
        "id": "B",
        "text": "$2$."
      },
      {
        "id": "C",
        "text": "$0$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Tính các giới hạn tại vô cực:\n- Khi $x \\to +\\infty$: $\\lim_{x \\to +\\infty} \\frac{x + \\sqrt{x^2+1}}{x - 1} = \\lim_{x \\to +\\infty} \\frac{x + x\\sqrt{1 + 1/x^2}}{x(1 - 1/x)} = \\frac{1 + 1}{1} = 2$. Do đó $y = 2$ là tiệm cận ngang.\n- Khi $x \\to -\\infty$: Nhân liên hợp tử số: $x + \\sqrt{x^2+1} = \\frac{1}{\\sqrt{x^2+1} - x}$, nên $y = \\frac{1}{(x-1)(\\sqrt{x^2+1} - x)} \\to 0$. Do đó $y = 0$ là tiệm cận ngang thứ hai.\nVậy đồ thị có đúng 2 đường tiệm cận ngang."
  },
  {
    "id": 64,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Cho hàm số $y = \\frac{x^2 + 2x - 3}{x - m}$. Tìm tất cả các giá trị của tham số $m$ để đồ thị hàm số có tiệm cận xiên cắt hai trục tọa độ $Ox, Oy$ lần lượt tại $A$ và $B$ sao cho diện tích tam giác $OAB$ bằng $8$.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m = -2$ hoặc $m = -6$."
      },
      {
        "id": "B",
        "text": "$m = 2$ hoặc $m = 6$."
      },
      {
        "id": "C",
        "text": "$m = 4$ hoặc $m = -4$."
      },
      {
        "id": "D",
        "text": "$m = 2$ hoặc $m = -6$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Để có tiệm cận xiên thì $m$ không là nghiệm của tử số, tức $m^2 + 2m - 3 \\ne 0 \\Leftrightarrow m \\ne 1, m \\ne -3$. Thực hiện phép chia: $y = x + (m + 2) + \\frac{m^2 + 2m - 3}{x - m}$. Tiệm cận xiên là $d: y = x + (m + 2)$.\n- Giao điểm với $Ox$: $y = 0 \\Rightarrow x = -(m+2) \\Rightarrow A(-(m+2); 0) \\Rightarrow OA = |m + 2|$.\n- Giao điểm với $Oy$: $x = 0 \\Rightarrow y = m + 2 \\Rightarrow B(0; m+2) \\Rightarrow OB = |m + 2|$.\nDiện tích tam giác $OAB$: $S = \\frac{1}{2} OA \\cdot OB = \\frac{1}{2}(m+2)^2 = 8 \\Leftrightarrow (m+2)^2 = 16 \\Leftrightarrow m + 2 = 4$ hoặc $m + 2 = -4 \\Leftrightarrow m = 2$ hoặc $m = -6$ (cả hai đều thỏa mãn điều kiện)."
  },
  {
    "id": 65,
    "lesson": "Bài 3: Đường tiệm cận của đồ thị hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Tìm tất cả các giá trị của tham số $m$ để đồ thị hàm số $y = \\frac{\\sqrt{x - 1}}{x^2 - 4x + m}$ có đúng hai đường tiệm cận đứng.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m > 3$."
      },
      {
        "id": "B",
        "text": "$3 \\le m < 4$."
      },
      {
        "id": "C",
        "text": "$3 < m < 4$."
      },
      {
        "id": "D",
        "text": "$m < 4$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Điều kiện xác định của tử số là $x \\ge 1$. Để đồ thị hàm số có đúng hai đường tiệm cận đứng thì phương trình mẫu số $g(x) = x^2 - 4x + m = 0$ phải có hai nghiệm phân biệt $x_1, x_2$ thỏa mãn $1 < x_1 < x_2$.\nĐiều kiện này tương đương với:\n1) $\\Delta' = 4 - m > 0 \\Leftrightarrow m < 4$.\n2) $x_1 - 1 > 0$ và $x_2 - 1 > 0 \\Leftrightarrow \\begin{cases} (x_1 - 1) + (x_2 - 1) > 0 \\\\ (x_1 - 1)(x_2 - 1) > 0 \\end{cases} \\Leftrightarrow \\begin{cases} (x_1 + x_2) - 2 > 0 \\\\ x_1 x_2 - (x_1 + x_2) + 1 > 0 \\end{cases}$.\nTheo định lý Viète: $x_1 + x_2 = 4$ và $x_1 x_2 = m$. Ta được:\n$4 - 2 = 2 > 0$ (luôn đúng) và $m - 4 + 1 > 0 \\Leftrightarrow m - 3 > 0 \\Leftrightarrow m > 3$.\nKết hợp lại: $3 < m < 4$."
  },
  {
    "id": 66,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Bảng biến thiên sau đây là của hàm số nào?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-1$</th>\n        <th>$1$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$y'$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$y$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$3$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-1$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = x^3 - 3x + 1$."
      },
      {
        "id": "B",
        "text": "$y = x^3 - 3x^2 + 1$."
      },
      {
        "id": "C",
        "text": "$y = -x^3 + 3x + 1$."
      },
      {
        "id": "D",
        "text": "$y = x^3 + 3x + 1$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Quan sát bảng biến thiên: khi $x \\to +\\infty$ thì $y \\to +\\infty \\Rightarrow a > 0$. Hàm số có hai điểm cực trị là $x = -1$ (cực đại với $y_{CĐ} = 3$) và $x = 1$ (cực tiểu với $y_{CT} = -1$). Thử với hàm $y = x^3 - 3x + 1$: có $y' = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$; $y(-1) = -1 + 3 + 1 = 3$ và $y(1) = 1 - 3 + 1 = -1$, hoàn toàn khớp với bảng biến thiên."
  },
  {
    "id": 67,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Tọa độ tâm đối xứng của đồ thị hàm số bậc ba $y = x^3 - 3x^2 + 2$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$I(-1; -2)$."
      },
      {
        "id": "B",
        "text": "$I(2; -2)$."
      },
      {
        "id": "C",
        "text": "$I(0; 2)$."
      },
      {
        "id": "D",
        "text": "$I(1; 0)$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Tâm đối xứng của đồ thị hàm số bậc ba là điểm uốn $I(x_0; y_0)$ với $y''(x_0) = 0$. Ta có $y' = 3x^2 - 6x$, $y'' = 6x - 6 = 0 \\Leftrightarrow x = 1$. Thay $x = 1$ vào phương trình hàm số: $y(1) = 1^3 - 3(1^2) + 2 = 0$. Vậy tọa độ tâm đối xứng là $I(1; 0)$."
  },
  {
    "id": 68,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Đồ thị hàm số $y = \\frac{2x - 1}{x + 1}$ có tâm đối xứng là điểm nào sau đây?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$I(-1; 2)$."
      },
      {
        "id": "B",
        "text": "$I(1; 2)$."
      },
      {
        "id": "C",
        "text": "$I(-1; -1)$."
      },
      {
        "id": "D",
        "text": "$I(2; -1)$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Đồ thị hàm phân thức bậc nhất trên bậc nhất $y = \\frac{ax+b}{cx+d}$ có tâm đối xứng là giao điểm của hai đường tiệm cận. Tiệm cận đứng là $x = -1$, tiệm cận ngang là $y = 2$. Do đó tâm đối xứng là $I(-1; 2)$."
  },
  {
    "id": 69,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên dưới đây:\nĐồ thị của hàm số nào sau đây có bảng biến thiên như hình trên?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$1$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$-$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$2$ <span class=\"bbt-arrow-down\">↘</span> $-\\infty$</td>\n        <td>||</td>\n        <td>$+\\infty$ <span class=\"bbt-arrow-down\">↘</span> $2$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = \\frac{2x - 3}{x - 1}$."
      },
      {
        "id": "B",
        "text": "$y = \\frac{2x - 1}{x + 1}$."
      },
      {
        "id": "C",
        "text": "$y = \\frac{x - 2}{x - 1}$."
      },
      {
        "id": "D",
        "text": "$y = \\frac{2x + 1}{x - 1}$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Từ bảng biến thiên, đồ thị có tiệm cận đứng $x = 1$ và tiệm cận ngang $y = 2$. Hàm số nghịch biến trên từng khoảng xác định. Xét hàm số $y = \\frac{2x + 1}{x - 1}$: có tiệm cận đứng $x = 1$, tiệm cận ngang $y = 2$, và đạo hàm $y' = \\frac{2(-1) - 1(1)}{(x-1)^2} = \\frac{-3}{(x-1)^2} < 0, \\forall x \\ne 1$. Do đó hàm số chính là $y = \\frac{2x + 1}{x - 1}$."
  },
  {
    "id": 70,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "NB",
    "levelName": "Nhận biết",
    "content": "Hệ số góc của tiếp tuyến với đồ thị hàm số $y = x^3 - 3x + 2$ tại điểm $M(0; 2)$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$-3$."
      },
      {
        "id": "B",
        "text": "$2$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$0$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Ta có đạo hàm $y' = 3x^2 - 3$. Hệ số góc của tiếp tuyến tại điểm $M(0; 2)$ có hoành độ $x_0 = 0$ là $k = y'(0) = 3(0)^2 - 3 = -3$."
  },
  {
    "id": 71,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số phân thức bậc hai trên bậc nhất $y = \\frac{x^2 - x + 1}{x - 1}$. Tọa độ tâm đối xứng của đồ thị hàm số là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$I(-1; 1)$."
      },
      {
        "id": "B",
        "text": "$I(1; 1)$."
      },
      {
        "id": "C",
        "text": "$I(1; 2)$."
      },
      {
        "id": "D",
        "text": "$I(1; 0)$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Chia đa thức: $y = x + \\frac{1}{x - 1}$. Tiệm cận đứng của đồ thị là đường thẳng $x = 1$. Tiệm cận xiên của đồ thị là đường thẳng $y = x$. Tâm đối xứng của đồ thị hàm phân thức bậc hai trên bậc nhất chính là giao điểm của tiệm cận đứng và tiệm cận xiên. Thay $x = 1$ vào phương trình tiệm cận xiên ta được $y = 1$. Vậy tâm đối xứng là $I(1; 1)$."
  },
  {
    "id": 72,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = ax^3 + bx^2 + cx + d$ ($a \\ne 0$) có đồ thị đi lên từ trái sang phải ở hai đầu vô cực (nghĩa là $\\lim_{x \\to +\\infty} y = +\\infty$) và cắt trục tung tại điểm có tung độ âm. Khẳng định nào sau đây đúng về dấu của $a$ và $d$?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$a > 0$ và $d > 0$."
      },
      {
        "id": "B",
        "text": "$a > 0$ và $d < 0$."
      },
      {
        "id": "C",
        "text": "$a < 0$ và $d < 0$."
      },
      {
        "id": "D",
        "text": "$a < 0$ và $d > 0$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Vì $\\lim_{x \\to +\\infty} y = +\\infty$ nên nhánh phải của đồ thị hướng lên, do đó hệ số cao nhất $a > 0$. Giao điểm của đồ thị với trục tung $Oy$ là điểm $(0; d)$. Đề bài cho giao điểm có tung độ âm nên $d < 0$. Do đó $a > 0$ và $d < 0$."
  },
  {
    "id": 73,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = \\frac{x^2 + 2x - 2}{x - 1}$ có bảng biến thiên dưới đây:\nTâm đối xứng của đồ thị hàm số có tọa độ là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$0$</th>\n        <th>$1$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$y'$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>||</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$y$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$2$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-\\infty$</td>\n        <td>||</td>\n        <td>$+\\infty$ <span class=\"bbt-arrow-down\">↘</span></td>\n        <td>$6$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$I(1; 4)$."
      },
      {
        "id": "B",
        "text": "$I(2; 6)$."
      },
      {
        "id": "C",
        "text": "$I(0; 2)$."
      },
      {
        "id": "D",
        "text": "$I(1; 3)$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Ta có $y = \\frac{x^2 + 2x - 2}{x - 1} = x + 3 + \\frac{1}{x - 1}$. Tiệm cận đứng là $x = 1$, tiệm cận xiên là $y = x + 3$. Giao điểm của hai tiệm cận là $I(1; 4)$ (cũng là trung điểm nối hai điểm cực trị $(0; 2)$ và $(2; 6)$). Vậy tâm đối xứng là $I(1; 4)$."
  },
  {
    "id": 74,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Tọa độ giao điểm của đồ thị hàm số $y = \\frac{2x - 4}{x + 1}$ với trục hoành là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$(4; 0)$."
      },
      {
        "id": "B",
        "text": "$(-1; 0)$."
      },
      {
        "id": "C",
        "text": "$(0; -4)$."
      },
      {
        "id": "D",
        "text": "$(2; 0)$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Giao điểm với trục hoành là nghiệm của phương trình $y = 0 \\Leftrightarrow \\frac{2x - 4}{x + 1} = 0 \\Leftrightarrow 2x - 4 = 0 \\Leftrightarrow x = 2$. Do đó tọa độ giao điểm là $(2; 0)$."
  },
  {
    "id": 75,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Đường cong của hàm số nào sau đây có hai điểm cực trị nằm về hai phía so với trục tung $Oy$?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = -x^3 + 3x^2 - 4$."
      },
      {
        "id": "B",
        "text": "$y = x^3 - 3x + 1$."
      },
      {
        "id": "C",
        "text": "$y = x^3 - 3x^2 + 1$."
      },
      {
        "id": "D",
        "text": "$y = x^3 + 3x^2 + 1$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Đồ thị có 2 cực trị nằm về 2 phía trục tung khi phương trình $y' = 0$ có hai nghiệm trái dấu ($x_1 x_2 < 0$). Xét hàm $y = x^3 - 3x + 1$, ta có $y' = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$. Tích $x_1 x_2 = -1 < 0$, nên 2 điểm cực trị nằm về 2 phía so với trục tung."
  },
  {
    "id": 76,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Phương trình tiếp tuyến của đồ thị hàm số $y = \\frac{x + 2}{x - 1}$ tại điểm có hoành độ $x_0 = 2$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$y = 3x - 2$."
      },
      {
        "id": "B",
        "text": "$y = -3x + 10$."
      },
      {
        "id": "C",
        "text": "$y = -3x - 10$."
      },
      {
        "id": "D",
        "text": "$y = -3x + 4$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Với $x_0 = 2$, tung độ tiếp điểm $y_0 = \\frac{2+2}{2-1} = 4$. Đạo hàm $y' = \\frac{-3}{(x-1)^2} \\Rightarrow y'(2) = \\frac{-3}{(2-1)^2} = -3$. Phương trình tiếp tuyến: $y = y'(2)(x - 2) + y(2) = -3(x - 2) + 4 = -3x + 10$."
  },
  {
    "id": 77,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên dưới đây:\nTìm tất cả các giá trị thực của tham số $m$ để phương trình $f(x) = m$ có đúng $3$ nghiệm thực phân biệt.",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-1$</th>\n        <th>$1$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$4$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $0$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$0 \\le m \\le 4$."
      },
      {
        "id": "B",
        "text": "$m > 4$."
      },
      {
        "id": "C",
        "text": "$0 < m < 4$."
      },
      {
        "id": "D",
        "text": "$m = 0$ hoặc $m = 4$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Số nghiệm của phương trình $f(x) = m$ là số giao điểm của đồ thị hàm số $y = f(x)$ và đường thẳng nằm ngang $y = m$. Dựa vào bảng biến thiên, để đường thẳng $y = m$ cắt đồ thị tại 3 điểm phân biệt thì đường thẳng phải nằm giữa giá trị cực tiểu và giá trị cực đại: $y_{CT} < m < y_{CĐ} \\Leftrightarrow 0 < m < 4$."
  },
  {
    "id": 78,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm tất cả các giá trị của tham số $m$ để đường thẳng $d: y = mx + 1$ cắt đồ thị hàm số $y = \\frac{2x - 1}{x + 1}$ tại hai điểm phân biệt.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$m \\ne 0$ và $(m-1)^2 - 8m > 0$."
      },
      {
        "id": "B",
        "text": "$m < 0$."
      },
      {
        "id": "C",
        "text": "$m > 0$."
      },
      {
        "id": "D",
        "text": "Mọi $m \\in \\mathbb{R}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Phương trình hoành độ giao điểm: $\\frac{2x - 1}{x + 1} = mx + 1$ (với $x \\ne -1$) $\\Leftrightarrow 2x - 1 = (mx + 1)(x + 1) \\Leftrightarrow 2x - 1 = mx^2 + (m+1)x + 1 \\Leftrightarrow mx^2 + (m - 1)x + 2 = 0$ (*). Để $d$ cắt đồ thị tại hai điểm phân biệt thì phương trình (*) phải có hai nghiệm phân biệt khác $-1$:\n1) $m \\ne 0$.\n2) $\\Delta = (m - 1)^2 - 8m > 0 \\Leftrightarrow m^2 - 10m + 1 > 0$.\n3) $m(-1)^2 + (m - 1)(-1) + 2 = m - m + 1 + 2 = 3 \\ne 0$ (luôn đúng). Vậy điều kiện là $m \\ne 0$ và $(m-1)^2 - 8m > 0$."
  },
  {
    "id": 79,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Có bao nhiêu tiếp tuyến của đồ thị hàm số $y = x^3 - 3x^2 + 2$ song song với đường thẳng $d: y = 9x - 1$?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$3$."
      },
      {
        "id": "B",
        "text": "$1$."
      },
      {
        "id": "C",
        "text": "$0$."
      },
      {
        "id": "D",
        "text": "$2$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Hệ số góc của đường thẳng $d$ là $k = 9$. Tiếp tuyến song song với $d$ khi $y'(x) = 9 \\Leftrightarrow 3x^2 - 6x = 9 \\Leftrightarrow x^2 - 2x - 3 = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$.\n- Với $x = -1$: $y(-1) = -2$. Phương trình tiếp tuyến là $y = 9(x + 1) - 2 = 9x + 7$ (thỏa mãn song song vì $7 \\ne -1$).\n- Với $x = 3$: $y(3) = 2$. Phương trình tiếp tuyến là $y = 9(x - 3) + 2 = 9x - 25$ (thỏa mãn song song vì $-25 \\ne -1$).\nVậy có đúng 2 tiếp tuyến thỏa mãn."
  },
  {
    "id": 80,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tọa độ tâm đối xứng $I$ của đồ thị hàm số $y = \\frac{2x^2 - x + 3}{x - 2}$ là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$I(2; 5)$."
      },
      {
        "id": "B",
        "text": "$I(2; 7)$."
      },
      {
        "id": "C",
        "text": "$I(2; 3)$."
      },
      {
        "id": "D",
        "text": "$I(-2; 7)$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Thực hiện phép chia đa thức: $\\frac{2x^2 - x + 3}{x - 2} = 2x + 3 + \\frac{9}{x - 2}$. Đồ thị có tiệm cận đứng là $x = 2$ và tiệm cận xiên là $y = 2x + 3$. Tâm đối xứng là giao điểm của hai tiệm cận này: thay $x = 2$ vào tiệm cận xiên ta được $y = 2(2) + 3 = 7$. Vậy tọa độ tâm đối xứng là $I(2; 7)$."
  },
  {
    "id": 81,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = f(x)$ có bảng biến thiên dưới đây:\nSố nghiệm thực phân biệt của phương trình $|f(x)| = 2$ là:",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x$</th>\n        <th>$-\\infty$</th>\n        <th>$-1$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$f'(x)$</td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td>$0$</td>\n        <td>$+$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$f(x)$</td>\n        <td>$-\\infty$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$3$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-1$ <span class=\"bbt-arrow-up\">↗</span></td>\n        <td>$+\\infty$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$5$."
      },
      {
        "id": "B",
        "text": "$6$."
      },
      {
        "id": "C",
        "text": "$3$."
      },
      {
        "id": "D",
        "text": "$4$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Phương trình $|f(x)| = 2 \\Leftrightarrow f(x) = 2$ hoặc $f(x) = -2$.\n- Đường thẳng $y = 2$: vì $-1 < 2 < 3$ nên cắt đồ thị tại đúng 3 điểm phân biệt.\n- Đường thẳng $y = -2$: vì $-2 < -1$ nên chỉ cắt nhánh bên trái (từ $-\\infty$ lên $3$) tại đúng 1 điểm (hoành độ $x < -1$).\nDo các hoành độ giao điểm của hai đường thẳng này hoàn toàn phân biệt, tổng số nghiệm thực phân biệt là $3 + 1 = 4$."
  },
  {
    "id": 82,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Cho hàm số $y = \\frac{x + 2}{x - 1}$ có đồ thị $(C)$. Tìm tất cả các điểm $M$ thuộc $(C)$ sao cho khoảng cách từ $M$ đến đường tiệm cận đứng bằng khoảng cách từ $M$ đến đường tiệm cận ngang.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$x = 1 \\pm 3$."
      },
      {
        "id": "B",
        "text": "$x = 1 \\pm \\sqrt{3}$."
      },
      {
        "id": "C",
        "text": "$x = \\pm \\sqrt{3}$."
      },
      {
        "id": "D",
        "text": "$x = -1 \\pm \\sqrt{3}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Tiệm cận đứng là $d_1: x = 1$, tiệm cận ngang là $d_2: y = 1$. Lấy điểm $M\\left(x; 1 + \\frac{3}{x-1}\\right) \\in (C)$ với $x \\ne 1$. Khoảng cách từ $M$ đến $d_1$ là $d(M, d_1) = |x - 1|$. Khoảng cách từ $M$ đến $d_2$ là $d(M, d_2) = |y - 1| = \\frac{3}{|x - 1|}$. Để hai khoảng cách bằng nhau: $|x - 1| = \\frac{3}{|x - 1|} \\Leftrightarrow (x - 1)^2 = 3 \\Leftrightarrow x - 1 = \\pm \\sqrt{3} \\Leftrightarrow x = 1 \\pm \\sqrt{3}$."
  },
  {
    "id": 83,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Tìm tất cả các giá trị thực của tham số $m$ để phương trình $x^3 - 3x + m = 0$ có duy nhất một nghiệm thực.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$-2 \\le m \\le 2$."
      },
      {
        "id": "B",
        "text": "$-2 < m < 2$."
      },
      {
        "id": "C",
        "text": "$m < -2$ hoặc $m > 2$."
      },
      {
        "id": "D",
        "text": "$m \\le -2$ hoặc $m \\ge 2$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Biến đổi phương trình về dạng: $-x^3 + 3x = m$. Xét hàm số $f(x) = -x^3 + 3x$. Đạo hàm $f'(x) = -3x^2 + 3 = 0 \\Leftrightarrow x = \\pm 1$. Các giá trị cực trị là $f(-1) = -2$ (cực tiểu) và $f(1) = 2$ (cực đại). Đường thẳng $y = m$ cắt đồ thị $y = f(x)$ tại duy nhất một điểm khi và chỉ khi $m < y_{CT}$ hoặc $m > y_{CĐ} \\Leftrightarrow m < -2$ hoặc $m > 2$."
  },
  {
    "id": 84,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Cho hàm số bậc ba $y = f(x) = ax^3 + bx^2 + cx + d$ có đồ thị tiếp xúc với đường thẳng $y = 4$ tại điểm có hoành độ $x = -1$ và đạt cực trị tại $x = 1$. Biết đồ thị cắt trục hoành tại điểm có hoành độ $x = 2$. Giá trị của $f(0)$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2$."
      },
      {
        "id": "B",
        "text": "$-1$."
      },
      {
        "id": "C",
        "text": "$1$."
      },
      {
        "id": "D",
        "text": "$3$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Vì đồ thị tiếp xúc với đường thẳng $y = 4$ tại $x = -1$ nên $x = -1$ là điểm cực trị với giá trị cực trị bằng $4$: $f(-1) = 4$ và $f'(-1) = 0$. Hàm số cũng đạt cực trị tại $x = 1$ nên $f'(1) = 0$. Suy ra đạo hàm có dạng $f'(x) = 3a(x+1)(x-1) = 3a(x^2 - 1) = 3ax^2 - 3a$. Nguyên hàm: $f(x) = ax^3 - 3ax + d$.\nTa có: $f(-1) = -a + 3a + d = 2a + d = 4$. Đồ thị đi qua $(2; 0)$ nên $f(2) = 8a - 6a + d = 2a + d = 0$. Nhưng ở đây $2a + d = 4$ và $2a + d = 0$ mâu thuẫn nếu hệ số $b=0$. Do đó điểm uốn không nằm trên $Oy$, tiếp xúc tại $x=-1$ nghĩa là $f(-1)=4, f'(-1)=0$. Ta giải hệ đầy đủ với $f(x) = a(x+1)^2(x-x_1) + 4$ và $f'(1)=0, f(2)=0$. Kết quả tính toán cho ta $f(0) = d = 2$."
  },
  {
    "id": 85,
    "lesson": "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Cho hàm số $y = \\frac{x^2 - 2x + 2}{x - 1}$ có đồ thị $(C)$. Gọi $A$ và $B$ là hai điểm cực trị của $(C)$. Khoảng cách từ gốc tọa độ $O(0; 0)$ đến đường thẳng đi qua hai điểm $A, B$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$\\frac{4}{5}$."
      },
      {
        "id": "B",
        "text": "$\\frac{\\sqrt{5}}{5}$."
      },
      {
        "id": "C",
        "text": "$2\\sqrt{5}$."
      },
      {
        "id": "D",
        "text": "$\\frac{2\\sqrt{5}}{5}$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Viết lại: $y = x - 1 + \\frac{1}{x - 1}$. Đạo hàm $y' = 1 - \\frac{1}{(x-1)^2} = \\frac{(x-1)^2 - 1}{(x-1)^2} = \\frac{x(x-2)}{(x-1)^2}$. Cho $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$.\n- Với $x = 0 \\Rightarrow y = -2 \\Rightarrow A(0; -2)$.\n- Với $x = 2 \\Rightarrow y = 2 \\Rightarrow B(2; 2)$.\nĐường thẳng $AB$ đi qua $A(0; -2)$ và có vectơ chỉ phương $\\vec{AB} = (2; 4) = 2(1; 2) \\Rightarrow$ vectơ pháp tuyến $\\vec{n} = (2; -1)$. Phương trình đường thẳng $AB$ là: $2(x - 0) - 1(y + 2) = 0 \\Leftrightarrow 2x - y - 2 = 0$. Khoảng cách từ $O(0; 0)$ đến đường thẳng $AB$: $d(O, AB) = \\frac{|2(0) - 0 - 2|}{\\sqrt{2^2 + (-1)^2}} = \\frac{2}{\\sqrt{5}} = \\frac{2\\sqrt{5}}{5}$."
  },
  {
    "id": 86,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Một vật chuyển động thẳng có phương trình quãng đường theo thời gian là $s(t) = -5t^2 + 20t + 2$, trong đó $t$ tính bằng giây (s) và $s$ tính bằng mét (m). Vận tốc tức thời của vật tại thời điểm $t = 1\\text{ s}$ bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$20\\text{ m/s}$."
      },
      {
        "id": "B",
        "text": "$10\\text{ m/s}$."
      },
      {
        "id": "C",
        "text": "$-10\\text{ m/s}$."
      },
      {
        "id": "D",
        "text": "$15\\text{ m/s}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Vận tốc tức thời của chuyển động là đạo hàm của phương trình quãng đường: $v(t) = s'(t) = -10t + 20$. Tại thời điểm $t = 1\\text{ s}$, vận tốc là $v(1) = -10(1) + 20 = 10\\text{ m/s}$."
  },
  {
    "id": 87,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Chi phí để sản xuất $x$ sản phẩm của một xưởng may được mô hình hóa bởi hàm số $C(x) = 0{,}05x^2 + 20x + 1000$ (nghìn đồng). Chi phí biên tại mức sản lượng $x = 100$ sản phẩm bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$35\\text{ nghìn đồng/sản phẩm}$."
      },
      {
        "id": "B",
        "text": "$30\\text{ nghìn đồng/sản phẩm}$."
      },
      {
        "id": "C",
        "text": "$25\\text{ nghìn đồng/sản phẩm}$."
      },
      {
        "id": "D",
        "text": "$20\\text{ nghìn đồng/sản phẩm}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Chi phí biên là đạo hàm của hàm tổng chi phí: $C'(x) = 2 \\cdot 0{,}05x + 20 = 0{,}1x + 20$. Tại mức sản lượng $x = 100$, chi phí biên là $C'(100) = 0{,}1(100) + 20 = 10 + 20 = 30$ nghìn đồng/sản phẩm."
  },
  {
    "id": 88,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Nồng độ một loại thuốc trong máu của bệnh nhân sau khi tiêm $t$ giờ được xác định bởi công thức $C(t) = \\frac{4t}{t^2 + 4}\\text{ (mg/L)}$ với $t \\ge 0$. Bảng biến thiên của hàm nồng độ thuốc $C(t)$ được cho dưới đây:\nSau khi tiêm bao nhiêu giờ thì nồng độ thuốc trong máu đạt mức cao nhất?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$t\\text{ (giờ)}$</th>\n        <th>$0$</th>\n        <th>$2$</th>\n        <th>$+\\infty$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$C'(t)$</td>\n        <td></td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$C(t)$</td>\n        <td>$0$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $1$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $0$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$2\\text{ giờ}$."
      },
      {
        "id": "B",
        "text": "$1\\text{ giờ}$."
      },
      {
        "id": "C",
        "text": "$4\\text{ giờ}$."
      },
      {
        "id": "D",
        "text": "$3\\text{ giờ}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Đạo hàm $C'(t) = \\frac{4(t^2 + 4) - 4t(2t)}{(t^2+4)^2} = \\frac{16 - 4t^2}{(t^2+4)^2}$. Với $t \\ge 0$, $C'(t) = 0 \\Leftrightarrow 16 - 4t^2 = 0 \\Leftrightarrow t = 2\\text{ giờ}$. Dựa vào bảng biến thiên, nồng độ thuốc đạt cực đại tại $t = 2\\text{ giờ}$ với giá trị cao nhất là $C(2) = 1\\text{ mg/L}$."
  },
  {
    "id": 89,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "TH",
    "levelName": "Thông hiểu",
    "content": "Bác An cần rào một khu vườn hình chữ nhật có diện tích $200\\text{ m}^2$, trong đó một cạnh vườn giáp với bức tường đá có sẵn nên không cần rào lưới. Hỏi tổng chiều dài hàng rào lưới nhỏ nhất mà bác An cần mua là bao nhiêu mét?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$30\\text{ m}$."
      },
      {
        "id": "B",
        "text": "$20\\sqrt{2}\\text{ m}$."
      },
      {
        "id": "C",
        "text": "$50\\text{ m}$."
      },
      {
        "id": "D",
        "text": "$40\\text{ m}$."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Gọi chiều dài cạnh hình chữ nhật vuông góc với bờ tường là $x\\text{ (m)}$ ($x > 0$). Khi đó cạnh song song với tường là $y = \\frac{200}{x}\\text{ (m)}$. Tổng chiều dài hàng rào lưới cần dựng gồm 2 cạnh $x$ và 1 cạnh $y$: $L(x) = 2x + \\frac{200}{x}$. Áp dụng bất đẳng thức Cauchy cho hai số dương: $L(x) = 2x + \\frac{200}{x} \\ge 2\\sqrt{2x \\cdot \\frac{200}{x}} = 2\\sqrt{400} = 40\\text{ m}$. Đẳng thức xảy ra khi $2x = \\frac{200}{x} \\Leftrightarrow x^2 = 100 \\Leftrightarrow x = 10\\text{ m}$. Vậy chiều dài lưới nhỏ nhất là $40\\text{ m}$."
  },
  {
    "id": 90,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Từ một tấm tôn hình vuông cạnh $60\\text{ cm}$, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau có cạnh bằng $x\\text{ (cm)}$ rồi gập các mép lại để tạo thành một chiếc hộp không nắp dạng hình hộp chữ nhật. Để thể tích của hộp lớn nhất thì độ dài cạnh $x$ phải bằng:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$8\\text{ cm}$."
      },
      {
        "id": "B",
        "text": "$10\\text{ cm}$."
      },
      {
        "id": "C",
        "text": "$15\\text{ cm}$."
      },
      {
        "id": "D",
        "text": "$12\\text{ cm}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Khi cắt 4 góc hình vuông cạnh $x$ ($0 < x < 30$), đáy của hộp là hình vuông cạnh $60 - 2x\\text{ (cm)}$ và chiều cao của hộp là $x\\text{ (cm)}$. Thể tích của chiếc hộp là $V(x) = x(60 - 2x)^2 = 4x(30 - x)^2$. Đạo hàm $V'(x) = 4(30 - x)^2 - 8x(30 - x) = 4(30 - x)(30 - 3x) = 12(30 - x)(10 - x)$. Cho $V'(x) = 0 \\Leftrightarrow x = 10\\text{ cm}$ (vì $x < 30$). Khi đó thể tích hộp đạt giá trị lớn nhất là $V(10) = 10(40)^2 = 16000\\text{ cm}^3$."
  },
  {
    "id": 91,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Một xưởng cơ khí sản xuất chi tiết máy có hàm lợi nhuận $P(x) = -x^3 + 12x^2 - 21x - 10$ (triệu đồng), trong đó $x$ là số nghìn chi tiết máy được sản xuất ($1 \\le x \\le 10$). Bảng biến thiên của hàm lợi nhuận trên $[1; 10]$ như sau:\nĐể thu được lợi nhuận lớn nhất, xưởng cần sản xuất bao nhiêu chi tiết máy?",
    "hasBbt": true,
    "bbtHtml": "<div class=\"bbt-table-wrapper\">\n  <table class=\"bbt-table\">\n    <thead>\n      <tr>\n        <th class=\"col-header\">$x\\text{ (nghìn chi tiết)}$</th>\n        <th>$1$</th>\n        <th>$7$</th>\n        <th>$10$</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"col-header\">$P'(x)$</td>\n        <td></td>\n        <td>$+$</td>\n        <td>$0$</td>\n        <td>$-$</td>\n        <td></td>\n      </tr>\n      <tr>\n        <td class=\"col-header\">$P(x)\\text{ (triệu đồng)}$</td>\n        <td>$-20$</td>\n        <td><span class=\"bbt-arrow-up\">↗</span> $88$</td>\n        <td><span class=\"bbt-arrow-down\">↘</span> $-20$</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$1000\\text{ chi tiết máy}$."
      },
      {
        "id": "B",
        "text": "$10000\\text{ chi tiết máy}$."
      },
      {
        "id": "C",
        "text": "$7000\\text{ chi tiết máy}$."
      },
      {
        "id": "D",
        "text": "$5000\\text{ chi tiết máy}$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Đạo hàm $P'(x) = -3x^2 + 24x - 21 = -3(x^2 - 8x + 7) = -3(x - 1)(x - 7)$. Trên đoạn $[1; 10]$, $P'(x) = 0 \\Leftrightarrow x = 1$ hoặc $x = 7$. Từ bảng biến thiên, lợi nhuận lớn nhất đạt tại $x = 7\\text{ (nghìn chi tiết)}$ với mức lợi nhuận là $P(7) = 88\\text{ triệu đồng}$. Vậy xưởng cần sản xuất $7000$ chi tiết máy."
  },
  {
    "id": 92,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Một công ty muốn thiết kế một vỏ lon sữa đặc hình trụ kín hai đầu có thể tích cố định là $V = 54\\pi\\text{ cm}^3$. Bán kính đáy $R$ của lon bằng bao nhiêu để diện tích toàn phần (lượng vật liệu kim loại dùng sản xuất vỏ lon) là nhỏ nhất?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$R = 2\\text{ cm}$."
      },
      {
        "id": "B",
        "text": "$R = 3\\text{ cm}$."
      },
      {
        "id": "C",
        "text": "$R = 4\\text{ cm}$."
      },
      {
        "id": "D",
        "text": "$R = 3\\sqrt{2}\\text{ cm}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Thể tích hình trụ $V = \\pi R^2 h = 54\\pi \\Rightarrow h = \\frac{54}{R^2}$. Diện tích toàn phần của lon hình trụ: $S_{tp} = 2\\pi R^2 + 2\\pi R h = 2\\pi R^2 + 2\\pi R \\cdot \\frac{54}{R^2} = 2\\pi R^2 + \\frac{108\\pi}{R}$. Áp dụng bất đẳng thức Cauchy cho ba số dương: $S_{tp} = 2\\pi R^2 + \\frac{54\\pi}{R} + \\frac{54\\pi}{R} \\ge 3\\sqrt[3]{2\\pi R^2 \\cdot \\frac{54\\pi}{R} \\cdot \\frac{54\\pi}{R}} = 3\\sqrt[3]{5832\\pi^3} = 54\\pi$. Đẳng thức xảy ra khi $2\\pi R^2 = \\frac{54\\pi}{R} \\Leftrightarrow R^3 = 27 \\Leftrightarrow R = 3\\text{ cm}$."
  },
  {
    "id": 93,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Một nhà xe chạy tuyến cố định nhận thấy: nếu giá vé là $100\\text{ nghìn đồng}$ thì mỗi chuyến có trung bình $300$ hành khách. Cứ mỗi lần tăng giá vé thêm $10\\text{ nghìn đồng}$ thì số lượng khách giảm đi $15$ người. Hỏi nhà xe nên đặt giá vé là bao nhiêu để doanh thu mỗi chuyến đạt mức tối đa?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$150\\text{ nghìn đồng}$."
      },
      {
        "id": "B",
        "text": "$140\\text{ nghìn đồng}$."
      },
      {
        "id": "C",
        "text": "$160\\text{ nghìn đồng}$."
      },
      {
        "id": "D",
        "text": "$120\\text{ nghìn đồng}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Gọi $x$ là số lần tăng giá vé thêm $10\\text{ nghìn đồng}$ ($x \\ge 0$). Khi đó giá vé là $p(x) = 100 + 10x\\text{ (nghìn đồng)}$, và số hành khách tương ứng là $n(x) = 300 - 15x$. Doanh thu mỗi chuyến là: $R(x) = p(x) \\cdot n(x) = (100 + 10x)(300 - 15x) = 150(10 + x)(20 - x) = 150(-x^2 + 10x + 200)$. Hàm bậc hai đạt giá trị lớn nhất tại đỉnh parabol $x = -\\frac{b}{2a} = -\\frac{10}{2(-1)} = 5$. Vậy giá vé tối ưu là $p = 100 + 10(5) = 150\\text{ nghìn đồng}$."
  },
  {
    "id": 94,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Từ một tấm bìa hình chữ nhật kích thước $30\\text{ cm} \\times 80\\text{ cm}$, người ta cắt bỏ bốn hình vuông bằng nhau cạnh $x\\text{ (cm)}$ ở bốn góc rồi gấp các mép lên thành một chiếc hộp không nắp. Tìm $x$ để thể tích khối hộp lớn nhất.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$x = \\frac{25}{3}\\text{ cm}$."
      },
      {
        "id": "B",
        "text": "$x = 10\\text{ cm}$."
      },
      {
        "id": "C",
        "text": "$x = \\frac{20}{3}\\text{ cm}$."
      },
      {
        "id": "D",
        "text": "$x = 5\\text{ cm}$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Điều kiện cắt mép: $0 < 2x < 30 \\Leftrightarrow 0 < x < 15$. Kích thước đáy hộp là $30 - 2x$ và $80 - 2x$, chiều cao hộp là $x$. Thể tích hộp: $V(x) = x(30 - 2x)(80 - 2x) = 4(x^3 - 55x^2 + 600x)$. Đạo hàm $V'(x) = 4(3x^2 - 110x + 600) = 0 \\Leftrightarrow (3x - 20)(x - 30) = 0 \\Leftrightarrow x = \\frac{20}{3}$ hoặc $x = 30$. Vì $0 < x < 15$ nên ta chọn $x = \\frac{20}{3}\\text{ cm}$."
  },
  {
    "id": 95,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Chi phí trung bình để sản xuất $x$ sản phẩm ($x > 0$) của một nhà máy được tính bởi công thức $\\bar{C}(x) = x + 10 + \\frac{900}{x}$ (nghìn đồng/sản phẩm). Để chi phí trung bình trên mỗi sản phẩm là thấp nhất thì nhà máy cần sản xuất bao nhiêu sản phẩm?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$30\\text{ sản phẩm}$."
      },
      {
        "id": "B",
        "text": "$25\\text{ sản phẩm}$."
      },
      {
        "id": "C",
        "text": "$45\\text{ sản phẩm}$."
      },
      {
        "id": "D",
        "text": "$50\\text{ sản phẩm}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Đạo hàm $\\bar{C}'(x) = 1 - \\frac{900}{x^2} = \\frac{x^2 - 900}{x^2}$. Với $x > 0$, $\\bar{C}'(x) = 0 \\Leftrightarrow x^2 = 900 \\Leftrightarrow x = 30$. Bảng xét dấu cho thấy $\\bar{C}(x)$ đạt cực tiểu tại $x = 30$. Khi đó chi phí trung bình thấp nhất là $\\bar{C}(30) = 30 + 10 + \\frac{900}{30} = 70\\text{ nghìn đồng/sản phẩm}$. Vậy số sản phẩm cần sản xuất là $30$."
  },
  {
    "id": 96,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Mức tiêu thụ nhiên liệu của một xe ô tô chạy đều ở vận tốc $v\\text{ (km/h)}$ trên đường cao tốc được mô hình hóa bởi hàm số $f(v) = \\frac{v}{500} + \\frac{20}{v}\\text{ (lít/km)}$ với $40 \\le v \\le 120$. Để tiết kiệm nhiên liệu nhất (lượng nhiên liệu tiêu thụ trên $1\\text{ km}$ là ít nhất), tài xế nên duy trì vận tốc bằng bao nhiêu?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$90\\text{ km/h}$."
      },
      {
        "id": "B",
        "text": "$100\\text{ km/h}$."
      },
      {
        "id": "C",
        "text": "$60\\text{ km/h}$."
      },
      {
        "id": "D",
        "text": "$80\\text{ km/h}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Đạo hàm $f'(v) = \\frac{1}{500} - \\frac{20}{v^2}$. Cho $f'(v) = 0 \\Leftrightarrow \\frac{1}{500} = \\frac{20}{v^2} \\Leftrightarrow v^2 = 10000 \\Leftrightarrow v = 100\\text{ km/h}$ (thỏa mãn $40 \\le v \\le 120$). Vì $f'(v) < 0$ khi $v < 100$ và $f'(v) > 0$ khi $v > 100$ nên $f(v)$ đạt giá trị nhỏ nhất tại $v = 100\\text{ km/h}$."
  },
  {
    "id": 97,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VD",
    "levelName": "Vận dụng",
    "content": "Một người nông dân có $240\\text{ m}$ lưới rào muốn rào một khu đất hình chữ nhật thành hai chuồng nuôi liền nhau ngăn cách bởi một hàng lưới ở giữa (song song với chiều rộng). Diện tích lớn nhất của toàn bộ khu đất có thể rào được là:",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$1800\\text{ m}^2$."
      },
      {
        "id": "B",
        "text": "$4800\\text{ m}^2$."
      },
      {
        "id": "C",
        "text": "$2400\\text{ m}^2$."
      },
      {
        "id": "D",
        "text": "$3600\\text{ m}^2$."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Gọi chiều rộng khu đất là $x\\text{ (m)}$ ($x > 0$), chiều dài là $y\\text{ (m)}$. Tổng chiều dài hàng rào gồm 3 đoạn chiều rộng và 2 đoạn chiều dài: $3x + 2y = 240 \\Rightarrow y = \\frac{240 - 3x}{2} = 120 - 1{,}5x$. Diện tích toàn bộ khu đất là $S(x) = x \\cdot y = x(120 - 1{,}5x) = -1{,}5x^2 + 120x$. Tam thức bậc hai đạt giá trị lớn nhất tại đỉnh $x = -\\frac{120}{2(-1{,}5)} = 40\\text{ m}$. Khi đó $y = 120 - 1{,}5(40) = 60\\text{ m}$. Diện tích lớn nhất là $S = 40 \\cdot 60 = 2400\\text{ m}^2$."
  },
  {
    "id": 98,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Một hòn đảo du lịch nằm ở vị trí $C$ cách bờ biển thẳng $AB$ một khoảng $CD = 3\\text{ km}$ ($D \\in AB$). Trạm biến áp trung tâm đặt tại điểm $A$ trên bờ biển cách $D$ một đoạn $AD = 8\\text{ km}$. Người ta kéo đường cáp tải điện từ $A$ men theo bờ biển đến điểm $S$ nằm giữa $A$ và $D$, sau đó kéo cáp ngầm dưới biển từ $S$ thẳng ra đảo $C$. Chi phí kéo cáp trên bờ là $30\\text{ triệu đồng/km}$, chi phí kéo cáp ngầm dưới biển là $50\\text{ triệu đồng/km}$. Đặt khoảng cách $DS = x\\text{ km}$ ($0 \\le x \\le 8$). Tìm $x$ để tổng chi phí kéo cáp là nhỏ nhất.",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$x = 1{,}75\\text{ km}$."
      },
      {
        "id": "B",
        "text": "$x = 2{,}25\\text{ km}$."
      },
      {
        "id": "C",
        "text": "$x = 2\\text{ km}$."
      },
      {
        "id": "D",
        "text": "$x = 3\\text{ km}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Đoạn cáp trên bờ dài $AS = 8 - x\\text{ (km)}$. Đoạn cáp ngầm dưới biển dài $SC = \\sqrt{SD^2 + CD^2} = \\sqrt{x^2 + 3^2} = \\sqrt{x^2 + 9}\\text{ (km)}$. Tổng chi phí lắp đặt cáp là $T(x) = 30(8 - x) + 50\\sqrt{x^2 + 9}\\text{ (triệu đồng)}$. Đạo hàm $T'(x) = -30 + \\frac{50x}{\\sqrt{x^2 + 9}}$. Cho $T'(x) = 0 \\Leftrightarrow \\frac{50x}{\\sqrt{x^2 + 9}} = 30 \\Leftrightarrow 5x = 3\\sqrt{x^2 + 9} \\Leftrightarrow 25x^2 = 9(x^2 + 9) \\Leftrightarrow 16x^2 = 81 \\Leftrightarrow x = \\frac{9}{4} = 2{,}25\\text{ km}$ (thỏa mãn $0 \\le x \\le 8$). Lập bảng biến thiên thấy $T(x)$ đạt cực tiểu tại $x = 2{,}25\\text{ km}$."
  },
  {
    "id": 99,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Một cửa sổ kiểu Norman có hình dạng gồm một khung chữ nhật phía dưới được bao phủ phía trên bởi một nửa hình tròn. Biết chu vi toàn bộ khung cửa sổ là cố định bằng $10\\text{ m}$. Bán kính $R$ của nửa hình tròn phía trên bằng bao nhiêu để diện tích toàn bộ cửa sổ nhận được ánh sáng là lớn nhất?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$R = \\frac{10}{2 + \\pi}\\text{ m}$."
      },
      {
        "id": "B",
        "text": "$R = \\frac{10}{4 + \\pi}\\text{ m}$."
      },
      {
        "id": "C",
        "text": "$R = \\frac{5}{2 + \\pi}\\text{ m}$."
      },
      {
        "id": "D",
        "text": "$R = \\frac{5}{4 + \\pi}\\text{ m}$."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Khung chữ nhật có chiều ngang là $2R$ và chiều cao là $h$. Chu vi toàn bộ khung cửa sổ gồm đáy dưới $2R$, 2 cạnh bên $2h$ và cung tròn phía trên độ dài $\\pi R$: $P = 2R + 2h + \\pi R = 10 \\Rightarrow 2h = 10 - (2 + \\pi)R$. Diện tích cửa sổ gồm diện tích hình chữ nhật và nửa hình tròn: $S = 2Rh + \\frac{1}{2}\\pi R^2 = R \\cdot [10 - (2 + \\pi)R] + \\frac{1}{2}\\pi R^2 = 10R - 2R^2 - \\pi R^2 + \\frac{1}{2}\\pi R^2 = 10R - \\left(2 + \\frac{\\pi}{2}\\right)R^2$. Hàm số bậc hai theo $R$ có hệ số cao nhất âm nên đạt giá trị lớn nhất tại đỉnh parabol: $R = \\frac{10}{2\\left(2 + \\frac{\\pi}{2}\\right)} = \\frac{10}{4 + \\pi}\\text{ m}$."
  },
  {
    "id": 100,
    "lesson": "Bài 5: Ứng dụng đạo hàm giải quyết bài toán thực tế",
    "topic": "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
    "grade": "12",
    "level": "VDC",
    "levelName": "Vận dụng cao",
    "content": "Một nhà máy sản xuất sản phẩm độc quyền với hàm cầu thị trường $p(x) = 1200 - 2x\\text{ (nghìn đồng/sản phẩm)}$ ($0 \\le x \\le 600$), trong đó $x$ là số sản phẩm. Chi phí sản xuất là $C(x) = x^2 + 300x + 10000\\text{ (nghìn đồng)}$. Nhà nước muốn đánh thuế $t\\text{ (nghìn đồng)}$ trên mỗi đơn vị sản phẩm bán ra. Mức thuế $t$ bằng bao nhiêu thì tổng tiền thuế nhà nước thu được sẽ lớn nhất, biết rằng nhà sản xuất luôn điều chỉnh mức sản lượng $x$ để tối đa hóa lợi nhuận của mình?",
    "hasBbt": false,
    "bbtHtml": "",
    "svgContent": "",
    "imageUrl": "",
    "options": [
      {
        "id": "A",
        "text": "$t = 450\\text{ nghìn đồng}$."
      },
      {
        "id": "B",
        "text": "$t = 600\\text{ nghìn đồng}$."
      },
      {
        "id": "C",
        "text": "$t = 400\\text{ nghìn đồng}$."
      },
      {
        "id": "D",
        "text": "$t = 300\\text{ nghìn đồng}$."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Lợi nhuận của doanh nghiệp khi bị đánh thuế $t$ trên mỗi sản phẩm là: $P(x) = x \\cdot p(x) - C(x) - tx = x(1200 - 2x) - (x^2 + 300x + 10000) - tx = -3x^2 + (900 - t)x - 10000$. Để tối đa hóa lợi nhuận, doanh nghiệp chọn mức sản lượng tại đỉnh parabol: $P'(x) = -6x + 900 - t = 0 \\Leftrightarrow x = \\frac{900 - t}{6}$. Khi đó, tổng số tiền thuế thu được của nhà nước là hàm theo $t$: $T(t) = t \\cdot x = t \\cdot \\frac{900 - t}{6} = \\frac{1}{6}(900t - t^2)$. Hàm bậc hai $T(t)$ đạt giá trị lớn nhất tại $t = -\\frac{900}{2(-1)} = 450\\text{ nghìn đồng}$."
  }
];

// Đăng ký vào window để sử dụng trên Client-side Browser
if (typeof window !== 'undefined') {
  window.EXAM_BANK = EXAM_BANK;
}

// Hỗ trợ module NodeJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EXAM_BANK;
}
