# 🔧 Khắc phục lỗi DNS (ENOTFOUND)

## Lỗi: `getaddrinfo ENOTFOUND db.fxbsvhdyilztynexwffq.supabase.co`

Lỗi này nghĩa là máy tính không thể tìm thấy địa chỉ IP của Supabase server.

## ✅ Giải pháp theo thứ tự:

### 1. Test DNS (Quan trọng!)
```bash
cd Nodejs
node test-dns.js
```

Nếu DNS failed → Vấn đề mạng
Nếu DNS success → Vấn đề password hoặc firewall

### 2. Kiểm tra kết nối internet
```bash
# Windows
ping db.fxbsvhdyilztynexwffq.supabase.co

# Hoặc ping Google
ping 8.8.8.8
```

### 3. Thử các connection string khác

File `.env` đã được cập nhật với password encoded (`@` → `%40`).

**Nếu vẫn lỗi, thử các cách sau:**

#### Cách A: Connection Pooler (port 6543)
```env
DATABASE_URL=postgresql://postgres:Hoagphan%4012@db.fxbsvhdyilztynexwffq.supabase.co:6543/postgres
```

#### Cách B: Thêm sslmode
```env
DATABASE_URL=postgresql://postgres:Hoagphan%4012@db.fxbsvhdyilztynexwffq.supabase.co:5432/postgres?sslmode=require
```

#### Cách C: IPv4 pooler
```env
DATABASE_URL=postgresql://postgres.fxbsvhdyilztynexwffq:Hoagphan%4012@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

### 4. Đổi DNS Server (Windows)

1. Mở **Control Panel** → **Network and Internet** → **Network Connections**
2. Right-click vào connection đang dùng → **Properties**
3. Chọn **Internet Protocol Version 4 (TCP/IPv4)** → **Properties**
4. Chọn **Use the following DNS server addresses:**
   - Preferred DNS: `8.8.8.8` (Google)
   - Alternate DNS: `8.8.4.4` (Google)
5. Click **OK**

### 5. Tắt VPN/Proxy tạm thời

Nếu đang dùng VPN hoặc Proxy, thử tắt đi.

### 6. Thử mạng khác

- Thử kết nối qua mobile hotspot
- Thử mạng WiFi khác

### 7. Kiểm tra Firewall

**Windows Firewall:**
1. Mở **Windows Defender Firewall**
2. Click **Allow an app through firewall**
3. Tìm **Node.js** và cho phép cả Private và Public

### 8. Flush DNS Cache

```bash
# Windows
ipconfig /flushdns

# Sau đó restart máy
```

## 🔍 Debug Steps:

### Bước 1: Test DNS
```bash
node test-dns.js
```

### Bước 2: Test với curl (nếu có)
```bash
curl https://fxbsvhdyilztynexwffq.supabase.co
```

### Bước 3: Test connection
```bash
node test-connection.js
```

## 📝 Lấy Connection String từ Supabase

1. Vào https://supabase.com/dashboard
2. Chọn project → **Settings** → **Database**
3. Scroll xuống **Connection string**
4. Chọn tab **URI** hoặc **Connection pooling**
5. Copy connection string
6. Paste vào `.env` (nhớ encode password nếu có ký tự đặc biệt)

## 🎯 Password Encoding

Nếu password có ký tự đặc biệt, cần encode:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `,` → `%2C`
- `/` → `%2F`
- `:` → `%3A`
- `;` → `%3B`
- `=` → `%3D`
- `?` → `%3F`
- `[` → `%5B`
- `]` → `%5D`

**Ví dụ:**
- Password: `Hoagphan@12` → `Hoagphan%4012`
- Password: `Pass#123` → `Pass%23123`

## ✅ Sau khi sửa:

```bash
npm start
```

## 🆘 Nếu vẫn không được:

Có thể mạng của bạn chặn kết nối đến Supabase. Thử:
1. Dùng mobile hotspot
2. Dùng VPN (hoặc tắt VPN nếu đang bật)
3. Liên hệ IT/Network admin nếu ở công ty/trường học
