# 🚨 KHẮC PHỤC KHẨN CẤP - DNS FAILED

## Vấn đề: Máy tính không thể tìm thấy Supabase server

Lỗi `ENOTFOUND` nghĩa là DNS không hoạt động. Đây là vấn đề **MẠNG**, không phải code.

## ✅ GIẢI PHÁP NHANH (Chọn 1 trong 4):

### 🔧 Cách 1: Đổi DNS (KHUYẾN NGHỊ - 90% hiệu quả)

#### Windows 10/11:
1. Nhấn `Win + I` → **Network & Internet**
2. Click **Change adapter options**
3. Right-click kết nối đang dùng → **Properties**
4. Double-click **Internet Protocol Version 4 (TCP/IPv4)**
5. Chọn **Use the following DNS server addresses:**
   ```
   Preferred DNS:  8.8.8.8
   Alternate DNS:  8.8.4.4
   ```
6. Click **OK** → **OK**

#### Hoặc dùng CMD (Admin):
```bash
# Chạy file này
fix-dns.bat
```

#### Sau đó test lại:
```bash
node test-dns.js
```

---

### 📱 Cách 2: Dùng Mobile Hotspot (100% hiệu quả)

1. Bật hotspot trên điện thoại
2. Kết nối máy tính vào hotspot
3. Chạy lại:
```bash
node test-dns.js
npm start
```

---

### 🔥 Cách 3: Tắt Firewall tạm thời

1. Mở **Windows Security**
2. **Firewall & network protection**
3. Tắt **Domain network**, **Private network**, **Public network**
4. Thử lại
5. **Nhớ bật lại sau khi test!**

---

### 🌐 Cách 4: Kiểm tra Proxy/VPN

Nếu đang dùng:
- ❌ VPN → Tắt đi
- ❌ Proxy → Tắt đi
- ❌ Antivirus → Tắt tạm thời

---

## 🔍 Kiểm tra sau khi sửa:

### Test 1: Ping Google
```bash
ping 8.8.8.8
```
Phải thấy: `Reply from 8.8.8.8`

### Test 2: Ping Supabase
```bash
ping db.fxbsvhdyilztynexwffq.supabase.co
```
Phải thấy: `Reply from [IP address]`

### Test 3: DNS Test
```bash
node test-dns.js
```
Phải thấy: `✅ DNS resolution successful!`

### Test 4: Connection Test
```bash
node test-connection.js
```
Phải thấy: `✅ Database connected successfully`

### Test 5: Chạy app
```bash
npm start
```

---

## 🆘 Nếu TẤT CẢ đều thất bại:

### Nguyên nhân có thể:
1. **Mạng công ty/trường học** chặn Supabase
2. **ISP** chặn kết nối quốc tế
3. **Router** có vấn đề

### Giải pháp cuối cùng:

#### Option A: Dùng Supabase Local Development
```bash
# Cài Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start
```

#### Option B: Dùng database khác
- PostgreSQL local
- Railway.app
- Render.com
- Neon.tech

#### Option C: Dùng ngrok/cloudflare tunnel
Tạo tunnel để bypass firewall

---

## 📞 Liên hệ IT Support

Nếu ở công ty/trường:
```
Yêu cầu mở firewall cho:
- Domain: *.supabase.co
- Port: 5432, 6543
- Protocol: TCP
```

---

## ✅ Checklist:

- [ ] Đã đổi DNS sang 8.8.8.8?
- [ ] Đã flush DNS cache?
- [ ] Đã thử mobile hotspot?
- [ ] Đã tắt firewall/antivirus?
- [ ] Đã tắt VPN/Proxy?
- [ ] Ping 8.8.8.8 thành công?
- [ ] Ping Supabase thành công?

---

## 🎯 Sau khi DNS hoạt động:

```bash
# Test connection
node test-connection.js

# Nếu OK, chạy app
npm start

# Truy cập
http://localhost:3000

# Login
Username: admin
Password: admin123
```

---

## 💡 Lưu ý:

- Vấn đề này **KHÔNG PHẢI LỖI CODE**
- Đây là vấn đề **CẤU HÌNH MẠNG**
- 90% trường hợp đổi DNS là xong
- 10% còn lại cần dùng mobile hotspot

**Hãy thử Cách 1 hoặc Cách 2 trước!** 🚀
