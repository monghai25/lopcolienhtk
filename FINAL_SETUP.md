# 🎉 Hướng dẫn cài đặt cuối cùng

## ✅ Đã hoàn thành:
- ✅ Chuyển đổi từ PHP sang Node.js
- ✅ Chuyển đổi từ MySQL sang PostgreSQL
- ✅ Sử dụng Postgres.js (theo hướng dẫn Supabase)
- ✅ Cập nhật tất cả routes sang template literals

## 🚀 Cài đặt và chạy:

### Bước 1: Cài đặt dependencies
```bash
cd Nodejs
npm install
```

### Bước 2: Kiểm tra file .env
File `.env` đã được cấu hình:
```env
DATABASE_URL=postgresql://postgres:Hoagphan@12@db.fxbsvhdyilztynexwffq.supabase.co:5432/postgres
DB_SCHEMA=lopcolien
```

### Bước 3: Import database (nếu chưa)
1. Vào https://supabase.com
2. Chọn project → SQL Editor
3. Copy toàn bộ nội dung file `database/run_all.sql`
4. Paste và chạy

### Bước 4: Chạy ứng dụng
```bash
npm start
```

## ✅ Kiểm tra kết quả

Bạn sẽ thấy log:
```
✅ Database connected successfully
✅ Schema: lopcolien
✅ Users table accessible, count: 48
Server đang chạy tại http://localhost:3000
```

## 🔐 Đăng nhập

- **URL:** http://localhost:3000
- **Username:** `admin`
- **Password:** `admin123`

## 📊 Dữ liệu có sẵn

- **48 users:** 1 admin + 47 học sinh
- **20 emotions:** Dữ liệu cảm xúc mẫu

## 🎯 Tính năng

### Admin:
- ✅ Xem thống kê cảm xúc
- ✅ Lọc theo ngày, tên, cảm xúc
- ✅ Xem ngày chưa nhập
- ✅ Xuất Excel (CSV)
- ✅ Quản lý người dùng

### Client (Học sinh):
- ✅ Ghi nhật ký cảm xúc
- ✅ Xem lịch sử
- ✅ Sửa/xóa cảm xúc
- ✅ Đổi mật khẩu

## 🔧 Syntax mới (Postgres.js)

### Query đơn giản:
```javascript
const users = await sql`SELECT * FROM users WHERE id = ${userId}`;
const user = users[0];
```

### Query với điều kiện động:
```javascript
const users = await sql`
    SELECT * FROM users 
    WHERE del = 0
    ${username ? sql`AND username = ${username}` : sql``}
`;
```

### Insert:
```javascript
await sql`
    INSERT INTO users (username, password, fullname) 
    VALUES (${username}, ${password}, ${fullname})
`;
```

### Update:
```javascript
await sql`
    UPDATE users 
    SET password = ${newPassword} 
    WHERE id = ${userId}
`;
```

## 📝 So sánh với cách cũ

### Cách cũ (pg package):
```javascript
const result = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
);
const user = result.rows[0];
```

### Cách mới (postgres.js):
```javascript
const users = await sql`
    SELECT * FROM users WHERE id = ${userId}
`;
const user = users[0];
```

## 🎨 Ưu điểm Postgres.js

1. ✅ **Syntax đẹp hơn:** Template literals thay vì placeholders
2. ✅ **Tự động escape:** An toàn với SQL injection
3. ✅ **Hiệu suất cao:** Connection pooling tốt
4. ✅ **TypeScript support:** Tốt hơn pg
5. ✅ **Theo chuẩn Supabase:** Dễ tích hợp sau này

## 🔒 Bảo mật

- ✅ Parameterized queries (tự động)
- ✅ Session management
- ✅ Cookie httpOnly
- ✅ SSL connection
- ⚠️ Password chưa hash (nên dùng bcrypt trong production)

## 📚 Tài liệu

- **Postgres.js:** https://github.com/porsager/postgres
- **Supabase:** https://supabase.com/docs
- **Express:** https://expressjs.com

## 🐛 Troubleshooting

### Lỗi: "Cannot find module 'postgres'"
```bash
npm install postgres
```

### Lỗi: "relation does not exist"
Chạy lại file `database/run_all.sql`

### Lỗi: "password authentication failed"
Kiểm tra DATABASE_URL trong `.env`

### Port 3000 đã được sử dụng
Đổi PORT trong `.env`:
```env
PORT=3001
```

## 🎉 Hoàn tất!

Bạn đã có một ứng dụng Node.js hoàn chỉnh với:
- ✅ Backend: Express.js
- ✅ Database: PostgreSQL (Supabase)
- ✅ Template: EJS
- ✅ Giao diện giống 100% bản PHP
- ✅ Tất cả chức năng hoạt động

Chúc bạn thành công! 🚀
