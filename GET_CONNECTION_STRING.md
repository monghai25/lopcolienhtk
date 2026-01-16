# 🔑 Lấy Connection String từ Supabase

## Bước 1: Vào Supabase Dashboard

1. Truy cập: https://supabase.com/dashboard
2. Chọn project của bạn
3. Click **Settings** (⚙️) ở sidebar trái
4. Click **Database**

## Bước 2: Lấy Connection Pooling String

1. Scroll xuống phần **Connection string**
2. Chọn tab **Connection pooling** (QUAN TRỌNG!)
3. Chọn mode **Transaction**
4. Copy connection string

Nó sẽ có dạng:
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

## Bước 3: Paste vào .env

Mở file `Nodejs/.env` và thay thế `DATABASE_URL`:

```env
DATABASE_URL=<paste_connection_string_ở_đây>
```

**Lưu ý:** Nếu password có ký tự đặc biệt, encode nó:
- `@` → `%40`
- `#` → `%23`
- Etc.

## Bước 4: Test

```bash
cd Nodejs
node test-connection.js
```

## 📸 Hình minh họa vị trí:

```
Supabase Dashboard
└── Settings
    └── Database
        └── Connection string
            └── [URI] [Connection pooling] ← Click đây!
                └── Mode: [Session] [Transaction] ← Chọn Transaction
                    └── Connection string: postgresql://... ← Copy cái này
```

## ⚠️ Quan trọng:

- **KHÔNG dùng** tab "URI" (direct connection)
- **PHẢI dùng** tab "Connection pooling"
- **PHẢI chọn** mode "Transaction"

## 🎯 Sau khi có connection string đúng:

1. Paste vào `.env`
2. Chạy `node test-connection.js`
3. Nếu thấy ✅ → Chạy `npm start`
4. Truy cập http://localhost:3000
5. Login: admin/admin123

---

**Hãy lấy connection string từ Supabase và gửi cho tôi (che password), tôi sẽ giúp format đúng!**
