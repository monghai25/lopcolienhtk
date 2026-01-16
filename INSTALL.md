# Hướng dẫn cài đặt nhanh

## Bước 1: Cài đặt Node.js

Tải và cài đặt Node.js từ: https://nodejs.org/ (phiên bản LTS)

## Bước 2: Cài đặt dependencies

```bash
cd Nodejs
npm install
```

## Bước 3: Cấu hình Database

### 3.1. Cập nhật file .env

Mở file `.env` và điền mật khẩu database:

```env
DB_PASSWORD=your_supabase_password_here
```

### 3.2. Tạo Schema và Tables

**Cách 1: Sử dụng Supabase SQL Editor**

1. Đăng nhập vào Supabase: https://supabase.com
2. Chọn project của bạn
3. Vào SQL Editor
4. Copy toàn bộ nội dung file `database/schema.sql`
5. Paste vào SQL Editor và chạy

**Cách 2: Sử dụng psql command line**

```bash
psql -h db.fxbsvhdyilztynexwffq.supabase.co -U postgres -d postgres -f database/schema.sql
```

## Bước 4: Chạy ứng dụng

```bash
# Development mode (tự động restart khi có thay đổi)
npm run dev

# Hoặc Production mode
npm start
```

## Bước 5: Truy cập ứng dụng

Mở trình duyệt và truy cập: http://localhost:3000

**Tài khoản admin mặc định:**
- Username: `admin`
- Password: `admin123`

## Kiểm tra kết nối Database

Khi chạy `npm start`, bạn sẽ thấy:
```
Server đang chạy tại http://localhost:3000
Database connected successfully
```

Nếu thấy lỗi kết nối database, kiểm tra lại:
1. Thông tin trong file `.env`
2. Mật khẩu database
3. Kết nối internet (Supabase yêu cầu internet)

## Dữ liệu mẫu đã có sẵn

File `database/run_all.sql` đã bao gồm:
- **48 users**: 1 admin + 47 học sinh
- **20 emotions**: Dữ liệu cảm xúc mẫu từ tháng 2-3/2025

Tất cả dữ liệu đã được chuyển đổi từ MySQL sang PostgreSQL.

## Troubleshooting

### Lỗi: "Cannot find module"
```bash
npm install
```

### Lỗi: "Port 3000 already in use"
Thay đổi PORT trong file `.env`:
```env
PORT=3001
```

### Lỗi kết nối database
- Kiểm tra thông tin DB_HOST, DB_USER, DB_PASSWORD
- Đảm bảo có kết nối internet
- Kiểm tra Supabase project có đang hoạt động

### Lỗi: "relation does not exist"
Chạy lại file `database/schema.sql` để tạo tables

## Cấu trúc Database

### Table: users
- id (SERIAL PRIMARY KEY)
- username (VARCHAR UNIQUE)
- password (VARCHAR)
- role (VARCHAR: 'admin' hoặc 'client')
- fullname (VARCHAR)
- del (INTEGER: 0 = active, 1 = deleted)

### Table: emotions
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER FOREIGN KEY)
- emotion (VARCHAR: 'Vui vẻ', 'Buồn chán', 'Hoang mang', 'Tức giận', 'Bình thường')
- date (DATE)
- content (TEXT)
- situation (TEXT)
- reaction (TEXT)
- result (TEXT)
- del (INTEGER: 0 = active, 1 = deleted)
- created_at (TIMESTAMP)

## Thêm người dùng mới

1. Đăng nhập với tài khoản admin
2. Vào "Quản lý người dùng"
3. Điền thông tin và click "Thêm mới"

## Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Console log trong terminal
2. Browser console (F12)
3. File log của ứng dụng
