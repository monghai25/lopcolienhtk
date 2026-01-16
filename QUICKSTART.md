# 🚀 Hướng dẫn chạy nhanh (5 phút)

## Bước 1: Cài đặt Node.js
Tải từ: https://nodejs.org/ (chọn LTS)

## Bước 2: Cài đặt dependencies
```bash
cd Nodejs
npm install
```

## Bước 3: Cấu hình Database
Mở file `.env` và thêm mật khẩu Supabase:
```env
DB_PASSWORD=your_password_here
```

## Bước 4: Import Database

### Cách 1: Supabase SQL Editor (KHUYẾN NGHỊ)
1. Vào https://supabase.com
2. Chọn project → SQL Editor
3. Copy toàn bộ nội dung file `database/run_all.sql`
4. Paste và chạy
5. Đợi ~10 giây

### Cách 2: Command line
```bash
psql -h db.fxbsvhdyilztynexwffq.supabase.co -U postgres -d postgres -f database/run_all.sql
```

## Bước 5: Chạy ứng dụng
```bash
npm start
```

## Bước 6: Truy cập
Mở trình duyệt: http://localhost:3000

**Đăng nhập:**
- Username: `admin`
- Password: `admin123`

## ✅ Xong!

Bạn đã có:
- ✅ 48 users (1 admin + 47 học sinh)
- ✅ 20 bản ghi cảm xúc mẫu
- ✅ Hệ thống hoàn chỉnh

## 🔧 Troubleshooting

### Lỗi kết nối database?
- Kiểm tra mật khẩu trong `.env`
- Kiểm tra kết nối internet

### Port 3000 đã được sử dụng?
Đổi PORT trong `.env`:
```env
PORT=3001
```

### Không thấy dữ liệu?
Chạy lại file `database/run_all.sql`

## 📚 Tài liệu chi tiết
- `README.md` - Tài liệu đầy đủ
- `INSTALL.md` - Hướng dẫn cài đặt chi tiết
- `database/README.md` - Hướng dẫn database
