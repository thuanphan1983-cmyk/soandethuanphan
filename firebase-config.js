/**
 * CẤU HÌNH FIREBASE AUTH & REALTIME DATABASE PRESENCE
 * Hệ thống Quản lý Học tập & Thi STEM LMS
 */

// ==========================================
// CẤU HÌNH THÔNG SỐ DỰ ÁN FIREBASE CỦA BẠN
// (Thay thế thông tin bên dưới bằng cấu hình từ Firebase Console)
// ==========================================
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ==========================================
// HÀM BASE64 AN TOÀN VỚI UNICODE UTF-8
// ==========================================
function safeBtoa(str) {
  if (typeof str !== 'string') str = String(str || '');
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
  return window.btoa(binString);
}

function safeAtob(base64) {
  if (typeof base64 !== 'string') base64 = String(base64 || '');
  const binString = window.atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
}

// Đăng ký toàn cục để các module khác có thể dùng trực tiếp
window.safeBtoa = safeBtoa;
window.safeAtob = safeAtob;

// Biến toàn cục quản lý Firebase Module
window.LmsFirebase = (function () {
  'use strict';

  let isRealFirebase = false;
  let auth = null;
  let rtdb = null;

  // Kiểm tra xem người dùng đã cung cấp API Key thật hay chưa
  const hasValidConfig = firebaseConfig.apiKey && 
                         firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" && 
                         firebaseConfig.projectId !== "YOUR_PROJECT_ID";

  if (typeof firebase !== 'undefined' && hasValidConfig) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      auth = firebase.auth();
      rtdb = firebase.database();
      isRealFirebase = true;
      console.log("✅ Firebase kết nối thành công!");
    } catch (e) {
      console.warn("⚠️ Không thể khởi tạo Firebase SDK thật. Chuyển sang chế độ Giả lập / Mock Demo:", e);
      isRealFirebase = false;
    }
  } else {
    console.info("ℹ️ Đang chạy ở chế độ Demo (Mock Mode). Bạn có thể cấu hình Firebase thật tại js/firebase-config.js.");
  }

  // Quản lý Presence (Trạng thái Online / Offline)
  let presenceRef = null;
  let connectedRef = null;

  /**
   * Đăng nhập bằng Google Popup
   */
  async function signInWithGoogle() {
    if (isRealFirebase && auth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await auth.signInWithPopup(provider);
      return result.user;
    } else {
      // Giả lập luồng đăng nhập Google chân thực cho kiểm thử nhanh
      const mockGoogleNames = ["Nguyễn Văn An", "Trần Thị Bích", "Lê Hoàng Dũng", "Phạm Minh Thư", "Đỗ Quang Hải", "Võ Thị Sáu", "Bùi Tiến Dũng"];
      const randIdx = Math.floor(Math.random() * mockGoogleNames.length);
      const randName = mockGoogleNames[randIdx];

      // Hàm chuyển tiếng Việt có dấu sang không dấu cho email hợp lệ
      const nonAccent = randName.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanEmail = `${nonAccent}@gmail.com`;

      // Dùng safeBtoa an toàn 100% với Unicode Tiếng Việt
      const mockUid = "goog_" + safeBtoa(randName + "_" + cleanEmail).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24);

      const mockUser = {
        uid: mockUid,
        displayName: randName,
        email: cleanEmail,
        photoURL: "https://api.dicebear.com/7.x/bottts/svg?seed=" + mockUid
      };

      localStorage.setItem('lms_mock_user', JSON.stringify(mockUser));
      return mockUser;
    }
  }

  /**
   * Đăng xuất
   */
  async function signOut() {
    if (isRealFirebase && auth) {
      if (presenceRef) {
        await presenceRef.update({ online: false, lastSeen: firebase.database.ServerValue.TIMESTAMP });
      }
      await auth.signOut();
    } else {
      const stored = getCurrentUser();
      if (stored) {
        setMockPresence(stored.uid, false);
      }
      localStorage.removeItem('lms_mock_user');
    }
  }

  /**
   * Lấy người dùng hiện tại
   */
  function getCurrentUser() {
    if (isRealFirebase && auth && auth.currentUser) {
      return auth.currentUser;
    }
    const mock = localStorage.getItem('lms_mock_user');
    return mock ? JSON.parse(mock) : null;
  }

  /**
   * Lấy Profile học sinh (Khối, Lớp) từ CSDL
   */
  async function getUserProfile(uid) {
    if (isRealFirebase && rtdb) {
      const snapshot = await rtdb.ref('users/' + uid).once('value');
      return snapshot.val();
    } else {
      const key = 'lms_user_profile_' + uid;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  }

  /**
   * Lưu thông tin Khối, Lớp lần đầu đăng nhập
   */
  async function saveUserProfile(uid, profileData) {
    const dataToSave = {
      uid: uid,
      displayName: profileData.displayName,
      email: profileData.email,
      grade: profileData.grade,         // 6, 7, 8, 9
      className: profileData.className, // A1, A2, A3, A4
      updatedAt: new Date().toISOString()
    };

    if (isRealFirebase && rtdb) {
      await rtdb.ref('users/' + uid).set(dataToSave);
    } else {
      localStorage.setItem('lms_user_profile_' + uid, JSON.stringify(dataToSave));
    }
    return dataToSave;
  }

  /**
   * Bật theo dõi trạng thái Online/Offline theo thời gian thực (Presence)
   * Sử dụng Firebase Realtime Database onDisconnect()
   */
  function setupPresence(user, profile) {
    if (!user) return;

    if (isRealFirebase && rtdb) {
      presenceRef = rtdb.ref('/presence/' + user.uid);
      connectedRef = rtdb.ref('.info/connected');

      connectedRef.on('value', function (snapshot) {
        if (snapshot.val() === true) {
          // Khi mất kết nối hoặc đóng tab
          presenceRef.onDisconnect().set({
            online: false,
            lastSeen: firebase.database.ServerValue.TIMESTAMP,
            displayName: user.displayName,
            email: user.email,
            grade: profile ? profile.grade : '',
            className: profile ? profile.className : ''
          });

          // Khi đang online
          presenceRef.set({
            online: true,
            lastSeen: firebase.database.ServerValue.TIMESTAMP,
            displayName: user.displayName,
            email: user.email,
            grade: profile ? profile.grade : '',
            className: profile ? profile.className : ''
          });
        }
      });
    } else {
      // Giả lập presence trong Mock Mode
      setMockPresence(user.uid, true, user, profile);
      window.addEventListener('beforeunload', function () {
        setMockPresence(user.uid, false);
      });
    }
  }

  function setMockPresence(uid, isOnline, user, profile) {
    const list = JSON.parse(localStorage.getItem('lms_mock_presence_list') || '{}');
    if (isOnline && user) {
      list[uid] = {
        uid: uid,
        online: true,
        displayName: user.displayName,
        email: user.email,
        grade: profile ? profile.grade : '9',
        className: profile ? profile.className : 'A1',
        lastSeen: Date.now()
      };
    } else {
      if (list[uid]) {
        list[uid].online = false;
        list[uid].lastSeen = Date.now();
      }
    }
    localStorage.setItem('lms_mock_presence_list', JSON.stringify(list));
    // Phát event để trang admin cùng tab/khác tab cập nhật
    window.dispatchEvent(new Event('storage'));
  }

  /**
   * Lắng nghe số lượng và danh sách học sinh Online (Dành cho Admin)
   */
  function listenOnlinePresence(callback) {
    if (isRealFirebase && rtdb) {
      rtdb.ref('/presence').on('value', function (snapshot) {
        const data = snapshot.val() || {};
        let onlineCount = 0;
        const onlineUsers = [];
        Object.keys(data).forEach(function (key) {
          if (data[key] && data[key].online) {
            onlineCount++;
            onlineUsers.push(data[key]);
          }
        });
        callback({ count: onlineCount, users: onlineUsers });
      });
    } else {
      // Mock Listener
      const updateMock = function () {
        const data = JSON.parse(localStorage.getItem('lms_mock_presence_list') || '{}');
        let onlineCount = 0;
        const onlineUsers = [];
        
        // Thêm một vài học sinh mẫu giả lập nếu chưa có
        if (Object.keys(data).length === 0) {
          const defaultSample = {
            "u1": { uid: "u1", online: true, displayName: "Nguyễn Minh Châu", email: "chau.nm@gmail.com", grade: "9", className: "A1", lastSeen: Date.now() },
            "u2": { uid: "u2", online: true, displayName: "Vũ Tuấn Kiệt", email: "kiet.vt@gmail.com", grade: "8", className: "A2", lastSeen: Date.now() },
            "u3": { uid: "u3", online: true, displayName: "Hoàng Thùy Linh", email: "linh.ht@gmail.com", grade: "9", className: "A3", lastSeen: Date.now() }
          };
          localStorage.setItem('lms_mock_presence_list', JSON.stringify(defaultSample));
          return updateMock();
        }

        Object.keys(data).forEach(function (key) {
          if (data[key] && data[key].online) {
            onlineCount++;
            onlineUsers.push(data[key]);
          }
        });
        callback({ count: onlineCount, users: onlineUsers });
      };

      updateMock();
      window.addEventListener('storage', updateMock);
      setInterval(updateMock, 5000);
    }
  }

  /**
   * Lưu Đề thi mới vào Ngân hàng đề (Firebase Database / LocalStorage)
   */
  async function saveExamToBank(examData) {
    const examId = examData.id || ('exam_' + Date.now());
    const finalData = {
      ...examData,
      id: examId,
      createdAt: new Date().toISOString()
    };

    if (isRealFirebase && rtdb) {
      await rtdb.ref('exams/' + examId).set(finalData);
    } else {
      const bank = JSON.parse(localStorage.getItem('lms_exam_bank') || '[]');
      const existIdx = bank.findIndex(e => e.id === examId);
      if (existIdx >= 0) {
        bank[existIdx] = finalData;
      } else {
        bank.unshift(finalData);
      }
      localStorage.setItem('lms_exam_bank', JSON.stringify(bank));
    }
    return finalData;
  }

  /**
   * Lấy danh sách các đề thi từ Ngân hàng đề
   */
  async function getExamBankList() {
    if (isRealFirebase && rtdb) {
      const snap = await rtdb.ref('exams').once('value');
      const data = snap.val() || {};
      const exams = Object.values(data);
      if (exams.length > 0) return exams;
    }

    let bank = JSON.parse(localStorage.getItem('lms_exam_bank') || '[]');
    // Tự động tích hợp Đề thi từ Ngân hàng offline 100 câu Toán 12 KNTT
    const hasToan12 = bank.some(e => e.id === 'exam_toan12_kntt_full');
    if (!hasToan12 && typeof window !== 'undefined' && window.EXAM_BANK && window.EXAM_BANK.length > 0) {
      const toan12Exam = {
        id: "exam_toan12_kntt_full",
        title: "Đề Khảo sát Năng lực Toán 12 - Toàn bộ Chương I (KNTT)",
        grade: "12",
        topic: "Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
        durationMinutes: 90,
        questions: window.EXAM_BANK
      };
      bank.unshift(toan12Exam);
      try {
        localStorage.setItem('lms_exam_bank', JSON.stringify(bank));
      } catch (e) {
        console.warn("Storage limit when persisting bank:", e);
      }
    } else if (bank.length === 0) {
      // Cung cấp 1 đề thi mẫu STEM chất lượng cao sẵn có
      const sampleExam = getSampleStemExam();
      bank.push(sampleExam);
      localStorage.setItem('lms_exam_bank', JSON.stringify(bank));
    }
    return bank;
  }

  /**
   * Lấy chi tiết một đề thi theo ID
   */
  async function getExamById(id) {
    const list = await getExamBankList();
    return list.find(e => e.id === id) || null;
  }

  /**
   * Đề thi mẫu chuẩn STEM ban đầu (kèm LaTeX và Bảng biến thiên HTML)
   */
  function getSampleStemExam() {
    return {
      id: "exam_stem_001",
      title: "Đề Khảo sát Toán học STEM Lớp 9 - Đợt 1",
      grade: "9",
      topic: "Hàm số & Phương trình bậc hai",
      durationMinutes: 45,
      questions: [
        {
          id: 1,
          level: "NB",
          levelName: "Nhận biết",
          content: "Cho hàm số $y = ax^2$ $(a \\ne 0)$. Biết đồ thị hàm số đi qua điểm $M(2; 4)$. Hệ số $a$ bằng bao nhiêu?",
          hasBbt: false,
          svgContent: `<svg viewBox="0 0 300 200" width="280" height="180" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="170" x2="280" y2="170" stroke="#64748b" stroke-width="2"/>
            <polygon points="280,166 290,170 280,174" fill="#64748b"/>
            <text x="275" y="190" font-size="12" fill="#334155">x</text>
            <line x1="150" y1="190" x2="150" y2="20" stroke="#64748b" stroke-width="2"/>
            <polygon points="146,20 150,10 154,20" fill="#64748b"/>
            <text x="135" y="20" font-size="12" fill="#334155">y</text>
            <path d="M 50 20 Q 150 240 250 20" fill="none" stroke="#2563eb" stroke-width="2.5"/>
            <circle cx="200" cy="95" r="4" fill="#dc2626"/>
            <text x="210" y="95" font-size="11" fill="#dc2626">M(2; 4)</text>
          </svg>`,
          imageUrl: "",
          options: [
            { id: "A", text: "$a = 1$" },
            { id: "B", text: "$a = 2$" },
            { id: "C", text: "$a = -1$" },
            { id: "D", text: "$a = \\frac{1}{2}$" }
          ],
          correctAnswer: "A",
          explanation: "Thay tọa độ $M(2; 4)$ vào hàm số: $4 = a \\cdot 2^2 \\Leftrightarrow 4a = 4 \\Leftrightarrow a = 1$."
        },
        {
          id: 2,
          level: "TH",
          levelName: "Thông hiểu",
          content: "Cho bảng biến thiên của hàm số $y = f(x)$ như hình bên dưới. Hàm số đồng biến trên khoảng nào?",
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
            { id: "A", text: "$(-\\infty; -1)$ và $(2; +\\infty)$" },
            { id: "B", text: "$(-1; 2)$" },
            { id: "C", text: "$(-\\infty; 5)$" },
            { id: "D", text: "$(-2; +\\infty)$" }
          ],
          correctAnswer: "A",
          explanation: "Dựa vào dòng dấu của $y'$, ta thấy $y' > 0$ trên các khoảng $(-\\infty; -1)$ và $(2; +\\infty)$ nên hàm số đồng biến trên các khoảng đó."
        },
        {
          id: 3,
          level: "VD",
          levelName: "Vận dụng",
          content: "Phương trình $x^2 - 2(m-1)x + m^2 - 3m = 0$ có hai nghiệm phân biệt $x_1, x_2$ thỏa mãn $x_1^2 + x_2^2 = 8$. Giá trị của $m$ là:",
          hasBbt: false,
          svgContent: "",
          imageUrl: "",
          options: [
            { id: "A", text: "$m = 2$" },
            { id: "B", text: "$m = -2$" },
            { id: "C", text: "$m = 1$" },
            { id: "D", text: "$m = 3$" }
          ],
          correctAnswer: "A",
          explanation: "Áp dụng định lý Vi-ét: $x_1 + x_2 = 2(m-1)$, $x_1 x_2 = m^2 - 3m$. Biến đổi $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = 8$. Giải phương trình ta thu được $m = 2$ (thỏa mãn $\\Delta' > 0$)."
        },
        {
          id: 4,
          level: "VDC",
          levelName: "Vận dụng cao",
          content: "Một cổng parabol dạng $y = -\\frac{1}{2}x^2 + 8$ có độ cao cao nhất là 8m. Người ta muốn chở một thùng hàng hình chữ nhật có chiều rộng 4m qua cổng. Chiều cao tối đa của thùng hàng là:",
          hasBbt: false,
          svgContent: `<svg viewBox="0 0 320 180" width="300" height="160" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="160" x2="310" y2="160" stroke="#334155" stroke-width="2"/>
            <path d="M 40 160 Q 160 10 280 160" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/>
            <rect x="120" y="80" width="80" height="80" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
            <text x="145" y="125" font-size="12" font-weight="bold" fill="#b45309">Hàng</text>
            <line x1="120" y1="170" x2="200" y2="170" stroke="#000" stroke-width="1"/>
            <text x="148" y="178" font-size="10">4m</text>
          </svg>`,
          imageUrl: "",
          options: [
            { id: "A", text: "$6\\text{ m}$" },
            { id: "B", text: "$6.5\\text{ m}$" },
            { id: "C", text: "$7\\text{ m}$" },
            { id: "D", text: "$5.8\\text{ m}$" }
          ],
          correctAnswer: "A",
          explanation: "Do chiều rộng thùng hàng là 4m nên hai mép thùng nằm tại $x = -2$ và $x = 2$. Chiều cao tối đa là giá trị tại $x = 2$: $y = -\\frac{1}{2}(2)^2 + 8 = -2 + 8 = 6\\text{ m}$."
        }
      ]
    };
  }

  return {
    isRealFirebase: isRealFirebase,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    getCurrentUser: getCurrentUser,
    getUserProfile: getUserProfile,
    saveUserProfile: saveUserProfile,
    setupPresence: setupPresence,
    listenOnlinePresence: listenOnlinePresence,
    saveExamToBank: saveExamToBank,
    getExamBankList: getExamBankList,
    getExamById: getExamById,
    safeBtoa: safeBtoa,
    safeAtob: safeAtob
  };
})();
