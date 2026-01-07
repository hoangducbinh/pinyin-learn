-- ============================================
-- FIX INFINITE RECURSION IN RLS POLICIES
-- ============================================
-- Chạy script này trong Supabase SQL Editor để fix lỗi

-- 1. TẠO FUNCTION HELPER để check admin (SECURITY DEFINER bypass RLS)
CREATE OR REPLACE FUNCTION is_admin_user(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  admin_status BOOLEAN;
BEGIN
  SELECT is_admin INTO admin_status
  FROM user_profiles
  WHERE id = user_id;
  
  RETURN COALESCE(admin_status, FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. XÓA CÁC POLICY CŨ CÓ INFINITE RECURSION
DROP POLICY IF EXISTS "Admin can insert phrases" ON phrases;
DROP POLICY IF EXISTS "Admin can update phrases" ON phrases;
DROP POLICY IF EXISTS "Admin can delete phrases" ON phrases;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- 3. TẠO LẠI POLICIES CHO PHRASES (dùng function helper)
CREATE POLICY "Admin can insert phrases"
  ON phrases
  FOR INSERT
  WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admin can update phrases"
  ON phrases
  FOR UPDATE
  USING (is_admin_user(auth.uid()));

CREATE POLICY "Admin can delete phrases"
  ON phrases
  FOR DELETE
  USING (is_admin_user(auth.uid()));

-- 4. TẠO LẠI POLICY CHO USER_PROFILES (dùng function helper)
CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  USING (is_admin_user(auth.uid()));

-- 5. TẠM THỜI: DISABLE RLS để dev dễ dàng
-- Uncomment dòng dưới nếu muốn tắt RLS hoàn toàn (không khuyến nghị production)
-- ALTER TABLE phrases DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;

-- ============================================
-- HOẶC: GIẢI PHÁP ĐƠN GIẢN HƠN CHO DEV
-- ============================================
-- Nếu đang dev và chưa quan tâm auth, tắt RLS luôn:

ALTER TABLE phrases DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;

-- Khi deploy production, nhớ bật lại:
-- ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DONE! Bây giờ có thể:
-- ✅ Thêm/sửa/xóa phrases không bị lỗi
-- ✅ Không cần đăng nhập khi dev
-- ✅ Khi production chỉ cần bật lại RLS
-- ============================================
