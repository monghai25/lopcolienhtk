# 🔍 Kiểm tra lỗi

## Bước 1: Chạy test connection

```bash
cd Nodejs
node test-connection.js
```

Test này sẽ kiểm tra:
- ✅ Kết nối database
- ✅ Schema lopcolien
- ✅ Bảng users
- ✅ Admin user
- ✅ Bảng emotions

## Bước 2: Xem kết quả

### Nếu thành công:
```
=== ALL TESTS PASSED ✅ ===
You can now run: npm start
```

### Nếu lỗi:
Sẽ hiển thị lỗi cụ thể và hướng dẫn sửa

## Bước 3: Chạy server với log chi tiết

```bash
npm start
```

Xem log trong terminal khi đăng nhập để biết lỗi cụ thể.

## 🐛 Các lỗi thường gặp:

### 1. "relation does not exist"
**Nguyên nhân:** Chưa import database

**Giải pháp:**
- Vào Supabase SQL Editor
- Chạy file `database/run_all.sql`

### 2. "password authentication failed"
**Nguyên nhân:** Sai password trong DATABASE_URL

**Giải pháp:**
- Kiểm tra lại password trong `.env`
- Reset password trong Supabase nếu cần

### 3. "schema lopcolien does not exist"
**Nguyên nhân:** Schema chưa được tạo

**Giải pháp:**
- Chạy: `CREATE SCHEMA IF NOT EXISTS lopcolien;`
- Hoặc chạy lại `database/run_all.sql`

### 4. "Cannot find module 'postgres'"
**Nguyên nhân:** Chưa cài package

**Giải pháp:**
```bash
npm install postgres
```

## 📝 Copy log và gửi cho tôi

Nếu vẫn lỗi, copy toàn bộ log từ terminal và gửi cho tôi để debug!
