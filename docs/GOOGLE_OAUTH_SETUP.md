# 🚀 HƯỚNG DẪN CẤU HÌNH GOOGLE OAUTH

## Bước 1: Bật Google OAuth trong Supabase

1. Vào **Supabase Dashboard** → Chọn project của bạn
2. Vào **Authentication** → **Providers**
3. Tìm **Google** và bật nó lên

## Bước 2: Tạo Google OAuth Client

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **APIs & Services** → **Credentials**
4. Click **CREATE CREDENTIALS** → **OAuth client ID**
5. Chọn **Application type**: **Web application**

### Cấu hình Authorized JavaScript origins:
```
http://localhost:5173
https://your-domain.com
```

### Cấu hình Authorized redirect URIs:
```
https://YOUR_SUPABASE_PROJECT_REF.supabase.co/auth/v1/callback
```

**Thay YOUR_SUPABASE_PROJECT_REF bằng project ref của bạn:**
- Ví dụ: `https://bkbqxrnitcmamgjdrupc.supabase.co/auth/v1/callback`

## Bước 3: Copy Client ID và Secret

Sau khi tạo xong, Google sẽ cho bạn:
- **Client ID**: `xxxxx.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxx`

## Bước 4: Điền vào Supabase

1. Quay lại **Supabase Dashboard** → **Authentication** → **Providers** → **Google**
2. Dán:
   - **Client ID** (from Google)
   - **Client Secret** (from Google)
3. Click **Save**

## Bước 5: Test Google Login

1. Khởi động app: `npm run dev`
2. Click button "Đăng nhập bằng Google"
3. Chọn tài khoản Google của bạn
4. Xác nhận quyền truy cập
5. Bạn sẽ được redirect về app và đã đăng nhập!

## ⚠️ Lưu ý quan trọng:

### Production Domain
Khi deploy lên production, nhớ thêm domain thật vào:
- **Google Console** → Authorized JavaScript origins
- **Google Console** → Authorized redirect URIs

### Email Verification
- Google OAuth không cần verify email (đã verify bởi Google)
- User đăng nhập Google sẽ tự động có email verified

### Local Development
- `http://localhost:5173` phải được add vào Authorized JavaScript origins
- Nếu dùng port khác, nhớ update trong Google Console

## 🎉 Hoàn tất!

Bây giờ users có thể:
- ✅ Đăng nhập bằng Google (1 click)
- ✅ Đăng ký/Đăng nhập bằng username + password (đơn giản)
- ✅ Admin đăng nhập bằng email + password (bảo mật)
