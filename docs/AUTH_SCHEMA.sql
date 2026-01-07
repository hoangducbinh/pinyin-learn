-- ============================================
-- PINYIN LEARN - AUTH & USER PROGRESS SCHEMA
-- ============================================
-- Chạy script này trong Supabase SQL Editor
-- Dashboard → SQL Editor → New Query

-- 1. BẬT RLS (Row Level Security) cho auth.users
-- Supabase tự động tạo table auth.users khi bật Authentication

-- 2. TẠO TABLE USER_PROGRESS
-- Lưu lịch sử học tập của từng user
CREATE TABLE IF NOT EXISTS user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phrase_id BIGINT NOT NULL REFERENCES phrases(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  user_input TEXT,
  attempt_time TIMESTAMPTZ DEFAULT NOW(),
  
  -- Index để query nhanh
  CONSTRAINT unique_attempt UNIQUE (user_id, phrase_id, attempt_time)
);

-- 3. TẠO INDEX cho performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_phrase_id ON user_progress(phrase_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_attempt_time ON user_progress(attempt_time DESC);

-- 4. BẬT RLS cho user_progress
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES cho user_progress
-- User chỉ xem được progress của chính họ
CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- User chỉ insert được progress của chính họ
CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User có thể update progress của chính họ (nếu cần sửa)
CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 6. TẠO TABLE USER_PROFILES (optional - để lưu thêm info)
-- Tự động tạo profile khi user đăng ký
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BẬT RLS cho user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES cho user_profiles
-- User có thể xem profile của chính họ
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- User có thể update profile của chính họ
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Admin có thể xem tất cả profiles (để quản lý)
CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- 7. FUNCTION tự động tạo user_profile khi đăng ký
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, username, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. TRIGGER tự động tạo profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- 9. CẬP NHẬT RLS cho phrases table (cho phép admin edit)
-- Giữ nguyên policy cũ: tất cả đều đọc được
-- Thêm policy mới: chỉ admin mới write được

DROP POLICY IF EXISTS "Admin can insert phrases" ON phrases;
CREATE POLICY "Admin can insert phrases"
  ON phrases
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

DROP POLICY IF EXISTS "Admin can update phrases" ON phrases;
CREATE POLICY "Admin can update phrases"
  ON phrases
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

DROP POLICY IF EXISTS "Admin can delete phrases" ON phrases;
CREATE POLICY "Admin can delete phrases"
  ON phrases
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- 10. TẠO ADMIN USER ĐẦU TIÊN (thay email của bạn)
-- Sau khi đăng ký xong, chạy query này để set làm admin:
-- UPDATE user_profiles SET is_admin = TRUE WHERE email = 'your-email@example.com';

-- Hoặc tạo sẵn tài khoản admin/admin:
-- Chạy script này RIÊNG sau khi setup xong authentication:
/*
-- TẠO TÀI KHOẢN ADMIN/ADMIN
-- Lưu ý: Script này cần chạy qua Supabase Dashboard hoặc REST API
-- vì Supabase Auth không cho phép insert trực tiếp vào auth.users từ SQL

Sau khi chạy xong AUTH_SCHEMA.sql này, hãy:
1. Mở app và đăng ký tài khoản với username: admin, password: admin
2. Sau đó chạy query này để set làm admin:

UPDATE user_profiles 
SET is_admin = TRUE 
WHERE username = 'admin';

-- Hoặc nếu bạn đã có tài khoản rồi:
UPDATE user_profiles 
SET is_admin = TRUE 
WHERE username = 'YOUR_USERNAME';
*/

-- ============================================
-- DONE! Bây giờ bạn có:
-- ✅ Authentication system
-- ✅ User progress tracking
-- ✅ Admin role system
-- ✅ Row Level Security
-- ============================================
