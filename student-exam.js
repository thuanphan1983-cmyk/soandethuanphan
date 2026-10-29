/**
 * STUDENT EXAM CONTROLLER - HỆ THỐNG THI TRỰC TUYẾN STEM
 * Tính năng:
 * - Khóa nội dung, bắt buộc Đăng nhập Google
 * - Popup chọn Khối (6, 7, 8, 9) và Lớp (A1, A2, A3, A4) lần đầu
 * - Realtime Presence
 * - Anti-Cheat: Xáo trộn câu hỏi & đáp án (Randomization)
 * - Anti-Cheat: Strict Timer tự động thu bài khi về 00:00
 * - Anti-Cheat: Giám sát chuyển tab (Tab Blur Alert)
 * - KaTeX Rendering mượt mà
 */

(function () {
  'use strict';

  // DOM Elements
  const authLockedScreen = document.getElementById('auth-locked-screen');
  const studentMainApp = document.getElementById('student-main-app');
  const googleLoginBtn = document.getElementById('btn-google-login');
  const studentProfileModal = document.getElementById('student-profile-modal');
  const profileForm = document.getElementById('profile-setup-form');
  const studentNameDisplay = document.getElementById('student-name-display');
  const studentClassBadge = document.getElementById('student-class-badge');
  const studentSignoutBtn = document.getElementById('btn-student-signout');

  // Exam lobby & screens
  const examLobbySection = document.getElementById('exam-lobby-section');
  const examActiveSection = document.getElementById('exam-active-section');
  const examResultSection = document.getElementById('exam-result-section');
  const examCardsList = document.getElementById('exam-cards-list');

  // Exam active elements
  const currentExamTitle = document.getElementById('current-exam-title');
  const timerDisplay = document.getElementById('timer-display');
  const questionBox = document.getElementById('current-question-box');
  const paletteGrid = document.getElementById('palette-grid');
  const answeredCountEl = document.getElementById('answered-count');
  const totalCountEl = document.getElementById('total-count');
  const btnPrevQuestion = document.getElementById('btn-prev-question');
  const btnNextQuestion = document.getElementById('btn-next-question');
  const btnFlagQuestion = document.getElementById('btn-flag-question');
  const btnSubmitExam = document.getElementById('btn-submit-exam');
  const cheatAlertBadge = document.getElementById('cheat-alert-badge');

  // State
  let currentUser = null;
  let userProfile = null;
  let activeExamRaw = null;
  let randomizedQuestions = [];
  let currentQuestionIndex = 0;
  let userAnswers = {}; // { questionId: selectedOptionId }
  let flaggedQuestions = new Set();
  let timerInterval = null;
  let remainingSeconds = 0;
  let tabSwitchCount = 0;
  let isExamSubmitted = false;

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

  // ==========================================
  // 1. KHỞI TẠO & KIỂM TRA ĐĂNG NHẬP GOOGLE
  // ==========================================
  async function init() {
    setupEventListeners();
    checkCurrentUser();
  }

  async function checkCurrentUser() {
    currentUser = window.LmsFirebase.getCurrentUser();
    if (currentUser) {
      // Đã đăng nhập, kiểm tra xem đã có Khối / Lớp chưa
      userProfile = await window.LmsFirebase.getUserProfile(currentUser.uid);
      if (!userProfile || !userProfile.grade || !userProfile.className) {
        // Lần đầu đăng nhập: Hiện Modal bắt buộc chọn Khối & Lớp
        showProfileModal();
      } else {
        // Đã có đầy đủ profile
        unlockStudentPortal();
      }
    } else {
      // Chưa đăng nhập -> Khóa toàn bộ nội dung
      lockStudentPortal();
    }
  }

  function lockStudentPortal() {
    authLockedScreen.classList.remove('hidden');
    studentMainApp.classList.add('hidden');
  }

  function unlockStudentPortal() {
    authLockedScreen.classList.add('hidden');
    studentMainApp.classList.remove('hidden');

    studentNameDisplay.textContent = currentUser.displayName || currentUser.email;
    studentClassBadge.textContent = `Khối ${userProfile.grade} - Lớp ${userProfile.className}`;

    // Kích hoạt Realtime Presence
    window.LmsFirebase.setupPresence(currentUser, userProfile);

    // Tải danh sách đề thi
    loadAvailableExams();
  }

  function showProfileModal() {
    authLockedScreen.classList.add('hidden');
    studentMainApp.classList.remove('hidden');
    studentProfileModal.classList.remove('hidden');
    document.getElementById('profile-display-name').value = currentUser.displayName || '';
    document.getElementById('profile-email').value = currentUser.email || '';
  }

  // ==========================================
  // 2. SỰ KIỆN XỬ LÝ AUTH & PROFILE
  // ==========================================
  function setupEventListeners() {
    // Nút Đăng nhập Google
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener('click', async function () {
        try {
          googleLoginBtn.disabled = true;
          googleLoginBtn.innerHTML = `<span>Đang kết nối Google Auth...</span>`;
          const user = await window.LmsFirebase.signInWithGoogle();
          currentUser = user;
          await checkCurrentUser();
        } catch (err) {
          alert('Đăng nhập Google thất bại: ' + (err.message || err));
        } finally {
          googleLoginBtn.disabled = false;
          googleLoginBtn.innerHTML = `
            <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            <span>Đăng nhập bằng Google</span>`;
        }
      });
    }

    // Submit Modal Profile (Khối 6-9, Lớp A1-A4)
    if (profileForm) {
      profileForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const grade = document.getElementById('select-grade').value;
        const className = document.getElementById('select-class').value;

        if (!grade || !className) {
          alert('Vui lòng chọn đầy đủ Khối và Lớp của bạn!');
          return;
        }

        const saved = await window.LmsFirebase.saveUserProfile(currentUser.uid, {
          displayName: currentUser.displayName,
          email: currentUser.email,
          grade: grade,
          className: className
        });

        userProfile = saved;
        studentProfileModal.classList.add('hidden');
        unlockStudentPortal();
      });
    }

    // Đăng xuất
    if (studentSignoutBtn) {
      studentSignoutBtn.addEventListener('click', async function () {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
          clearInterval(timerInterval);
          await window.LmsFirebase.signOut();
          currentUser = null;
          userProfile = null;
          location.reload();
        }
      });
    }

    // Điều hướng câu hỏi
    if (btnPrevQuestion) {
      btnPrevQuestion.addEventListener('click', () => navigateQuestion(currentQuestionIndex - 1));
    }
    if (btnNextQuestion) {
      btnNextQuestion.addEventListener('click', () => navigateQuestion(currentQuestionIndex + 1));
    }
    if (btnFlagQuestion) {
      btnFlagQuestion.addEventListener('click', toggleFlagCurrentQuestion);
    }
    if (btnSubmitExam) {
      btnSubmitExam.addEventListener('click', confirmSubmitExam);
    }

    // Anti-Cheat: Phát hiện chuyển tab / mất focus
    window.addEventListener('blur', handleTabSwitchAntiCheat);

    // Anti-Cheat: Chặn chuột phải trong phòng thi
    document.addEventListener('contextmenu', function (e) {
      if (examActiveSection && !examActiveSection.classList.contains('hidden') && !isExamSubmitted) {
        e.preventDefault();
      }
    });
  }

  // ==========================================
  // 3. TẢI VÀ CHỌN ĐỀ THI
  // ==========================================
  async function loadAvailableExams() {
    examLobbySection.classList.remove('hidden');
    examActiveSection.classList.add('hidden');
    examResultSection.classList.add('hidden');

    const exams = await window.LmsFirebase.getExamBankList();
    examCardsList.innerHTML = '';

    if (!exams || exams.length === 0) {
      examCardsList.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted);">Hiện chưa có đề thi nào trong ngân hàng đề. Vui lòng vào trang Admin để tạo đề thi mới bằng AI!</div>`;
      return;
    }

    exams.forEach(exam => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.display = 'flex';
      card.style.justifyContent = 'space-between';
      card.style.alignItems = 'center';
      card.style.flexWrap = 'wrap';
      card.style.gap = '1rem';

      card.innerHTML = `
        <div>
          <h3 style="color: var(--primary); font-size: 1.15rem; margin-bottom: 0.25rem;">${exam.title}</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; font-size: 0.85rem; color: var(--text-muted);">
            <span class="badge" style="background: #e2e8f0; color: #334155;">Khối ${exam.grade || 'Toán'}</span>
            <span>⏱ ${exam.durationMinutes || 45} phút</span>
            <span>📝 ${exam.questions ? exam.questions.length : 0} câu trắc nghiệm</span>
            <span>🎯 Chủ đề: ${exam.topic || 'Tổng hợp'}</span>
          </div>
        </div>
        <div>
          <button class="btn btn-primary btn-start-exam" data-exam-id="${exam.id}">
            Bắt đầu làm bài ➜
          </button>
        </div>
      `;
      examCardsList.appendChild(card);
    });

    document.querySelectorAll('.btn-start-exam').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-exam-id');
        startExam(id);
      });
    });
  }

  // ==========================================
  // 4. BẮT ĐẦU THI & ANTI-CHEAT RANDOMIZATION
  // ==========================================
  async function startExam(examId) {
    const exam = await window.LmsFirebase.getExamById(examId);
    if (!exam || !exam.questions || exam.questions.length === 0) {
      alert('Đề thi này chưa có câu hỏi!');
      return;
    }

    activeExamRaw = exam;
    isExamSubmitted = false;
    tabSwitchCount = 0;
    userAnswers = {};
    flaggedQuestions.clear();

    // 1. Randomization: Xáo trộn vị trí câu hỏi & xáo trộn đáp án bên trong
    randomizedQuestions = randomizeExam(exam.questions);

    // Chuyển màn hình
    examLobbySection.classList.add('hidden');
    examActiveSection.classList.remove('hidden');
    examResultSection.classList.add('hidden');

    currentExamTitle.textContent = exam.title;
    totalCountEl.textContent = randomizedQuestions.length;
    answeredCountEl.textContent = '0';
    currentQuestionIndex = 0;

    // Khởi tạo bảng Palette câu hỏi
    renderPalette();

    // Hiển thị câu hỏi đầu tiên
    renderQuestion(currentQuestionIndex);

    // 2. Strict Timer: Đồng hồ đếm ngược
    startStrictTimer(exam.durationMinutes || 45);
  }

  /**
   * Thuật toán xáo trộn câu hỏi và đáp án ngẫu nhiên
   */
  function randomizeExam(questions) {
    // Deep clone danh sách câu hỏi
    const cloned = JSON.parse(JSON.stringify(questions));

    // Fisher-Yates shuffle câu hỏi
    for (let i = cloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }

    // Xáo trộn đáp án bên trong từng câu hỏi
    cloned.forEach((q, idx) => {
      q.displayNumber = idx + 1;

      if (q.options && q.options.length > 0) {
        // Lưu lại nội dung của đáp án đúng ban đầu
        const originalCorrectOpt = q.options.find(opt => opt.id === q.correctAnswer);
        const originalCorrectText = originalCorrectOpt ? originalCorrectOpt.text : '';

        // Xáo trộn mảng options
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        // Gán lại nhãn A, B, C, D mới và cập nhật correctAnswer tương ứng
        const labels = ['A', 'B', 'C', 'D', 'E'];
        shuffledOptions.forEach((opt, optIdx) => {
          opt.newId = labels[optIdx] || String.fromCharCode(65 + optIdx);
          if (opt.text === originalCorrectText) {
            q.newCorrectAnswer = opt.newId;
          }
        });

        q.shuffledOptions = shuffledOptions;
      }
    });

    return cloned;
  }

  // ==========================================
  // 5. HIỂN THỊ CÂU HỎI VÀ KATEX STEM
  // ==========================================
  function renderQuestion(index) {
    if (index < 0 || index >= randomizedQuestions.length) return;
    currentQuestionIndex = index;

    const q = randomizedQuestions[index];
    const qId = q.id || index;

    // Cập nhật trạng thái nút điều hướng
    btnPrevQuestion.disabled = (index === 0);
    btnNextQuestion.disabled = (index === randomizedQuestions.length - 1);

    // Cập nhật nút Đánh dấu
    btnFlagQuestion.className = flaggedQuestions.has(qId) ? 'btn btn-warning' : 'btn btn-secondary';
    btnFlagQuestion.textContent = flaggedQuestions.has(qId) ? '★ Bỏ đánh dấu' : '☆ Đánh dấu xem lại';

    // Xác định class badge độ khó
    let levelBadgeClass = 'badge-nb';
    let levelName = q.levelName || 'Nhận biết';
    if (q.level === 'TH') levelBadgeClass = 'badge-th';
    else if (q.level === 'VD') levelBadgeClass = 'badge-vd';
    else if (q.level === 'VDC') levelBadgeClass = 'badge-vdc';

    // Xử lý đồ thị / hình ảnh / SVG
    let visualHtml = '';
    if (q.imageUrl) {
      visualHtml = `<div class="question-visual"><img src="${q.imageUrl}" alt="Hình vẽ đề bài" /></div>`;
    } else if (q.svgContent) {
      visualHtml = `<div class="question-visual">${q.svgContent}</div>`;
    }

    // Xử lý Bảng biến thiên
    let bbtHtml = '';
    if (q.hasBbt && q.bbtHtml) {
      bbtHtml = q.bbtHtml;
    }

    // Render danh sách lựa chọn A, B, C, D
    const optionsToRender = q.shuffledOptions || q.options || [];
    let optionsHtml = '';
    optionsToRender.forEach(opt => {
      const optId = opt.newId || opt.id;
      const isChecked = userAnswers[qId] === optId;
      const sanitizedOptText = sanitizeLatexMathString(opt.text);
      optionsHtml += `
        <label class="option-item ${isChecked ? 'selected' : ''}" data-opt-id="${optId}">
          <input type="radio" name="question_opt_${qId}" class="option-radio" value="${optId}" ${isChecked ? 'checked' : ''}>
          <span class="option-label">${optId}.</span>
          <div class="option-text">${sanitizedOptText}</div>
        </label>
      `;
    });

    questionBox.innerHTML = `
      <div class="question-meta">
        <span class="question-number">Câu ${index + 1} / ${randomizedQuestions.length}</span>
        <span class="badge ${levelBadgeClass}">${levelName}</span>
      </div>
      <div class="question-content">
        ${sanitizeLatexMathString(q.content)}
      </div>
      ${visualHtml}
      ${bbtHtml}
      <div class="options-list">
        ${optionsHtml}
      </div>
    `;

    // Bắt sự kiện chọn đáp án
    questionBox.querySelectorAll('.option-item').forEach(item => {
      item.addEventListener('click', function () {
        const optId = this.getAttribute('data-opt-id');
        selectAnswer(qId, optId);
      });
    });

    // Render KaTeX cho toàn bộ nội dung vừa nạp
    if (window.LmsMath) {
      window.LmsMath.renderMath(questionBox);
    }

    updatePalette();
  }

  function selectAnswer(questionId, optionId) {
    if (isExamSubmitted) return;
    userAnswers[questionId] = optionId;

    // Cập nhật giao diện radio
    const items = questionBox.querySelectorAll('.option-item');
    items.forEach(el => {
      if (el.getAttribute('data-opt-id') === optionId) {
        el.classList.add('selected');
        el.querySelector('input').checked = true;
      } else {
        el.classList.remove('selected');
      }
    });

    // Cập nhật số câu đã làm
    answeredCountEl.textContent = Object.keys(userAnswers).length;
    updatePalette();
  }

  function navigateQuestion(newIndex) {
    if (newIndex >= 0 && newIndex < randomizedQuestions.length) {
      renderQuestion(newIndex);
    }
  }

  function toggleFlagCurrentQuestion() {
    const q = randomizedQuestions[currentQuestionIndex];
    const qId = q.id || currentQuestionIndex;
    if (flaggedQuestions.has(qId)) {
      flaggedQuestions.delete(qId);
    } else {
      flaggedQuestions.add(qId);
    }
    renderQuestion(currentQuestionIndex);
  }

  // ==========================================
  // 6. QUESTION PALETTE NAVIGATION
  // ==========================================
  function renderPalette() {
    paletteGrid.innerHTML = '';
    randomizedQuestions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-btn';
      btn.textContent = idx + 1;
      btn.addEventListener('click', () => navigateQuestion(idx));
      paletteGrid.appendChild(btn);
    });
    updatePalette();
  }

  function updatePalette() {
    const buttons = paletteGrid.querySelectorAll('.palette-btn');
    randomizedQuestions.forEach((q, idx) => {
      const btn = buttons[idx];
      if (!btn) return;
      const qId = q.id || idx;

      btn.className = 'palette-btn';
      if (idx === currentQuestionIndex) {
        btn.classList.add('active');
      }
      if (userAnswers[qId]) {
        btn.classList.add('answered');
      }
      if (flaggedQuestions.has(qId)) {
        btn.classList.add('flagged');
      }
    });
  }

  // ==========================================
  // 7. ANTI-CHEAT: STRICT TIMER
  // ==========================================
  function startStrictTimer(durationMinutes) {
    clearInterval(timerInterval);
    remainingSeconds = durationMinutes * 60;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      remainingSeconds--;
      updateTimerDisplay();

      // Cảnh báo màu sắc
      if (remainingSeconds <= 60) {
        timerDisplay.classList.add('timer-danger');
      } else if (remainingSeconds <= 300) {
        timerDisplay.classList.add('timer-warning');
      }

      // Khi về 00:00 -> KHÓA THAO TÁC & SUBMIT NGAY LẬP TỨC
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        triggerStrictAutoSubmit("ĐÃ HẾT GIỜ LÀM BÀI! Hệ thống đang tự động khóa bài thi và nộp kết quả...");
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerDisplay.innerHTML = `<span>⏱ ${formatted}</span>`;
  }

  function triggerStrictAutoSubmit(reason) {
    if (isExamSubmitted) return;
    isExamSubmitted = true;

    // Khóa mọi tương tác người dùng
    examActiveSection.style.pointerEvents = 'none';
    examActiveSection.style.opacity = '0.7';

    alert(reason);
    submitExam();
  }

  // ==========================================
  // 8. ANTI-CHEAT: TAB BLUR / WINDOW SWITCH MONITOR
  // ==========================================
  function handleTabSwitchAntiCheat() {
    if (examActiveSection.classList.contains('hidden') || isExamSubmitted) return;
    tabSwitchCount++;

    if (cheatAlertBadge) {
      cheatAlertBadge.style.display = 'inline-flex';
      cheatAlertBadge.textContent = `⚠️ Rời màn hình: ${tabSwitchCount} lần`;
    }

    if (tabSwitchCount >= 3) {
      triggerStrictAutoSubmit(`CẢNH BÁO GIAN LẬN: Bạn đã chuyển tab hoặc rời màn hình làm bài quá ${tabSwitchCount} lần. Bài thi bị thu hồi ngay lập tức!`);
    } else {
      console.warn(`[ANTI-CHEAT] Phát hiện học sinh chuyển tab lần thứ ${tabSwitchCount}`);
    }
  }

  // ==========================================
  // 9. NỘP BÀI VÀ XỬ LÝ KẾT QUẢ
  // ==========================================
  function confirmSubmitExam() {
    const total = randomizedQuestions.length;
    const answered = Object.keys(userAnswers).length;
    const unanswered = total - answered;

    let msg = `Bạn có chắc chắn muốn nộp bài?\n\n- Đã làm: ${answered}/${total} câu\n- Chưa làm: ${unanswered} câu`;
    if (confirm(msg)) {
      clearInterval(timerInterval);
      isExamSubmitted = true;
      submitExam();
    }
  }

  function submitExam() {
    examActiveSection.style.pointerEvents = 'auto';
    examActiveSection.style.opacity = '1';
    examActiveSection.classList.add('hidden');
    examResultSection.classList.remove('hidden');

    let correctCount = 0;
    const total = randomizedQuestions.length;

    randomizedQuestions.forEach((q, idx) => {
      const qId = q.id || idx;
      const studentChosen = userAnswers[qId];
      const actualCorrect = q.newCorrectAnswer || q.correctAnswer;
      if (studentChosen === actualCorrect) {
        correctCount++;
      }
    });

    const score = total > 0 ? ((correctCount / total) * 10).toFixed(2) : 0;

    // Render Bảng điểm
    document.getElementById('result-student-name').textContent = currentUser.displayName || currentUser.email;
    document.getElementById('result-class-name').textContent = `Khối ${userProfile.grade} - Lớp ${userProfile.className}`;
    document.getElementById('result-score-val').textContent = score;
    document.getElementById('result-summary-text').textContent = `Đúng ${correctCount}/${total} câu (${((correctCount / total) * 100).toFixed(0)}%)`;

    // Render Chi tiết bài làm và lời giải KaTeX
    renderResultReview();
  }

  function renderResultReview() {
    const reviewContainer = document.getElementById('result-review-list');
    reviewContainer.innerHTML = '';

    randomizedQuestions.forEach((q, idx) => {
      const qId = q.id || idx;
      const chosen = userAnswers[qId] || 'Chưa chọn';
      const correct = q.newCorrectAnswer || q.correctAnswer;
      const isRight = (chosen === correct);

      const reviewCard = document.createElement('div');
      reviewCard.className = 'card';
      reviewCard.style.borderLeft = `5px solid ${isRight ? 'var(--success)' : 'var(--danger)'}`;

      // Xử lý đồ thị / hình ảnh / SVG
      let visualHtml = '';
      if (q.imageUrl) {
        visualHtml = `<div class="question-visual"><img src="${q.imageUrl}" alt="Hình vẽ" /></div>`;
      } else if (q.svgContent) {
        visualHtml = `<div class="question-visual">${q.svgContent}</div>`;
      }

      // Xử lý BBT
      let bbtHtml = (q.hasBbt && q.bbtHtml) ? q.bbtHtml : '';

      reviewCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <strong>Câu ${idx + 1}: ${sanitizeLatexMathString(q.content)}</strong>
          <span class="badge ${isRight ? 'badge-online' : 'badge-vdc'}">
            ${isRight ? '✓ ĐÚNG' : '✗ SAI'}
          </span>
        </div>
        ${visualHtml}
        ${bbtHtml}
        <div style="font-size: 0.95rem; margin-top: 0.5rem; background: #f8fafc; padding: 10px; border-radius: 8px;">
          <div>👉 Bạn chọn: <strong style="color: ${isRight ? 'var(--success)' : 'var(--danger)'};">${chosen}</strong></div>
          <div>✅ Đáp án đúng: <strong style="color: var(--success);">${correct}</strong></div>
          ${q.explanation ? `<div style="margin-top: 6px; color: var(--text-muted);"><strong>💡 Lời giải chi tiết:</strong> ${sanitizeLatexMathString(q.explanation)}</div>` : ''}
        </div>
      `;
      reviewContainer.appendChild(reviewCard);
    });

    if (window.LmsMath) {
      window.LmsMath.renderMath(reviewContainer);
    }
  }

  // Khởi động
  document.addEventListener('DOMContentLoaded', init);
})();
