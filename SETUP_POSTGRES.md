# 🚀 Setup với Postgres.js

## Bước 1: Cài đặt package mới

```bash
cd Nodejs
npm install postgres
npm uninstall pg  # Xóa package cũ
```

## Bước 2: File .env đã được cập nhật

```env
DATABASE_URL=postgresql://postgres:Hoagphan@12@db.fxbsvhdyilztynexwffq.supabase.co:5432/postgres
DB_SCHEMA=lopcolien
```

## Bước 3: Import database (nếu chưa)

Chạy file `database/run_all.sql` trong Supabase SQL Editor

## Bước 4: Chạy ứng dụng

```bash
npm start
```

## ✅ Kiểm tra

Bạn sẽ thấy:
```
✅ Database connected successfully
✅ Schema: lopcolien
✅ Users table accessible, count: 48
Server đang chạy tại http://localhost:3000
```

## 🔐 Đăng nhập

- URL: http://localhost:3000
- Username: `admin`
- Password: `admin123`

## 📝 Lưu ý

Postgres.js có syntax khác với pg:

**Cũ (pg):**
```javascript
const result = await db('SELECT * FROM users WHERE id = $1', [userId]);
const user = result.rows[0];
```

**Mới (postgres.js):**
```javascript
const users = await sql`SELECT * FROM users WHERE id = ${userId}`;
const user = users[0];
```

## 🔧 Nếu gặp lỗi

1. Xóa node_modules và cài lại:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Kiểm tra DATABASE_URL trong .env
3. Kiểm tra đã import database chưa
