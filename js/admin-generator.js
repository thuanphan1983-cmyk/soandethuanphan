/**
 * ADMIN TEST GENERATOR & EXAM BANK CONTROLLER
 * Tính năng:
 * - 2 Chế độ tạo đề: Ma trận (Matrix Mode) & Văn bản (Prompt Mode)
 * - Tích hợp Gemini API Engine với hằng số GEMINI_API_KEY
 * - Đóng gói System Prompt chuẩn JSON, LaTeX, HTML Bảng biến thiên, SVG / [CHÈN HÌNH ẢNH]
 * - Editable Preview cho phép sửa câu hỏi, upload ảnh GeoGebra trực tiếp
 * - Lưu vào Ngân hàng đề Firebase Realtime Database
 * - Theo dõi bộ đếm học sinh Online Realtime
 */

// HẰNG SỐ GEMINI API KEY (Để trống theo yêu cầu - Admin có thể nhập trên giao diện hoặc dán vào đây)
const GEMINI_API_KEY = "";

(function () {
  'use strict';

  // State
  let generatedExamData = null;
  let activeTab = 'matrix'; // 'matrix' hoặc 'prompt'

  // DOM Elements
  const tabBtnMatrix = document.getElementById('tab-btn-matrix');
  const tabBtnPrompt = document.getElementById('tab-btn-prompt');
  const matrixSection = document.getElementById('matrix-mode-section');
  const promptSection = document.getElementById('prompt-mode-section');

  const btnGenerateAi = document.getElementById('btn-generate-ai');
  const btnGenerateDemo = document.getElementById('btn-generate-demo');
  const aiLoadingSpinner = document.getElementById('ai-loading-spinner');
  const aiStatusMessage = document.getElementById('ai-status-message');

  const editablePreviewSection = document.getElementById('editable-preview-section');
  const previewQuestionsList = document.getElementById('preview-questions-list');
  const examTitleInput = document.getElementById('preview-exam-title');
  const examDurationInput = document.getElementById('preview-exam-duration');
  const btnSaveToBank = document.getElementById('btn-save-to-bank');
  const btnAddNewQuestion = document.getElementById('btn-add-new-question');

  const onlineCounterEl = document.getElementById('online-students-count');
  const onlineUsersTbody = document.getElementById('online-users-tbody');
  const examBankAdminList = document.getElementById('admin-exam-bank-list');

  // ==========================================
  // 1. KHỞI TẠO & PRESENCE MONITORING
  // ==========================================
  function init() {
    setupTabSwitching();
    setupEventListeners();
    initPresenceMonitoring();
    loadAdminExamBank();
    updateMatrixQuestionCounts();
    updateQuestionCounterAndEmptyState();

    // Tự động load OpenRouter API key đã lưu nếu có
    const savedKey = localStorage.getItem('lms_openrouter_api_key') || localStorage.getItem('lms_gemini_api_key');
    const inputKey = document.getElementById('gemini-api-key-input') || document.getElementById('openrouter-api-key-input');
    if (savedKey && inputKey) {
      inputKey.value = savedKey;
    }
  }

  function initPresenceMonitoring() {
    if (window.LmsFirebase && window.LmsFirebase.listenOnlinePresence) {
      window.LmsFirebase.listenOnlinePresence(data => {
        if (onlineCounterEl) {
          onlineCounterEl.textContent = data.count;
        }

        if (onlineUsersTbody) {
          onlineUsersTbody.innerHTML = '';
          if (data.users.length === 0) {
            onlineUsersTbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Chưa có học sinh nào online.</td></tr>`;
            return;
          }

          data.users.forEach((u, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${i + 1}</td>
              <td><strong>${u.displayName || 'Học sinh'}</strong></td>
              <td>${u.email || '-'}</td>
              <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">Khối ${u.grade || '9'} - Lớp ${u.className || 'A1'}</span></td>
              <td><span class="badge badge-online"><span class="pulse-dot"></span> Đang thi / Online</span></td>
            `;
            onlineUsersTbody.appendChild(tr);
          });
        }
      });
    }
  }

  // ==========================================
  // 2. CHUYỂN ĐỔI CHẾ ĐỘ TẠO ĐỀ (MATRIX / PROMPT)
  // ==========================================
  function setupTabSwitching() {
    if (tabBtnMatrix && tabBtnPrompt) {
      tabBtnMatrix.addEventListener('click', () => switchTab('matrix'));
      tabBtnPrompt.addEventListener('click', () => switchTab('prompt'));
    }
  }

  function switchTab(tab) {
    activeTab = tab;
    if (tab === 'matrix') {
      tabBtnMatrix.classList.add('active');
      tabBtnPrompt.classList.remove('active');
      matrixSection.classList.remove('hidden');
      promptSection.classList.add('hidden');
    } else {
      tabBtnPrompt.classList.add('active');
      tabBtnMatrix.classList.remove('active');
      promptSection.classList.remove('hidden');
      matrixSection.classList.add('hidden');
    }
  }

  // ==========================================
  // 3. ĐÓNG GÓI SYSTEM PROMPT & GEMINI API CALL
  // ==========================================
  function setupEventListeners() {
    if (btnGenerateAi) {
      btnGenerateAi.addEventListener('click', handleGenerateAiExam);
    }
    if (btnGenerateDemo) {
      btnGenerateDemo.addEventListener('click', handleGenerateDemoExam);
    }
    const btnLoadExamBank = document.getElementById('btn-load-exam-bank');
    if (btnLoadExamBank) {
      btnLoadExamBank.addEventListener('click', handleOpenOfflineExamBank);
    }
    if (btnSaveToBank) {
      btnSaveToBank.addEventListener('click', handleSaveExamToBank);
    }
    if (btnAddNewQuestion) {
      btnAddNewQuestion.addEventListener('click', handleAddNewEmptyQuestion);
    }

    // Nút thêm câu hỏi ở chân trang Preview
    const btnAddNewBottom = document.getElementById('btn-add-new-question-bottom');
    if (btnAddNewBottom) {
      btnAddNewBottom.addEventListener('click', handleAddNewEmptyQuestion);
    }

    // 1. TÙY CHỌN 1: Xuất Word Equation (OMML) - Đề bài & Lời giải (Top & Bottom)
    const btnExportOmmlExam = document.getElementById('btn-export-omml-exam');
    const btnExportOmmlExamBottom = document.getElementById('btn-export-omml-exam-bottom');
    if (btnExportOmmlExam) {
      btnExportOmmlExam.addEventListener('click', () => handleExportWord('omml', false, btnExportOmmlExam));
    }
    if (btnExportOmmlExamBottom) {
      btnExportOmmlExamBottom.addEventListener('click', () => handleExportWord('omml', false, btnExportOmmlExamBottom));
    }

    const btnExportOmmlSol = document.getElementById('btn-export-omml-solutions');
    const btnExportOmmlSolBottom = document.getElementById('btn-export-omml-solutions-bottom');
    if (btnExportOmmlSol) {
      btnExportOmmlSol.addEventListener('click', () => handleExportWord('omml', true, btnExportOmmlSol));
    }
    if (btnExportOmmlSolBottom) {
      btnExportOmmlSolBottom.addEventListener('click', () => handleExportWord('omml', true, btnExportOmmlSolBottom));
    }

    // 2. TÙY CHỌN 2: Xuất MathType OLE (Equation.DSMT4 / MTEF) - Đề bài & Lời giải (Top & Bottom)
    const btnExportMathTypeExam = document.getElementById('btn-export-mathtype-exam');
    const btnExportMathTypeExamBottom = document.getElementById('btn-export-mathtype-exam-bottom');
    if (btnExportMathTypeExam) {
      btnExportMathTypeExam.addEventListener('click', () => handleExportWord('mathtype', false, btnExportMathTypeExam));
    }
    if (btnExportMathTypeExamBottom) {
      btnExportMathTypeExamBottom.addEventListener('click', () => handleExportWord('mathtype', false, btnExportMathTypeExamBottom));
    }

    const btnExportMathTypeSol = document.getElementById('btn-export-mathtype-solutions');
    const btnExportMathTypeSolBottom = document.getElementById('btn-export-mathtype-solutions-bottom');
    if (btnExportMathTypeSol) {
      btnExportMathTypeSol.addEventListener('click', () => handleExportWord('mathtype', true, btnExportMathTypeSol));
    }
    if (btnExportMathTypeSolBottom) {
      btnExportMathTypeSolBottom.addEventListener('click', () => handleExportWord('mathtype', true, btnExportMathTypeSolBottom));
    }

    // Tương thích ngược với các nút cũ (nếu có)
    const btnExportWordExam = document.getElementById('btn-export-word-exam');
    if (btnExportWordExam) btnExportWordExam.addEventListener('click', () => handleExportWord('omml', false, btnExportWordExam));
    const btnExportWordExamBottom = document.getElementById('btn-export-word-exam-bottom');
    if (btnExportWordExamBottom) btnExportWordExamBottom.addEventListener('click', () => handleExportWord('omml', false, btnExportWordExamBottom));
    const btnExportWordSol = document.getElementById('btn-export-word-solutions');
    if (btnExportWordSol) btnExportWordSol.addEventListener('click', () => handleExportWord('omml', true, btnExportWordSol));
    const btnExportWordSolBottom = document.getElementById('btn-export-word-solutions-bottom');
    if (btnExportWordSolBottom) btnExportWordSolBottom.addEventListener('click', () => handleExportWord('omml', true, btnExportWordSolBottom));

    // Các nút chèn nhanh STEM Toolkit (BBT & SVG Graph)
    const btnInsertBbt = document.getElementById('btn-insert-sample-bbt');
    if (btnInsertBbt) btnInsertBbt.addEventListener('click', handleInsertSampleBbt);

    const btnInsertParabola = document.getElementById('btn-insert-graph-parabola');
    if (btnInsertParabola) btnInsertParabola.addEventListener('click', () => handleInsertSampleGraph('parabola'));

    const btnInsertCubic = document.getElementById('btn-insert-graph-cubic');
    if (btnInsertCubic) btnInsertCubic.addEventListener('click', () => handleInsertSampleGraph('cubic'));

    const btnInsertRational = document.getElementById('btn-insert-graph-rational');
    if (btnInsertRational) btnInsertRational.addEventListener('click', () => handleInsertSampleGraph('rational'));

    const btnAddQuick = document.getElementById('btn-add-quick-question');
    if (btnAddQuick) btnAddQuick.addEventListener('click', handleAddNewEmptyQuestion);

    // Tự động tính số lượng câu từ tỷ lệ % ma trận
    const totalQInput = document.getElementById('matrix-total-questions');
    if (totalQInput) {
      totalQInput.addEventListener('input', updateMatrixQuestionCounts);
    }
    ['matrix-pct-nb', 'matrix-pct-th', 'matrix-pct-vd', 'matrix-pct-vdc'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateMatrixQuestionCounts);
    });
  }

  function updateMatrixQuestionCounts() {
    const totalInput = document.getElementById('matrix-total-questions');
    const total = totalInput ? (parseInt(totalInput.value, 10) || 20) : 20;

    const elNb = document.getElementById('matrix-pct-nb');
    const elTh = document.getElementById('matrix-pct-th');
    const elVd = document.getElementById('matrix-pct-vd');
    const elVdc = document.getElementById('matrix-pct-vdc');

    const pNb = elNb ? (parseInt(elNb.value, 10) || 40) : 40;
    const pTh = elTh ? (parseInt(elTh.value, 10) || 30) : 30;
    const pVd = elVd ? (parseInt(elVd.value, 10) || 20) : 20;
    const pVdc = elVdc ? (parseInt(elVdc.value, 10) || 10) : 10;

    // Cập nhật số % hiển thị bên cạnh thanh trượt
    const valNb = document.getElementById('matrix-pct-nb-val');
    const valTh = document.getElementById('matrix-pct-th-val');
    const valVd = document.getElementById('matrix-pct-vd-val');
    const valVdc = document.getElementById('matrix-pct-vdc-val');
    if (valNb) valNb.textContent = `${pNb}%`;
    if (valTh) valTh.textContent = `${pTh}%`;
    if (valVd) valVd.textContent = `${pVd}%`;
    if (valVdc) valVdc.textContent = `${pVdc}%`;

    // Cập nhật thanh tiến độ trực quan đa sắc
    const progNb = document.getElementById('matrix-progress-nb');
    const progTh = document.getElementById('matrix-progress-th');
    const progVd = document.getElementById('matrix-progress-vd');
    const progVdc = document.getElementById('matrix-progress-vdc');
    if (progNb) progNb.style.width = `${pNb}%`;
    if (progTh) progTh.style.width = `${pTh}%`;
    if (progVd) progVd.style.width = `${pVd}%`;
    if (progVdc) progVdc.style.width = `${pVdc}%`;

    const countNb = Math.round(total * (pNb / 100));
    const countTh = Math.round(total * (pTh / 100));
    const countVd = Math.round(total * (pVd / 100));
    const countVdc = Math.max(0, total - (countNb + countTh + countVd));

    const info = document.getElementById('matrix-preview-info') || document.getElementById('matrix-calculated-counts');
    if (info) {
      info.textContent = `Dự kiến: ${countNb} NB, ${countTh} TH, ${countVd} VD, ${countVdc} VDC (Tổng: ${total} câu)`;
    }
  }

  /**
   * Tạo System Prompt chuẩn chỉ với các ràng buộc khắt khe
   */
  function buildSystemPrompt() {
    let userSpecification = '';

    if (activeTab === 'matrix') {
      const grade = document.getElementById('matrix-grade').value;
      const topic = document.getElementById('matrix-topic').value;
      const totalQ = document.getElementById('matrix-total-questions').value;
      const duration = document.getElementById('matrix-duration').value;
      const pNb = document.getElementById('matrix-pct-nb').value;
      const pTh = document.getElementById('matrix-pct-th').value;
      const pVd = document.getElementById('matrix-pct-vd').value;
      const pVdc = document.getElementById('matrix-pct-vdc').value;
      const reqBbt = document.getElementById('matrix-req-bbt').checked;
      const reqSvg = document.getElementById('matrix-req-svg').checked;

      userSpecification = `
YÊU CẦU ĐỀ THI:
- Khối lớp: ${grade}
- Chủ đề: ${topic}
- Tổng số lượng câu hỏi trắc nghiệm: ${totalQ} câu
- Thời gian làm bài: ${duration} phút
- Phân bố ma trận độ khó:
  + Nhận biết (NB): ${pNb}%
  + Thông hiểu (TH): ${pTh}%
  + Vận dụng (VD): ${pVd}%
  + Vận dụng cao (VDC): ${pVdc}%
- Yêu cầu kèm theo:
  ${reqBbt ? '* Có ít nhất 1 câu hỏi có BẢNG BIẾN THIÊN chuẩn HTML Table.' : ''}
  ${reqSvg ? '* Có ít nhất 1 câu hỏi có hình vẽ đồ thị / hình học SVG trực tiếp.' : ''}
`;
    } else {
      const rawPrompt = document.getElementById('prompt-custom-text').value.trim();
      userSpecification = `
YÊU CẦU ĐẶC BIỆT / ĐỀ BÀI MẪU CỦA ADMIN:
${rawPrompt || 'Tạo đề kiểm tra Toán THCS bám sát chương trình mới'}
`;
    }

    const fullPrompt = `
BẠN LÀ CHUYÊN GIA BIÊN SOẠN ĐỀ THI TOÁN HỌC STEM CHUẨN QUỐC GIA CỦA BỘ GIÁO DỤC & ĐÀO TẠO.

${userSpecification}

RÀNG BUỘC KỸ THUẬT BẮT BUỘC (TUÂN THỦ 100% ĐỂ XUẤT FILE WORD VÀ HIỂN THỊ CHUẨN):
1. ĐỊNH DẠNG XUẤT RA: BẮT BUỘC chỉ trả về duy nhất 1 chuỗi JSON thuần túy. Tuyệt đối KHÔNG bọc trong markdown code fence (KHÔNG dùng \`\`\`json hay \`\`\`), KHÔNG kèm bất kỳ lời chào hay văn bản giải thích nào ngoài chuỗi JSON.
2. CÔNG THỨC TOÁN HỌC: BẮT BUỘC bọc toàn bộ biểu thức, phân số, căn thức, phương trình, số mũ trong cặp dấu $...$ (nội tuyến) hoặc $$...$$ (khối).
   - Sử dụng lệnh LaTeX chuẩn mực: \\dfrac{a}{b}, \\sqrt{x}, \\int_{a}^{b}, \\lim_{x \\to x_0}, \\vec{AB}, \\Delta, \\in, \\notin, \\le, \\ge, \\ne.
   - KÝ HIỆU VÔ CỰC: BẮT BUỘC dùng mã chuẩn \\infty (hoặc -\\infty, +\\infty). Tuyệt đối KHÔNG viết rời rạc thành "\\in fty" hay "∈ fty".
3. BẢNG BIẾN THIÊN (BBT):
   - Đặt "hasTable": true (hoặc "hasBbt": true).
   - Cung cấp đầy đủ tham số cấu trúc trong "tableData": { "x": ["-\\infty", "x_1", "x_2", "+\\infty"], "yPrime": ["+", "0", "-", "0", "+"], "y": ["-\\infty", "y_1", "y_2", "+\\infty"], "arrows": ["up", "down", "up"] }.
   - Đồng thời sinh mã HTML Table hoàn chỉnh trong "bbtHtml" (<div class="bbt-table-wrapper"><table class="bbt-table">...</table></div>) để render trực tiếp trên web và sẵn sàng xuất file Word.
4. ĐỒ THỊ HÀM SỐ & HÌNH HỌC:
   - Đặt "hasGraph": true.
   - Xác định loại hàm "graphType": "parabola" | "cubic" | "quartic" | "rational" | "linear" | "geometry".
   - Cung cấp hàm số cụ thể trong "graphFunction" (ví dụ: "y = -x^2 + 4x - 3") và tham số trong "graphData": { "a": -1, "b": 4, "c": -3 }.
   - Sinh mã SVG vector hoàn chỉnh, sắc nét trong "svgContent" (<svg viewBox="0 0 360 240" ...>...</svg>).

CẤU TRÚC JSON ĐẦU RA BẮT BUỘC:
{
  "title": "Tên đề thi chuẩn hóa",
  "grade": "6|7|8|9|10|11|12",
  "topic": "Tên chủ đề",
  "durationMinutes": 45,
  "questions": [
    {
      "questionId": 1,
      "id": 1,
      "level": "NB|TH|VD|VDC",
      "levelName": "Nhận biết|Thông hiểu|Vận dụng|Vận dụng cao",
      "questionText": "Nội dung câu hỏi với công thức bọc trong $...$",
      "content": "Nội dung câu hỏi với công thức bọc trong $...$",
      "hasGraph": false,
      "graphType": "parabola",
      "graphFunction": "y = x^2 - 2x - 1",
      "graphData": { "a": 1, "b": -2, "c": -1 },
      "svgContent": "",
      "hasTable": false,
      "hasBbt": false,
      "tableData": null,
      "bbtHtml": "",
      "imageUrl": "",
      "options": [
        { "id": "A", "text": "Đáp án A kèm $công_thức$" },
        { "id": "B", "text": "Đáp án B kèm $công_thức$" },
        { "id": "C", "text": "Đáp án C kèm $công_thức$" },
        { "id": "D", "text": "Đáp án D kèm $công_thức$" }
      ],
      "correctOption": "A",
      "correctAnswer": "A",
      "explanation": "Lời giải chi tiết từng bước kèm $công_thức$"
    }
  ]
}
`;

    return fullPrompt;
  }

  /**
   * Gọi OpenRouter API (openai/gpt-4o-mini hoặc các model khác)
   * Endpoint: https://openrouter.ai/api/v1/chat/completions
   */
  async function callOpenRouterApi(apiKey, prompt, chosenModel) {
    const model = chosenModel || 'openai/gpt-4o-mini';
    const endpoint = 'https://openrouter.ai/api/v1/chat/completions';

    const requestBody = {
      model: model,
      messages: [
        {
          role: "system",
          content: "Bạn là chuyên gia biên soạn đề thi Toán học STEM chuẩn Bộ GD&ĐT Việt Nam. BẮT BUỘC bọc toàn bộ công thức toán học trong cặp dấu $...$ (nội tuyến) hoặc $$...$$ (khối). Trả về duy nhất 1 chuỗi JSON thuần túy theo đúng cấu trúc được yêu cầu, không kèm bất kỳ giải thích hay markdown code block fence nào."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.35,
      response_format: { type: "json_object" }
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": (typeof window !== 'undefined' && window.location && window.location.origin) ? window.location.origin : "https://lms-system.vercel.app",
      "X-Title": "LMS System AI Exam Generator"
    };

    let response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
      });
    } catch (netErr) {
      console.error("OpenRouter API Error (Network):", netErr);
      throw new Error("Không thể kết nối đến máy chủ OpenRouter: " + netErr.message);
    }

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const errMsg = (errJson.error && errJson.error.message) ? errJson.error.message : `HTTP ${response.status}: ${response.statusText}`;
      console.error("OpenRouter API Error:", errMsg, errJson);
      throw new Error(errMsg);
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
      throw new Error("Phản hồi từ OpenRouter không có nội dung hợp lệ!");
    }

    return data.choices[0].message.content;
  }

  /**
   * Gọi AI tạo đề thi qua OpenRouter (gpt-4o-mini)
   */
  async function handleGenerateAiExam() {
    const inputKeyEl = document.getElementById('gemini-api-key-input') || document.getElementById('openrouter-api-key-input');
    const customKey = inputKeyEl ? inputKeyEl.value.trim() : '';
    const finalApiKey = customKey || localStorage.getItem('lms_openrouter_api_key') || localStorage.getItem('lms_gemini_api_key');

    if (!finalApiKey) {
      alert("Vui lòng nhập OpenRouter API Key (sk-or-v1-...) vào ô cấu hình phía trên, hoặc bấm '📂 Mở Ngân Hàng Đề Offline' / '⚡ Sinh đề mẫu Demo' để thử nghiệm tính năng ngay!");
      if (inputKeyEl) inputKeyEl.focus();
      return;
    }

    // Lưu API key vào localStorage để tiện dùng lại
    localStorage.setItem('lms_openrouter_api_key', finalApiKey);
    localStorage.setItem('lms_gemini_api_key', finalApiKey);

    const modelSelectEl = document.getElementById('gemini-model-select') || document.getElementById('openrouter-model-select');
    const selectedModel = (modelSelectEl && modelSelectEl.value) ? modelSelectEl.value : 'openai/gpt-4o-mini';

    const modelDisplayName = selectedModel.includes('gpt-4o-mini') ? 'gpt-4o-mini' : selectedModel;
    setAiLoading(true, `Đang khởi tạo đề thi với ${modelDisplayName}...`);

    try {
      const prompt = buildSystemPrompt();
      const rawResponse = await callOpenRouterApi(finalApiKey, prompt, selectedModel);

      // Lưu chuỗi văn bản gốc từ AI vào window để sẵn sàng gửi cho backend Vercel xuất Word
      window.lastRawAiResponse = rawResponse;

      // Xóa bỏ markdown code fence nếu có ```json ... ```
      let cleanText = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();

      // Tiền xử lý xóa lỗi \in fty nếu có trong chuỗi thô
      if (typeof sanitizeLatexMathString === 'function') {
        cleanText = sanitizeLatexMathString(cleanText);
      }

      const parsedExam = JSON.parse(cleanText);
      if (parsedExam.questions && Array.isArray(parsedExam.questions)) {
        parsedExam.questions.forEach((q, i) => {
          if (!q.content && q.questionText) q.content = q.questionText;
          if (!q.correctAnswer && q.correctOption) q.correctAnswer = q.correctOption;
          if (q.hasTable && !q.hasBbt) q.hasBbt = true;
          if (!q.id) q.id = i + 1;
        });
      }
      parsedExam.rawText = rawResponse;
      generatedExamData = parsedExam;

      setAiLoading(false, `Đã tạo đề thi thành công với ${modelDisplayName}!`);
      renderEditablePreview(parsedExam);

    } catch (err) {
      console.error("OpenRouter API Error:", err);
      setAiLoading(false, "");
      alert("Lỗi kết nối OpenRouter API:\n" + err.message + "\n\n(Bạn có thể kiểm tra API Key hoặc bấm '📂 Mở Ngân Hàng Đề Offline' / '⚡ Sinh đề mẫu Demo' để xem giao diện và xuất file Word ngay lập tức!)");
    }
  }

  /**
   * Sinh đề thi mẫu chuẩn STEM (Dành cho việc kiểm thử nhanh không cần Gemini Key)
   */
  function handleGenerateDemoExam() {
    setAiLoading(true, "Đang nạp đề thi STEM mẫu chuẩn hóa...");
    setTimeout(() => {
      const grade = activeTab === 'matrix' ? document.getElementById('matrix-grade').value : '9';
      const topic = activeTab === 'matrix' ? document.getElementById('matrix-topic').value : 'Hình học và Hàm số';

      const demoExam = {
        id: "exam_ai_" + Date.now(),
        title: `Đề thi Khảo sát Năng lực Toán ${grade} - ${topic}`,
        grade: grade,
        topic: topic,
        durationMinutes: 45,
        questions: [
          {
            id: 1,
            level: "NB",
            levelName: "Nhận biết",
            content: "Nghiệm của phương trình bậc hai $2x^2 - 5x + 2 = 0$ là:",
            hasBbt: false,
            svgContent: "",
            imageUrl: "",
            options: [
              { id: "A", text: "$x = 2$ hoặc $x = \\frac{1}{2}$" },
              { id: "B", text: "$x = -2$ hoặc $x = -\\frac{1}{2}$" },
              { id: "C", text: "$x = 1$ hoặc $x = 4$" },
              { id: "D", text: "$x = 2$ hoặc $x = -\\frac{1}{2}$" }
            ],
            correctAnswer: "A",
            explanation: "Tính $\\Delta = (-5)^2 - 4 \\cdot 2 \\cdot 2 = 25 - 16 = 9 > 0$. Phương trình có hai nghiệm $x_1 = \\frac{5 + 3}{4} = 2$ và $x_2 = \\frac{5 - 3}{4} = \\frac{1}{2}$."
          },
          {
            id: 2,
            level: "TH",
            levelName: "Thông hiểu",
            content: "Cho hàm số bậc hai có đồ thị hình parabol đỉnh $I(1; -4)$ cắt trục tung tại điểm $(0; -3)$. Bảng biến thiên của hàm số là:",
            hasBbt: true,
            bbtHtml: `
            <div class="bbt-table-wrapper">
              <table class="bbt-table">
                <thead>
                  <tr>
                    <th class="col-header">$x$</th>
                    <th>$-\\infty$</th>
                    <th>$1$</th>
                    <th>$+\\infty$</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="col-header">$y'$</td>
                    <td>$-$</td>
                    <td>$0$</td>
                    <td>$+$</td>
                  </tr>
                  <tr>
                    <td class="col-header">$y$</td>
                    <td>$+\\infty$</td>
                    <td><span class="bbt-arrow-down">↘</span> $-4$ <span class="bbt-arrow-up">↗</span></td>
                    <td>$+\\infty$</td>
                  </tr>
                </tbody>
              </table>
            </div>`,
            svgContent: "",
            imageUrl: "",
            options: [
              { id: "A", text: "Hàm số nghịch biến trên $(-\\infty; 1)$ và đồng biến trên $(1; +\\infty)$" },
              { id: "B", text: "Hàm số đồng biến trên $(-\\infty; 1)$ và nghịch biến trên $(1; +\\infty)$" },
              { id: "C", text: "Hàm số nghịch biến trên toàn bộ $\\mathbb{R}$" },
              { id: "D", text: "Hàm số đạt giá trị lớn nhất bằng $-4$" }
            ],
            correctAnswer: "A",
            explanation: "Từ bảng biến thiên, khi $x < 1$ thì hàm đi xuống (nghịch biến), khi $x > 1$ thì hàm đi lên (đồng biến). Giá trị nhỏ nhất là $-4$ tại $x=1$."
          },
          {
            id: 3,
            level: "VD",
            levelName: "Vận dụng",
            content: "Hình vẽ sau mô tả đồ thị hàm số bậc nhất $y = ax + b$. Tìm các hệ số $a$ và $b$ tương ứng:",
            hasBbt: false,
            svgContent: `<svg viewBox="0 0 300 200" width="280" height="180" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="160" x2="280" y2="160" stroke="#64748b" stroke-width="2"/>
              <text x="270" y="180">x</text>
              <line x1="120" y1="190" x2="120" y2="10" stroke="#64748b" stroke-width="2"/>
              <text x="105" y="20">y</text>
              <line x1="40" y1="180" x2="240" y2="20" stroke="#2563eb" stroke-width="3"/>
              <circle cx="120" cy="116" r="4" fill="#dc2626"/>
              <text x="128" y="118" font-size="11" fill="#dc2626">(0; 2)</text>
              <circle cx="70" cy="160" r="4" fill="#dc2626"/>
              <text x="50" y="152" font-size="11" fill="#dc2626">(-1; 0)</text>
            </svg>`,
            imageUrl: "",
            options: [
              { id: "A", text: "$a = 2, b = 2$" },
              { id: "B", text: "$a = -2, b = 2$" },
              { id: "C", text: "$a = 1, b = 2$" },
              { id: "D", text: "$a = 2, b = -2$" }
            ],
            correctAnswer: "A",
            explanation: "Đồ thị cắt trục tung tại $(0; 2) \\Rightarrow b = 2$. Đồ thị cắt trục hoành tại $(-1; 0) \\Rightarrow 0 = a(-1) + 2 \\Leftrightarrow a = 2$. Do đó hàm số là $y = 2x + 2$."
          },
          {
            id: 4,
            level: "VDC",
            levelName: "Vận dụng cao",
            content: "[CHÈN HÌNH ẢNH] Cho đồ thị vận tốc - thời gian $v(t)$ của một ô tô chuyển động. Hãy xác định quãng đường xe đi được trong 10 giây đầu tiên.",
            hasBbt: false,
            svgContent: "",
            imageUrl: "",
            options: [
              { id: "A", text: "$s = 120\\text{ m}$" },
              { id: "B", text: "$s = 100\\text{ m}$" },
              { id: "C", text: "$s = 80\\text{ m}$" },
              { id: "D", text: "$s = 150\\text{ m}$" }
            ],
            correctAnswer: "A",
            explanation: "Quãng đường bằng diện tích hình thang dưới đồ thị vận tốc: $s = \\int_0^{10} v(t) dt = \\frac{(10 + 6) \\cdot 15}{2} = 120\\text{ m}$."
          }
        ]
      };

      generatedExamData = demoExam;
      setAiLoading(false, "Đã nạp đề thi mẫu thành công!");
      renderEditablePreview(demoExam);
    }, 400);
  }

  /**
   * Mở Ngân Hàng Đề Offline (js/exam-bank.js):
   * Tự động nạp ngẫu nhiên các câu hỏi từ EXAM_BANK ra giao diện biên tập,
   * hoàn toàn độc lập, không cần gọi bất kỳ Gemini API nào ra ngoài.
   */
  function handleOpenOfflineExamBank() {
    const rawBank = window.EXAM_BANK || (typeof EXAM_BANK !== 'undefined' ? EXAM_BANK : null);
    if (!rawBank || !Array.isArray(rawBank) || rawBank.length === 0) {
      alert("Chưa tìm thấy dữ liệu Ngân hàng đề thi Offline. Vui lòng kiểm tra file js/exam-bank.js đã được tải vào hệ thống.");
      return;
    }

    setAiLoading(true, "Đang nạp ngẫu nhiên các câu hỏi từ Ngân hàng đề Offline...");

    setTimeout(() => {
      try {
        const bank = JSON.parse(JSON.stringify(rawBank));

        // Xác định số câu hỏi cần lấy (từ ô Số lượng câu hỏi hoặc mặc định 20)
        const totalQInput = document.getElementById('matrix-total-questions');
        let requestedCount = totalQInput ? parseInt(totalQInput.value, 10) : 20;
        if (isNaN(requestedCount) || requestedCount < 1) requestedCount = 20;
        if (requestedCount > bank.length) requestedCount = bank.length;

        // Đọc thông tin Khối, Chủ đề, Thời gian
        const grade = activeTab === 'matrix' ? (document.getElementById('matrix-grade')?.value || '12') : '12';
        const topic = activeTab === 'matrix' ? (document.getElementById('matrix-topic')?.value || 'Ứng dụng đạo hàm khảo sát hàm số') : 'Toàn bộ Chương I (Toán 12 KNTT)';
        const durationMinutes = activeTab === 'matrix' ? (parseInt(document.getElementById('matrix-duration')?.value, 10) || 45) : (requestedCount <= 10 ? 20 : (requestedCount <= 25 ? 45 : 90));

        // Hàm xáo trộn mảng ngẫu nhiên (Fisher-Yates Shuffle)
        function shuffle(arr) {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        }

        let selectedQuestions = [];

        if (requestedCount >= bank.length) {
          // Lấy tất cả 100 câu nhưng xáo trộn ngẫu nhiên
          selectedQuestions = shuffle(bank);
        } else {
          // Phân bổ ngẫu nhiên theo ma trận tỷ lệ (NB - TH - VD - VDC)
          const pNb = parseInt(document.getElementById('matrix-pct-nb')?.value, 10) || 40;
          const pTh = parseInt(document.getElementById('matrix-pct-th')?.value, 10) || 30;
          const pVd = parseInt(document.getElementById('matrix-pct-vd')?.value, 10) || 20;
          const pVdc = parseInt(document.getElementById('matrix-pct-vdc')?.value, 10) || 10;

          const nNb = Math.round(requestedCount * (pNb / 100));
          const nTh = Math.round(requestedCount * (pTh / 100));
          const nVd = Math.round(requestedCount * (pVd / 100));
          let nVdc = requestedCount - (nNb + nTh + nVd);
          if (nVdc < 0) nVdc = 0;

          const poolNb = shuffle(bank.filter(q => q.level === 'NB'));
          const poolTh = shuffle(bank.filter(q => q.level === 'TH'));
          const poolVd = shuffle(bank.filter(q => q.level === 'VD'));
          const poolVdc = shuffle(bank.filter(q => q.level === 'VDC'));

          selectedQuestions = [
            ...poolNb.slice(0, nNb),
            ...poolTh.slice(0, nTh),
            ...poolVd.slice(0, nVd),
            ...poolVdc.slice(0, nVdc)
          ];

          // Bù đắp câu hỏi nếu còn thiếu do làm tròn tỷ lệ
          if (selectedQuestions.length < requestedCount) {
            const pickedIds = new Set(selectedQuestions.map(q => q.id));
            const remaining = shuffle(bank.filter(q => !pickedIds.has(q.id)));
            selectedQuestions.push(...remaining.slice(0, requestedCount - selectedQuestions.length));
          }

          // Kiểm tra yêu cầu có Bảng biến thiên (BBT)
          const reqBbt = document.getElementById('matrix-req-bbt')?.checked;
          if (reqBbt && !selectedQuestions.some(q => q.hasBbt)) {
            const bbtPool = shuffle(bank.filter(q => q.hasBbt));
            if (bbtPool.length > 0) {
              selectedQuestions[selectedQuestions.length - 1] = bbtPool[0];
            }
          }
        }

        // Sắp xếp câu hỏi theo mức độ sư phạm từ dễ đến khó (NB -> TH -> VD -> VDC)
        const levelWeight = { 'NB': 1, 'TH': 2, 'VD': 3, 'VDC': 4 };
        selectedQuestions.sort((a, b) => (levelWeight[a.level] || 1) - (levelWeight[b.level] || 1));

        // Đánh số lại thứ tự ID từ 1 đến N
        selectedQuestions = selectedQuestions.map((q, idx) => ({
          ...q,
          id: idx + 1
        }));

        const examCode = Math.floor(101 + Math.random() * 899);
        const offlineExam = {
          id: "exam_offline_" + Date.now(),
          title: `Đề thi Khảo sát Năng lực Toán 12 - ${topic} - Mã đề ${examCode}`,
          grade: grade,
          topic: topic,
          durationMinutes: durationMinutes,
          questions: selectedQuestions
        };

        generatedExamData = offlineExam;
        setAiLoading(false, "");
        renderEditablePreview(offlineExam);

        const bbtCount = selectedQuestions.filter(q => q.hasBbt).length;
        if (aiStatusMessage) {
          aiStatusMessage.textContent = `✅ Đã nạp ${selectedQuestions.length} câu ngẫu nhiên từ Ngân hàng đề (${bbtCount} câu có Bảng biến thiên)!`;
        }
      } catch (err) {
        console.error("Lỗi khi mở Ngân hàng đề offline:", err);
        setAiLoading(false, "");
        alert("Lỗi khi nạp Ngân hàng đề: " + (err.message || err));
      }
    }, 200);
  }

  function setAiLoading(isLoading, message) {
    if (aiLoadingSpinner) {
      aiLoadingSpinner.style.display = isLoading ? 'inline-block' : 'none';
    }
    if (aiStatusMessage) {
      aiStatusMessage.textContent = message;
    }
    if (btnGenerateAi) btnGenerateAi.disabled = isLoading;
    if (btnGenerateDemo) btnGenerateDemo.disabled = isLoading;
    const btnLoad = document.getElementById('btn-load-exam-bank');
    if (btnLoad) btnLoad.disabled = isLoading;
  }

  // ==========================================
  // 4. EDITABLE PREVIEW & UPLOAD ẢNH GEOGEBRA
  // ==========================================
  function updateQuestionCounterAndEmptyState() {
    const cards = previewQuestionsList ? previewQuestionsList.querySelectorAll('.editable-question-card') : [];
    const count = cards.length;
    const counter = document.getElementById('preview-question-counter');
    if (counter) counter.textContent = `${count} câu hỏi`;

    const emptyState = document.getElementById('preview-empty-state');
    const bottomActions = document.getElementById('preview-bottom-actions');
    if (count === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (bottomActions) bottomActions.classList.add('hidden');
    } else {
      if (emptyState) emptyState.style.display = 'none';
      if (bottomActions) bottomActions.classList.remove('hidden');
    }
  }

  function renderEditablePreview(exam) {
    if (examTitleInput) examTitleInput.value = exam.title || '';
    if (examDurationInput) examDurationInput.value = exam.durationMinutes || 45;

    previewQuestionsList.innerHTML = '';

    exam.questions.forEach((q, idx) => {
      const card = createEditableQuestionCard(q, idx);
      previewQuestionsList.appendChild(card);
      // Gọi cập nhật Live KaTeX Preview ngay lập tức khi sinh đề
      updateCardKaTeXPreview(card);
    });

    updateQuestionCounterAndEmptyState();

    // Render KaTeX trên toàn bộ preview
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(previewQuestionsList, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX render error on preview list:", err);
      }
    }

    // Scroll mượt tới vùng preview
    editablePreviewSection.scrollIntoView({ behavior: 'smooth' });
  }

  function createEditableQuestionCard(q, idx) {
    const card = document.createElement('div');
    card.className = 'editable-question-card bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md p-5 transition-all space-y-4';
    card.setAttribute('data-question-idx', idx);

    // Kiểm tra placeholder [CHÈN HÌNH ẢNH]
    const hasPlaceholder = q.content && q.content.includes('[CHÈN HÌNH ẢNH]');

    card.innerHTML = `
      <!-- Header câu hỏi -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2.5">
          <span class="q-card-title-badge inline-flex items-center px-3 py-1 rounded-xl text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
            Câu số ${idx + 1}
          </span>
          <select class="form-control form-select q-level-select rounded-lg border border-slate-300 py-1 px-2.5 text-xs font-semibold bg-slate-50 text-slate-700 focus:border-indigo-500 outline-none">
            <option value="NB" ${q.level === 'NB' ? 'selected' : ''}>Nhận biết (NB)</option>
            <option value="TH" ${q.level === 'TH' ? 'selected' : ''}>Thông hiểu (TH)</option>
            <option value="VD" ${q.level === 'VD' ? 'selected' : ''}>Vận dụng (VD)</option>
            <option value="VDC" ${q.level === 'VDC' ? 'selected' : ''}>Vận dụng cao (VDC)</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" class="btn btn-sm btn-delete-question inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition" title="Xóa câu hỏi này">
            <span>✕</span> Xóa câu
          </button>
        </div>
      </div>

      <!-- Nội dung câu hỏi & Vùng xem trước Live KaTeX -->
      <div class="space-y-1.5">
        <label class="block text-xs font-bold text-slate-700">Nội dung đề bài (hỗ trợ $LaTeX$ và $$khối$$):</label>
        <textarea class="form-control q-content-input w-full rounded-xl border border-slate-300 p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition font-sans leading-relaxed" rows="3">${q.content || ''}</textarea>
        
        <!-- Live KaTeX Preview Box -->
        <div class="live-preview-box q-stem-preview-wrap bg-blue-50/60 border border-blue-200/80 rounded-xl p-3.5 mt-2">
          <div class="live-preview-header flex items-center justify-between text-xs font-bold text-blue-900 mb-1.5">
            <span class="flex items-center gap-1.5"><span>👁️</span> Xem trước công thức hiển thị (Live KaTeX):</span>
            <span class="live-preview-badge px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] uppercase font-bold tracking-wider">KaTeX STEM</span>
          </div>
          <div class="q-stem-preview text-slate-900 text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[24px]">${q.content || ''}</div>
        </div>
      </div>

      <!-- Đồ thị / Hình vẽ minh họa SVG hoặc Ảnh -->
      <div class="p-3 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span>📈 Đồ thị / Hình vẽ minh họa:</span>
            ${hasPlaceholder ? `<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Cần ảnh đồ thị</span>` : ''}
          </div>
          <label class="upload-btn-wrap inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer transition">
            <span>📷 Tải ảnh GeoGebra/PNG</span>
            <input type="file" class="q-image-file-input hidden" accept="image/*">
          </label>
        </div>

        <div class="q-image-preview-area text-center">
          ${q.imageUrl ? `<img src="${q.imageUrl}" class="max-h-52 mx-auto rounded-xl border border-slate-200 shadow-sm">` : ''}
          ${(!q.imageUrl && q.svgContent) ? `<div class="svg-wrap flex justify-center overflow-x-auto">${q.svgContent}</div>` : ''}
        </div>
      </div>

      <!-- Bảng biến thiên (BBT) Toggle & Editor -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
          <input type="checkbox" class="q-has-bbt-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${q.hasBbt ? 'checked' : ''}>
          <span>Bao gồm Bảng biến thiên (HTML Table chuẩn KaTeX)</span>
        </label>
        <div class="q-bbt-editor-wrap ${q.hasBbt ? '' : 'hidden'} space-y-2 pl-6">
          <textarea class="form-control q-bbt-html-input w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 font-mono bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none" rows="4" placeholder="Nhập mã HTML bảng biến thiên...">${q.bbtHtml || ''}</textarea>
          
          <div class="live-preview-box q-bbt-preview-wrap bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5">
            <div class="live-preview-header flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
              <span>👁️ Xem trước Bảng Biến Thiên:</span>
              <span class="live-preview-badge px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">BBT Table</span>
            </div>
            <div class="q-bbt-preview overflow-x-auto">${q.bbtHtml || ''}</div>
          </div>
        </div>
      </div>

      <!-- 4 Đáp án A, B, C, D kèm Live Preview -->
      <div class="space-y-1.5">
        <label class="block text-xs font-bold text-slate-700">4 Phương án trả lời (click chọn nút tròn để chỉ định đáp án đúng):</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${renderOptionInputs(q)}
        </div>
      </div>

      <!-- Lời giải chi tiết & Live Preview -->
      <div class="space-y-1.5">
        <label class="block text-xs font-bold text-slate-700">Lời giải chi tiết từng bước:</label>
        <textarea class="form-control q-explanation-input w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 outline-none transition" rows="2">${q.explanation || ''}</textarea>
        
        <div class="live-preview-box q-expl-preview-wrap bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 mt-1.5">
          <div class="live-preview-header flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
            <span>👁️ Xem trước Lời giải chi tiết:</span>
            <span class="live-preview-badge px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">KaTeX Giải</span>
          </div>
          <div class="q-expl-preview text-slate-800 text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[20px]">${q.explanation || ''}</div>
        </div>
      </div>

      <div class="flex justify-end pt-1">
        <button type="button" class="btn btn-sm btn-refresh-math text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 py-1 px-3 rounded-lg border border-slate-200 transition">
          ↻ Làm mới KaTeX
        </button>
      </div>
    `;

    // Gán sự kiện cho từng thẻ câu hỏi
    attachCardEvents(card, q);
    return card;
  }

  function renderOptionInputs(q) {
    const labels = ['A', 'B', 'C', 'D'];
    const options = q.options || [];
    let html = '';

    labels.forEach((label) => {
      const opt = options.find(o => o.id === label) || { id: label, text: '' };
      const isCorrect = (q.correctAnswer === label);
      html += `
        <div class="q-opt-wrap p-3 rounded-xl border transition-all duration-150 ${isCorrect ? 'border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'}">
          <div class="flex items-center gap-2.5">
            <input type="radio" name="correct_radio_${q.id || Math.random()}" value="${label}" class="q-correct-radio h-4 w-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600" ${isCorrect ? 'checked' : ''} title="Chọn làm đáp án đúng">
            <strong class="min-w-[18px] text-xs font-black ${isCorrect ? 'text-emerald-700' : 'text-indigo-700'}">${label}.</strong>
            <input type="text" class="form-control q-opt-text flex-1 rounded-lg border border-slate-300 py-1.5 px-2.5 text-xs text-slate-800 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none" data-opt-id="${label}" value="${escapeHtml(opt.text)}" placeholder="Nhập đáp án kèm $LaTeX$...">
          </div>
          <div class="q-opt-preview-box mt-2 p-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 overflow-x-auto min-h-[26px]">
            <span class="font-bold text-[11px] text-slate-400 mr-1">${label}:</span>
            <span class="q-opt-preview">${opt.text || ''}</span>
          </div>
        </div>
      `;
    });

    return html;
  }

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
   * Cập nhật và render KaTeX thời gian thực cho một thẻ câu hỏi
   */
  function updateCardKaTeXPreview(card) {
    if (!card) return;

    const katexConfig = {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    };

    // 1. Cập nhật xem trước nội dung câu hỏi
    const contentInput = card.querySelector('.q-content-input');
    const stemPreview = card.querySelector('.q-stem-preview');
    if (contentInput && stemPreview) {
      stemPreview.innerHTML = sanitizeLatexMathString(contentInput.value) || '<span style="color: #94a3b8; font-style: italic;">Chưa có nội dung câu hỏi...</span>';
      if (typeof renderMathInElement === 'function') {
        try {
          renderMathInElement(stemPreview, katexConfig);
        } catch (e) {
          console.warn("Lỗi render KaTeX câu hỏi:", e);
        }
      }
    }

    // 2. Cập nhật xem trước 4 đáp án A, B, C, D
    card.querySelectorAll('.q-opt-wrap').forEach(wrap => {
      const optInput = wrap.querySelector('.q-opt-text');
      const optPreview = wrap.querySelector('.q-opt-preview');
      if (optInput && optPreview) {
        optPreview.innerHTML = sanitizeLatexMathString(optInput.value) || '<span style="color: #94a3b8; font-style: italic;">(Trống)</span>';
        if (typeof renderMathInElement === 'function') {
          try {
            renderMathInElement(optPreview, katexConfig);
          } catch (e) {
            console.warn("Lỗi render KaTeX đáp án:", e);
          }
        }
      }
    });

    // 3. Cập nhật xem trước Bảng biến thiên
    const bbtInput = card.querySelector('.q-bbt-html-input');
    const bbtPreview = card.querySelector('.q-bbt-preview');
    const bbtCheckbox = card.querySelector('.q-has-bbt-checkbox');
    if (bbtInput && bbtPreview && bbtCheckbox && bbtCheckbox.checked) {
      bbtPreview.innerHTML = sanitizeLatexMathString(bbtInput.value) || '';
      if (typeof renderMathInElement === 'function') {
        try {
          renderMathInElement(bbtPreview, katexConfig);
        } catch (e) {
          console.warn("Lỗi render KaTeX BBT:", e);
        }
      }
    }

    // 4. Cập nhật xem trước Lời giải chi tiết
    const explInput = card.querySelector('.q-explanation-input');
    const explPreview = card.querySelector('.q-expl-preview');
    if (explInput && explPreview) {
      explPreview.innerHTML = sanitizeLatexMathString(explInput.value) || '<span style="color: #94a3b8; font-style: italic;">Chưa có lời giải chi tiết...</span>';
      if (typeof renderMathInElement === 'function') {
        try {
          renderMathInElement(explPreview, katexConfig);
        } catch (e) {
          console.warn("Lỗi render KaTeX lời giải:", e);
        }
      }
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/"/g, '&quot;');
  }

  function attachCardEvents(card, q) {
    // 1. Upload ảnh trực tiếp (từ GeoGebra / Screenshot)
    const fileInput = card.querySelector('.q-image-file-input');
    const previewArea = card.querySelector('.q-image-preview-area');
    fileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Url = event.target.result;
        q.imageUrl = base64Url;
        previewArea.innerHTML = `<img src="${base64Url}" style="max-height: 220px; border-radius: 8px; border: 1px solid #2563eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">`;
        // Xóa placeholder [CHÈN HÌNH ẢNH] khỏi content nếu có
        const contentInput = card.querySelector('.q-content-input');
        contentInput.value = contentInput.value.replace(/\[CHÈN HÌNH ẢNH\]/g, '').trim();
        updateCardKaTeXPreview(card);
      };
      reader.readAsDataURL(file);
    });

    // 2. Toggle Bảng biến thiên & Live Input
    const bbtCheckbox = card.querySelector('.q-has-bbt-checkbox');
    const bbtEditorWrap = card.querySelector('.q-bbt-editor-wrap');
    const bbtHtmlInput = card.querySelector('.q-bbt-html-input');

    bbtCheckbox.addEventListener('change', function () {
      if (this.checked) {
        bbtEditorWrap.classList.remove('hidden');
        if (!bbtHtmlInput.value.trim() && window.LmsMath) {
          bbtHtmlInput.value = window.LmsMath.generateBbtTableHtml();
        }
        updateCardKaTeXPreview(card);
      } else {
        bbtEditorWrap.classList.add('hidden');
      }
    });

    bbtHtmlInput.addEventListener('input', function () {
      updateCardKaTeXPreview(card);
    });

    // 3. Tự động Render Live KaTeX khi gõ nội dung câu hỏi
    const contentInput = card.querySelector('.q-content-input');
    contentInput.addEventListener('input', function () {
      updateCardKaTeXPreview(card);
    });

    // 4. Tự động Render Live KaTeX khi gõ 4 đáp án A, B, C, D
    card.querySelectorAll('.q-opt-text').forEach(optInput => {
      optInput.addEventListener('input', function () {
        updateCardKaTeXPreview(card);
      });
    });

    // 5. Tự động Render Live KaTeX khi gõ Lời giải chi tiết
    const explInput = card.querySelector('.q-explanation-input');
    explInput.addEventListener('input', function () {
      updateCardKaTeXPreview(card);
    });

    // 6. Tự động đổi màu highlight khi chọn đáp án đúng A, B, C, D
    card.querySelectorAll('.q-correct-radio').forEach(radio => {
      radio.addEventListener('change', function () {
        card.querySelectorAll('.q-opt-wrap').forEach(w => {
          w.classList.remove('border-emerald-500', 'bg-emerald-50/60', 'shadow-xs', 'ring-1', 'ring-emerald-500/30');
          w.classList.add('border-slate-200', 'bg-slate-50/50');
          const lbl = w.querySelector('strong');
          if (lbl) {
            lbl.classList.remove('text-emerald-700');
            lbl.classList.add('text-indigo-700');
          }
        });
        const wrap = this.closest('.q-opt-wrap');
        if (wrap) {
          wrap.classList.remove('border-slate-200', 'bg-slate-50/50');
          wrap.classList.add('border-emerald-500', 'bg-emerald-50/60', 'shadow-xs', 'ring-1', 'ring-emerald-500/30');
          const lbl = wrap.querySelector('strong');
          if (lbl) {
            lbl.classList.remove('text-indigo-700');
            lbl.classList.add('text-emerald-700');
          }
        }
      });
    });

    // 7. Nút Làm mới KaTeX thủ công nếu cần
    const btnRefreshMath = card.querySelector('.btn-refresh-math');
    if (btnRefreshMath) {
      btnRefreshMath.addEventListener('click', function () {
        updateCardKaTeXPreview(card);
      });
    }

    // 8. Xóa câu hỏi
    const btnDelete = card.querySelector('.btn-delete-question');
    if (btnDelete) {
      btnDelete.addEventListener('click', function () {
        if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
          card.remove();
          reindexPreviewQuestions();
        }
      });
    }
  }

  function reindexPreviewQuestions() {
    const cards = previewQuestionsList ? previewQuestionsList.querySelectorAll('.editable-question-card') : [];
    cards.forEach((card, idx) => {
      card.setAttribute('data-question-idx', idx);
      const titleSpan = card.querySelector('.q-card-title-badge') || card.querySelector('span');
      if (titleSpan) titleSpan.textContent = `Câu số ${idx + 1}`;
    });
    updateQuestionCounterAndEmptyState();
  }

  function handleAddNewEmptyQuestion() {
    const newQ = {
      id: Date.now(),
      level: "TH",
      levelName: "Thông hiểu",
      content: "Nhập nội dung câu hỏi mới tại đây kèm công thức $LaTeX$...",
      hasBbt: false,
      bbtHtml: "",
      svgContent: "",
      imageUrl: "",
      options: [
        { id: "A", text: "Phương án A" },
        { id: "B", text: "Phương án B" },
        { id: "C", text: "Phương án C" },
        { id: "D", text: "Phương án D" }
      ],
      correctAnswer: "A",
      explanation: ""
    };

    const card = createEditableQuestionCard(newQ, previewQuestionsList.children.length);
    previewQuestionsList.appendChild(card);
    updateCardKaTeXPreview(card);
    updateQuestionCounterAndEmptyState();
    card.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Chèn nhanh 1 câu hỏi mẫu có Bảng Biến Thiên chuẩn HTML Table
   */
  function handleInsertSampleBbt() {
    const newQ = {
      id: Date.now(),
      level: "TH",
      levelName: "Thông hiểu",
      content: "Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{1\\}$ và có bảng biến thiên như hình dưới đây. Khẳng định nào sau đây là đúng?",
      hasBbt: true,
      bbtHtml: `
      <div class="bbt-table-wrapper">
        <table class="bbt-table">
          <thead>
            <tr>
              <th class="col-header">$x$</th>
              <th>$-\\infty$</th>
              <th>$-1$</th>
              <th>$2$</th>
              <th>$+\\infty$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-header">$y'$</td>
              <td>$+$</td>
              <td>$0$</td>
              <td>$-$</td>
              <td>$0$</td>
              <td>$+$</td>
            </tr>
            <tr>
              <td class="col-header">$y$</td>
              <td>$-\\infty$</td>
              <td><span class="bbt-arrow-up">↗</span> $5$</td>
              <td><span class="bbt-arrow-down">↘</span> $-2$</td>
              <td><span class="bbt-arrow-up">↗</span> $+\\infty$</td>
            </tr>
          </tbody>
        </table>
      </div>`,
      svgContent: "",
      imageUrl: "",
      options: [
        { id: "A", text: "Hàm số đạt cực đại tại $x = -1$ và giá trị cực đại $y_{\\text{CĐ}} = 5$" },
        { id: "B", text: "Hàm số đạt cực tiểu tại $x = 5$ và giá trị cực tiểu $y_{\\text{CT}} = -2$" },
        { id: "C", text: "Hàm số đồng biến trên khoảng $(-1; 2)$" },
        { id: "D", text: "Hàm số nghịch biến trên khoảng $(-\\infty; -1)$" }
      ],
      correctAnswer: "A",
      explanation: "Dựa vào bảng biến thiên, đạo hàm $y'$ đổi dấu từ dương sang âm khi đi qua $x = -1$ nên hàm số đạt cực đại tại $x = -1$ với $y_{\\text{CĐ}} = 5$. Chọn A."
    };

    const card = createEditableQuestionCard(newQ, previewQuestionsList.children.length);
    previewQuestionsList.appendChild(card);
    updateCardKaTeXPreview(card);
    updateQuestionCounterAndEmptyState();
    card.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Chèn nhanh 1 câu hỏi mẫu có Đồ thị SVG (Parabol, Bậc 3, hoặc Phân thức)
   */
  function handleInsertSampleGraph(type) {
    let svg = '';
    let content = '';
    let options = [];
    let expl = '';

    if (window.LmsWordExport && window.LmsWordExport.generateGraphSvg) {
      svg = window.LmsWordExport.generateGraphSvg(type);
    }

    if (type === 'parabola') {
      content = "Cho hàm số bậc hai $y = ax^2 + bx + c$ có đồ thị hình parabol như hình vẽ bên. Tọa độ đỉnh $I$ của parabol là:";
      options = [
        { id: "A", text: "$I(1; -2)$" },
        { id: "B", text: "$I(-1; 2)$" },
        { id: "C", text: "$I(2; -1)$" },
        { id: "D", text: "$I(0; -1)$" }
      ];
      expl = "Quan sát đồ thị ta thấy đỉnh parabol có hoành độ $x_I = 1$ và tung độ $y_I = -2$. Do đó tọa độ đỉnh là $I(1; -2)$. Chọn A.";
    } else if (type === 'cubic') {
      content = "Đường cong trong hình bên là đồ thị của hàm số nào dưới đây?";
      options = [
        { id: "A", text: "$y = x^3 - 3x$" },
        { id: "B", text: "$y = -x^3 + 3x$" },
        { id: "C", text: "$y = x^4 - 2x^2$" },
        { id: "D", text: "$y = \\frac{2x+1}{x-1}$" }
      ];
      expl = "Đồ thị có dạng chữ N của hàm số bậc ba với hệ số $a > 0$, đi qua gốc tọa độ $O(0; 0)$ và có 2 điểm cực trị tại $x = \\pm 1$. Do đó hàm số là $y = x^3 - 3x$. Chọn A.";
    } else {
      content = "Cho hàm số $y = \\frac{2x+1}{x-1}$ có đồ thị như hình vẽ. Phương trình đường tiệm cận đứng và tiệm cận ngang lần lượt là:";
      options = [
        { id: "A", text: "$x = 1$ và $y = 2$" },
        { id: "B", text: "$x = 2$ và $y = 1$" },
        { id: "C", text: "$x = -1$ và $y = 2$" },
        { id: "D", text: "$x = 1$ và $y = -2$" }
      ];
      expl = "Tiệm cận đứng là nghiệm của mẫu số $x - 1 = 0 \\Leftrightarrow x = 1$. Tiệm cận ngang là $\\lim_{x \\to \\pm\\infty} \\frac{2x+1}{x-1} = 2 \\Rightarrow y = 2$. Chọn A.";
    }

    const newQ = {
      id: Date.now(),
      level: "VD",
      levelName: "Vận dụng",
      content: content,
      hasBbt: false,
      bbtHtml: "",
      svgContent: svg,
      imageUrl: "",
      options: options,
      correctAnswer: "A",
      explanation: expl
    };

    const card = createEditableQuestionCard(newQ, previewQuestionsList.children.length);
    previewQuestionsList.appendChild(card);
    updateCardKaTeXPreview(card);
    updateQuestionCounterAndEmptyState();
    card.scrollIntoView({ behavior: 'smooth' });
  }

  // ==========================================
  // 5. THU THẬP DỮ LIỆU & LƯU VÀO NGÂN HÀNG ĐỀ / XUẤT WORD
  // ==========================================
  function collectCurrentExamData() {
    const title = examTitleInput ? examTitleInput.value.trim() : 'Đề thi Khảo sát Toán học STEM';
    const duration = examDurationInput ? (parseInt(examDurationInput.value, 10) || 45) : 45;
    const cards = previewQuestionsList ? previewQuestionsList.querySelectorAll('.editable-question-card') : [];
    const questions = [];

    cards.forEach((card, idx) => {
      const levelSelect = card.querySelector('.q-level-select');
      const contentInput = card.querySelector('.q-content-input');
      const bbtCheckbox = card.querySelector('.q-has-bbt-checkbox');
      const bbtHtmlInput = card.querySelector('.q-bbt-html-input');
      const explanationInput = card.querySelector('.q-explanation-input');
      const imgEl = card.querySelector('.q-image-preview-area img');
      const svgEl = card.querySelector('.q-image-preview-area .svg-wrap');

      // Đáp án A, B, C, D
      const options = [];
      const optInputs = card.querySelectorAll('.q-opt-text');
      optInputs.forEach(input => {
        options.push({
          id: input.getAttribute('data-opt-id'),
          text: input.value.trim()
        });
      });

      // Đáp án đúng đã chọn
      const checkedRadio = card.querySelector('.q-correct-radio:checked');
      const correctAnswer = checkedRadio ? checkedRadio.value : 'A';

      const levelVal = levelSelect ? levelSelect.value : 'NB';
      const levelNames = { NB: "Nhận biết", TH: "Thông hiểu", VD: "Vận dụng", VDC: "Vận dụng cao" };

      questions.push({
        id: idx + 1,
        level: levelVal,
        levelName: levelNames[levelVal] || "Nhận biết",
        content: contentInput ? contentInput.value.trim() : '',
        hasBbt: bbtCheckbox ? bbtCheckbox.checked : false,
        bbtHtml: (bbtCheckbox && bbtCheckbox.checked && bbtHtmlInput) ? bbtHtmlInput.value.trim() : "",
        svgContent: svgEl ? svgEl.innerHTML : "",
        imageUrl: imgEl ? imgEl.src : "",
        options: options,
        correctAnswer: correctAnswer,
        explanation: explanationInput ? explanationInput.value.trim() : ""
      });
    });

    const grade = (generatedExamData && generatedExamData.grade) ? generatedExamData.grade : '9';
    const topic = (generatedExamData && generatedExamData.topic) ? generatedExamData.topic : 'Tổng hợp';

    return {
      id: (generatedExamData && generatedExamData.id) ? generatedExamData.id : ('exam_' + Date.now()),
      title: title,
      grade: grade,
      topic: topic,
      durationMinutes: duration,
      questions: questions
    };
  }

  /**
   * Tạo chuỗi văn bản thô (raw text chứa công thức LaTeX $...$ và các lựa chọn) từ dữ liệu đề thi
   */
  function buildRawTextFromExamData(exam) {
    if (!exam) return '';
    let text = `${exam.title || 'ĐỀ KIỂM TRA TOÁN HỌC'}\nThời gian: ${exam.durationMinutes || 45} phút\n\n`;
    if (exam.questions && Array.isArray(exam.questions)) {
      exam.questions.forEach((q, idx) => {
        text += `Câu ${q.id || (idx + 1)}: ${q.content || q.questionText || ''}\n`;
        if (q.options && Array.isArray(q.options)) {
          q.options.forEach(o => {
            text += `${o.id || ''}. ${o.text || ''}\n`;
          });
        }
        if (q.explanation || q.correctAnswer) {
          text += `Lời giải: ${q.explanation || ''} Chọn ${q.correctAnswer || 'A'}.\n`;
        }
        text += '\n';
      });
    }
    return text;
  }

  /**
   * Xử lý xuất đề thi ra file Word (.docx) kết nối Backend Serverless Vercel:
   * - Gửi chuỗi văn bản thô (raw text chứa LaTeX của đề thi vừa tạo) lên API /api/export-word
   * - Nhận luồng dữ liệu (Blob) trả về từ Serverless Function và kích hoạt tải xuống De_Thi_AI.docx
   * - Xử lý mượt mà trạng thái Loading (hiển thị trạng thái đang render file từ server)
   * - Cơ chế dự phòng (fallback): Nếu chạy ở môi trường tĩnh (file:// hoặc serverless không phản hồi), tự động dùng hàm client-side
   * @param {string} format 'omml' hoặc 'mathtype'
   * @param {boolean} includeSolutions Có kèm lời giải chi tiết hay không
   * @param {HTMLElement} triggerBtn Nút bấm được click để hiển thị trạng thái đang xử lý
   */
  async function handleExportWord(format, includeSolutions, triggerBtn) {
    const examData = collectCurrentExamData();
    if (!examData || !examData.questions || examData.questions.length === 0) {
      alert("Chưa có câu hỏi nào để xuất file Word! Vui lòng tạo đề hoặc bấm '📂 Mở Ngân Hàng Đề Offline' trước.");
      if (triggerBtn) triggerBtn.disabled = false;
      return;
    }

    const isMathType = (format === 'mathtype');
    const originalHtml = triggerBtn ? triggerBtn.innerHTML : '';
    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.innerHTML = `<span>⏳ Đang gọi Serverless Vercel render Word (.docx)...</span>`;
    }

    const rawTextToSend = window.lastRawAiResponse || buildRawTextFromExamData(examData);
    let exportedFromServerless = false;

    try {
      // 1. Thử gọi API Backend Serverless /api/export-word trên Vercel / Node runtime
      const isHttp = (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http'));
      if (isHttp) {
        try {
          console.log('[Word Export] Gửi payload lên Vercel Serverless /api/export-word...');
          const response = await fetch('/api/export-word', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              rawText: rawTextToSend,
              examData: examData,
              title: examData.title,
              format: format,
              includeSolutions: includeSolutions,
              filename: 'De_Thi_AI.docx'
            })
          });

          if (response.ok) {
            const blob = await response.blob();
            const cleanTitle = (examData.title || 'De_Thi_AI')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D')
              .replace(/[^a-zA-Z0-9_\-\s]/g, '')
              .trim()
              .replace(/\s+/g, '_');
            const modeSuffix = isMathType ? '_MathType' : '_Word_Equation';
            const solSuffix = includeSolutions ? '_Kem_Loi_Giai' : '_De_Bai';
            const finalFilename = `${cleanTitle}${modeSuffix}${solSuffix}.docx`;

            // Tải file về máy tính (ưu tiên FileSaver nếu có, hoặc tạo thẻ a ảo)
            if (typeof window.saveAs === 'function') {
              window.saveAs(blob, finalFilename);
            } else {
              const downloadUrl = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = downloadUrl;
              a.download = finalFilename;
              document.body.appendChild(a);
              a.click();
              setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(downloadUrl);
              }, 1500);
            }

            exportedFromServerless = true;
            const formatMsg = isMathType
              ? "- Đã nhúng đối tượng MathType OLE (Equation.DSMT4 / MTEF) từ Backend Serverless.\n- Mở file trên Word, bạn có thể nhấp đúp trực tiếp để sửa bằng MathType ngay."
              : "- Đã dịch công thức sang Word Equation (OMML, font Cambria Math) từ Backend Serverless.\n- Không bị lỗi khoảng trắng, chuẩn sắc nét mọi phiên bản Word.";

            alert(`✅ ĐÃ XUẤT VÀ TẢI FILE WORD THÀNH CÔNG TỪ VERCEL BACKEND!\n\nTên tệp: ${finalFilename}\n\n${formatMsg}\n- Font chữ văn bản: Times New Roman 12pt.\n- Các phương án A, B, C, D được căn chia đều chuẩn quy định.`);
            return;
          } else {
            console.warn(`[Word Export] Serverless API trả về mã lỗi HTTP ${response.status}. Tự động kích hoạt cơ chế dự phòng Client-side...`);
          }
        } catch (backendErr) {
          console.warn("[Word Export] Không thể kết nối tới Serverless API, tự động kích hoạt cơ chế dự phòng Client-side:", backendErr);
        }
      } else {
        console.info("[Word Export] Chạy ở môi trường file:// cục bộ, kích hoạt trực tiếp bộ xuất Client-side.");
      }

      // 2. Cơ chế Dự phòng An toàn (Fallback): Xuất trực tiếp bằng Client-side docx.js nếu chạy static hoặc offline
      if (!exportedFromServerless) {
        if (triggerBtn) {
          triggerBtn.innerHTML = isMathType
            ? `<span>⏳ Đang đóng gói MathType OLE (Client)...</span>`
            : `<span>⏳ Đang đóng gói Word Equation (Client)...</span>`;
        }

        if (!window.LmsWordExport || !window.docx) {
          alert("Đang tải thư viện xử lý Word và Math, vui lòng đợi 2 giây rồi bấm lại!");
          return;
        }

        try {
          const fileName = await window.LmsWordExport.exportExamToWord(examData, { format, includeSolutions });
          const formatMsg = isMathType
            ? "- Toàn bộ công thức Toán học đã được nhúng dưới dạng đối tượng MathType (OLE Equation.DSMT4 / MTEF).\n- Khi mở file trên Microsoft Word, bạn có thể nhấp đúp trực tiếp vào công thức để sửa bằng MathType ngay mà không cần chuyển đổi."
            : "- Toàn bộ công thức Toán học được định dạng chuẩn Word Equation gốc (OMML, font Cambria Math).\n- Tương thích tốt trên mọi máy tính cài Microsoft Word 2010/2016/2019/365.";
          
          alert(`✅ ĐÃ XUẤT VÀ TẢI FILE WORD THÀNH CÔNG (CLIENT-SIDE)!\n\nTên tệp: ${fileName}\n\n${formatMsg}\n- Font chữ văn bản: Times New Roman 12pt.\n- Các phương án A, B, C, D được căn chia đều chuẩn quy định.\n- Đồ thị và Bảng biến thiên nhúng ảnh vector 300 DPI siêu nét.`);
        } catch (err) {
          console.error("Lỗi xuất Word (Client):", err);
          alert("Lỗi khi xuất file Word: " + (err.message || err));
        }
      }
    } finally {
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = originalHtml;
      }
    }
  }

  async function handleSaveExamToBank() {
    const examDataToSave = collectCurrentExamData();

    if (!examDataToSave.title) {
      alert('Vui lòng nhập tên đề thi!');
      if (examTitleInput) examTitleInput.focus();
      return;
    }

    if (examDataToSave.questions.length === 0) {
      alert('Đề thi cần có ít nhất 1 câu hỏi!');
      return;
    }

    btnSaveToBank.disabled = true;
    btnSaveToBank.innerHTML = '<span>Đang lưu vào CSDL Firebase...</span>';

    try {
      await window.LmsFirebase.saveExamToBank(examDataToSave);
      alert('✅ ĐÃ LƯU ĐỀ THI VÀO NGÂN HÀNG ĐỀ THÀNH CÔNG!\nHọc sinh hiện đã có thể truy cập và làm bài ngay lập tức.');
      loadAdminExamBank();
    } catch (err) {
      alert('Lỗi lưu đề thi: ' + (err.message || err));
    } finally {
      btnSaveToBank.disabled = false;
      btnSaveToBank.innerHTML = '<span>💾 Lưu vào Ngân hàng đề</span>';
    }
  }

  // ==========================================
  // 6. QUẢN LÝ NGÂN HÀNG ĐỀ THI (ADMIN VIEW)
  // ==========================================
  async function loadAdminExamBank() {
    if (!examBankAdminList) return;
    const exams = await window.LmsFirebase.getExamBankList();
    examBankAdminList.innerHTML = '';

    if (!exams || exams.length === 0) {
      examBankAdminList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1rem;">Chưa có đề thi nào trong ngân hàng. Hãy tạo đề mới bằng AI phía trên!</div>`;
      return;
    }

    exams.forEach((exam, idx) => {
      const item = document.createElement('div');
      item.style.padding = '12px 16px';
      item.style.borderBottom = '1px solid var(--border)';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.flexWrap = 'wrap';
      item.style.gap = '8px';

      item.innerHTML = `
        <div>
          <strong style="color: var(--primary); font-size: 1rem;">${exam.title}</strong>
          <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 8px; margin-top: 4px;">
            <span class="badge" style="background:#f1f5f9; color:#475569;">Khối ${exam.grade}</span>
            <span>⏱ ${exam.durationMinutes} phút</span>
            <span>📝 ${exam.questions ? exam.questions.length : 0} câu hỏi</span>
          </div>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-sm btn-secondary btn-preview-existing" data-idx="${idx}">Xem / Sửa</button>
          <button class="btn btn-sm btn-outline-primary btn-bank-export-exam" data-idx="${idx}" title="Tải file Word đề bài">📄 Word Đề</button>
          <button class="btn btn-sm btn-success btn-bank-export-sol" data-idx="${idx}" title="Tải file Word kèm lời giải">📄 Word Lời giải</button>
          <a href="index.html" target="_blank" class="btn btn-sm btn-secondary">Thi thử ➜</a>
        </div>
      `;
      examBankAdminList.appendChild(item);
    });

    examBankAdminList.querySelectorAll('.btn-preview-existing').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-idx'), 10);
        renderEditablePreview(exams[idx]);
      });
    });

    // Xuất nhanh Word từ ngân hàng
    examBankAdminList.querySelectorAll('.btn-bank-export-exam').forEach(btn => {
      btn.addEventListener('click', async function () {
        const idx = parseInt(this.getAttribute('data-idx'), 10);
        if (window.LmsWordExport) {
          await window.LmsWordExport.exportExamToWord(exams[idx], { includeSolutions: false });
        }
      });
    });

    examBankAdminList.querySelectorAll('.btn-bank-export-sol').forEach(btn => {
      btn.addEventListener('click', async function () {
        const idx = parseInt(this.getAttribute('data-idx'), 10);
        if (window.LmsWordExport) {
          await window.LmsWordExport.exportExamToWord(exams[idx], { includeSolutions: true });
        }
      });
    });
  }

  // Khởi động
  document.addEventListener('DOMContentLoaded', init);
})();
