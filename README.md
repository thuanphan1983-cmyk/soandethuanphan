# HỆ THỐNG WEB LMS HỌC TẬP VÀ THI TRỰC TUYẾN STEM

Dự án nâng cấp toàn diện hệ thống Web LMS Học tập và Thi trực tuyến với 3 phân hệ cốt lõi:
1. **Quản lý Tài khoản & Định danh (Firebase Auth & Realtime Presence)**
2. **Giao diện Làm bài & Chống gian lận (Anti-Cheat & KaTeX STEM)**
3. **Công cụ Tạo đề thi bằng AI dành cho Admin (Gemini AI Engine)**

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN
```
lms-system/
│
├── index.html              # Cổng thông tin & Phòng thi trực tuyến dành cho Học sinh
├── admin.html              # Dashboard Quản trị viên: Bộ đếm Online, AI Generator, Ngân hàng đề
│
├── css/
│   └── style.css           # Toàn bộ giao diện chuẩn hóa STEM, hỗ trợ Responsive điện thoại & máy tính
│
├── js/
│   ├── exam-bank.js        # Ngân hàng đề thi Toán 12 offline (100 câu Chương I KNTT, 23 BBT, 4 mức độ)
│   ├── firebase-config.js  # Cấu hình Firebase Auth, Realtime Database Presence & Mock fallback
│   ├── katex-render.js     # Tiện ích render công thức Toán LaTeX và Bảng biến thiên HTML Table
│   ├── student-exam.js     # Logic làm bài học sinh: Google Login, Chọn lớp, Randomizer, Timer, Anti-cheat
│   ├── admin-generator.js  # Logic Admin: Gemini API Engine, System Prompt, Editable Preview, Upload ảnh
│   └── word-export.js      # Xuất file Word (.docx) chuẩn Office Math (<m:oMath>) & Đồ thị 300 DPI
│
└── README.md               # Tài liệu hướng dẫn sử dụng và cấu hình
```

---

## 🚀 HƯỚNG DẪN CẤU HÌNH VÀ VẬN HÀNH

### 1. Chạy thử nghiệm ngay (Không cần cài đặt phức tạp)
Hệ thống được thiết kế dạng **Static Single-Page Application (SPA)** thuần HTML/CSS/JS, có thể chạy trực tiếp:
- Cách 1: Mở trực tiếp file `index.html` hoặc `admin.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Cốc Cốc, Safari...).
- Cách 2: Khởi tạo HTTP server nội bộ (khuyến nghị để tránh hạn chế CORS khi tải file cục bộ):
  ```powershell
  cd "C:\Users\May Tinh Chau A\.gemini\antigravity\scratch\lms-system"
  python -m http.server 8080
  ```
  Sau đó truy cập:
  - Cổng học sinh: `http://localhost:8080/index.html`
  - Cổng quản trị Admin: `http://localhost:8080/admin.html`

---

## 🛠 HƯỚNG DẪN TÍCH HỢP DỊCH VỤ

### 1. Cấu hình Firebase (Google Sign-In & Realtime Database Presence)
Mở file `js/firebase-config.js` và điền cấu hình Firebase của bạn:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
```
> **Lưu ý tính năng Fallback Demo:** Khi chưa điền API Key thật, hệ thống tự động kích hoạt **Chế độ Giả lập (Mock Mode)**: cho phép đăng nhập giả lập Google Auth, mô phỏng lưu profile Khối/Lớp, theo dõi trạng thái Online/Offline Realtime và đầy đủ đề thi mẫu để bạn kiểm thử toàn bộ tính năng mượt mà!

### 2. Cấu hình Gemini AI API Key (Admin Test Generator)
Có 2 cách linh hoạt:
- **Cách 1 (Trực tiếp trên giao diện):** Vào trang `admin.html`, dán API Key của bạn vào ô *Gemini API Key* (Khóa sẽ tự động lưu vào LocalStorage cho các phiên sau).
- **Cách 2 (Trong mã nguồn):** Mở file `js/admin-generator.js`, điền khóa vào hằng số:
  ```javascript
  const GEMINI_API_KEY = "AIzaSy...";
  ```
> Ngoài ra, hệ thống tích hợp sẵn nút **"⚡ Sinh đề mẫu Demo (STEM)"** để Admin có thể thử nghiệm toàn bộ luồng biên tập câu hỏi, upload ảnh đồ thị GeoGebra và lưu vào ngân hàng đề ngay tức khắc!

---

## 🌟 TỔNG HỢP CÁC TÍNH NĂNG ĐÃ TRIỂN KHAI

### PHẦN 1: HỆ THỐNG XÁC THỰC VÀ QUẢN LÝ (Firebase)
- **Bắt buộc Đăng nhập Google (Google Sign-in):** Khóa toàn bộ nội dung phòng thi khi chưa đăng nhập. Loại bỏ hoàn toàn form nhập tên thủ công.
- **Popup chọn Khối & Lớp lần đầu:** Khi đăng nhập lần đầu, tự động hiển thị Popup bắt buộc chọn Khối (`6, 7, 8, 9`) và Lớp (`A1, A2, A3, A4`). Dữ liệu này được lưu vào CSDL cho các lần đăng nhập tiếp theo.
- **Theo dõi trạng thái Thời gian thực (Presence):** Sử dụng Firebase Realtime Database và hàm `onDisconnect()` để ghi nhận trạng thái Online/Offline khi học sinh đóng tab/mất kết nối mạng.
- **Bộ đếm Online trên Admin:** Hiển thị trực quan số lượng và danh sách học sinh đang online theo thời gian thực.

### PHẦN 2: GIAO DIỆN LÀM BÀI VÀ CHỐNG GIAN LẬN
- **Hiển thị chuẩn Toán học (STEM):** Tích hợp thư viện KaTeX tự động render toàn bộ công thức LaTeX nội tuyến `\(...\)` hoặc `$..$` và khối `\[...\]` hoặc `$$..$$`.
- **Bảng biến thiên chuẩn HTML Table:** Render Bảng biến thiên với cấu trúc HTML Table kết hợp KaTeX, mũi tên biến thiên đi lên/đi xuống rõ nét.
- **Đồng hồ đếm ngược (Strict Timer):** Khi đồng hồ về `00:00`, hệ thống lập tức khóa mọi tương tác (`pointer-events: none`) và tự động thu bài nộp lên hệ thống.
- **Randomization (Xáo trộn ngẫu nhiên):** Tự động xáo trộn vị trí các câu hỏi và xáo trộn ngẫu nhiên thứ tự các đáp án (A, B, C, D) bên trong từng câu khi tải đề.
- **Giám sát chuyển tab (Anti-Cheat Tab Monitor):** Phát hiện và cảnh báo khi học sinh rời màn hình làm bài thi quá số lần quy định.

### PHẦN 3: CÔNG CỤ TẠO ĐỀ BẰNG AI DÀNH CHO ADMIN
- **2 Chế độ tạo đề linh hoạt:**
  - *Chế độ Ma trận (Matrix Mode):* Cấu hình Khối, Lớp, Chủ đề, Tỷ lệ % (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao), số lượng câu hỏi và thời gian thi.
  - *Chế độ Văn bản (Prompt Mode):* Khung nhập liệu tự do để dán đề mẫu hoặc đưa ra các yêu cầu đặc biệt.
- **Tích hợp Gemini AI Engine:** Hàm `fetch` gọi Gemini API kèm cấu hình JSON Output Mode.
- **Ràng buộc System Prompt chặt chẽ:** Ép AI sinh mã JSON chuẩn xác, công thức LaTeX, bảng biến thiên HTML Table, đồ thị SVG trực tiếp hoặc placeholder `[CHÈN HÌNH ẢNH]`.
- **Bản xem trước có thể chỉnh sửa (Editable Preview):** 
  - Admin có thể sửa trực tiếp nội dung câu hỏi, công thức KaTeX, đáp án đúng và lời giải chi tiết.
  - **Nút "Tải ảnh lên" (Upload Image):** Tích hợp dưới từng câu hỏi để Admin tải trực tiếp ảnh chụp đồ thị từ GeoGebra hoặc máy tính vào đề.
  - **Lưu vào Ngân hàng đề:** Nút đẩy đề thi trực tiếp lên Firebase Realtime Database để học sinh có thể vào thi ngay.

### PHẦN 4: XUẤT FILE WORD (.DOCX) CHUẨN TOÁN HỌC (OFFICE MATH)
- **Công thức Toán dạng Word Equation gốc:** Chuyển đổi mã LaTeX thành cấu trúc `<m:oMath>` của Microsoft Word (font Cambria Math), không cần gõ phím tắt hay cài thêm MathType.
- **Đồ thị & Bảng biến thiên tự động:** Tự động vẽ đồ thị hàm số và Bảng biến thiên 3 dòng dưới dạng vector SVG, tự động chuyển đổi sang ảnh PNG 300 DPI siêu nét nhúng trực tiếp vào văn bản.
- **2 Chế độ xuất Word chuyên nghiệp:**
  - `[📄 Xuất Word (.docx) - Đề bài]`: Định dạng chuẩn bài thi của Bộ GD&ĐT cho học sinh.
  - `[📄 Xuất Word (.docx) - Kèm Lời giải chi tiết]`: Bổ sung Bảng đáp án tổng hợp và lời giải chi tiết cho giáo viên.

### PHẦN 5: NGÂN HÀNG ĐỀ THI TOÁN 12 OFFLINE (SGK KẾT NỐI TRI THỨC)
- **Tập tin:** `js/exam-bank.js` chứa mảng hằng số `const EXAM_BANK = [...]` (và `window.EXAM_BANK`).
- **Quy mô:** Đúng **100 câu hỏi** trắc nghiệm Toán 12 bao quát toàn bộ Chương I: "Ứng dụng đạo hàm để khảo sát và vẽ đồ thị của hàm số":
  - *Bài 1:* Tính đơn điệu và cực trị của hàm số (25 câu: Q1 -> Q25).
  - *Bài 2:* Giá trị lớn nhất và giá trị nhỏ nhất của hàm số (20 câu: Q26 -> Q45).
  - *Bài 3:* Đường tiệm cận của đồ thị hàm số [Đứng, Ngang, Xiên] (20 câu: Q46 -> Q65).
  - *Bài 4:* Khảo sát sự biến thiên và vẽ đồ thị của hàm số (20 câu: Q66 -> Q85).
  - *Bài 5:* Ứng dụng đạo hàm giải quyết bài toán thực tế STEM (15 câu: Q86 -> Q100).
- **Phân hóa 4 mức độ:** 24 Nhận biết (NB), 31 Thông hiểu (TH), 34 Vận dụng (VD), 11 Vận dụng cao (VDC).
- **23 Bảng biến thiên (BBT) HTML Table:** Render mũi tên và KaTeX sắc nét, chuẩn giao diện.
- **Chuẩn hóa LaTeX:** Ký hiệu vô cực chuẩn xác tuyệt đối `\infty` (không bị lỗi `\in fty`), mọi công thức bọc trong `$...$` hoặc `$$...$$`.
- **Tích hợp sẵn:** Tự động hiển thị trên cổng học sinh `index.html` và có nút bấm *"📚 Nạp Ngân hàng 100 câu Toán 12"* trên `admin.html` để nạp ngay vào Preview và xuất file Word (.docx).
