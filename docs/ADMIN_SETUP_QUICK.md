# ⚡ HƯỚNG DẪN SETUP ADMIN NHANH

## Bước 1: Setup Database
```sql
-- Chạy AUTH_SCHEMA.sql trong Supabase SQL Editor
-- File này tạo tất cả tables và RLS policies
```

## Bước 2: Tạo tài khoản admin
1. Mở app: `npm run dev`
2. Click "Đăng nhập" → "Đăng ký"
3. Tạo tài khoản với:
   - **Username**: `admin`
   - **Password**: `admin`

## Bước 3: Set quyền admin
Vào **Supabase Dashboard** → **SQL Editor**, chạy:

```sql
UPDATE user_profiles 
SET is_admin = TRUE 
WHERE username = 'admin';
```

## 🎉 Xong!

Bây giờ:
- Login với `admin/admin` → Vào được `/admin`
- User thường đăng nhập bằng username/password hoặc Google
- Tất cả dùng chung 1 form đăng nhập đơn giản

## Tạo thêm admin khác:
```sql
-- Set bất kỳ user nào làm admin
UPDATE user_profiles 
SET is_admin = TRUE 
WHERE username = 'TEN_USER_KHAC';
```
