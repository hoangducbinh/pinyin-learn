# Hướng dẫn Setup Supabase

## Bước 1: Tạo Supabase Project

1. Truy cập https://supabase.com
2. Đăng ký/Đăng nhập (miễn phí)
3. Click "New Project"
4. Điền thông tin:
   - Name: `pinyin-learn`
   - Database Password: tạo password mạnh
   - Region: chọn gần Việt Nam nhất (Singapore)
5. Click "Create new project" (chờ ~2 phút)

## Bước 2: Tạo Table

1. Vào tab "SQL Editor"
2. Copy và chạy SQL này:

```sql
-- Tạo table phrases
CREATE TABLE phrases (
  id BIGSERIAL PRIMARY KEY,
  vietnamese TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  chinese TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người đọc (public read)
CREATE POLICY "Allow public read access" ON phrases
  FOR SELECT USING (true);

-- Chỉ admin mới thêm/sửa/xóa (sẽ setup sau)
CREATE POLICY "Allow authenticated insert" ON phrases
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON phrases
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON phrases
  FOR DELETE USING (true);
```

## Bước 3: Import dữ liệu ban đầu

Vào "Table Editor" → table "phrases" → Click "Insert row" hoặc chạy SQL:

```sql
INSERT INTO phrases (vietnamese, pinyin, chinese, category, difficulty) VALUES
('Xin chào', 'nǐ hǎo', '你好', 'Chào hỏi', 'easy'),
('Cảm ơn', 'xiè xiè', '谢谢', 'Chào hỏi', 'easy'),
('Tạm biệt', 'zài jiàn', '再见', 'Chào hỏi', 'easy'),
('Xin lỗi', 'duì bù qǐ', '对不起', 'Chào hỏi', 'easy'),
('Không sao', 'méi guān xì', '没关系', 'Chào hỏi', 'easy'),
('Tôi là người Việt Nam', 'wǒ shì yuè nán rén', '我是越南人', 'Giới thiệu', 'medium'),
('Bạn tên gì?', 'nǐ jiào shén me míng zi', '你叫什么名字', 'Giới thiệu', 'medium'),
('Rất vui được gặp bạn', 'hěn gāo xìng rèn shi nǐ', '很高兴认识你', 'Giới thiệu', 'medium'),
('Nhà vệ sinh ở đâu?', 'cè suǒ zài nǎ lǐ', '厕所在哪里', 'Hỏi đường', 'medium'),
('Tôi không hiểu', 'wǒ bù dǒng', '我不懂', 'Giao tiếp', 'easy'),
('Cái này bao nhiêu tiền?', 'zhè gè duō shao qián', '这个多少钱', 'Mua sắm', 'medium'),
('Tôi muốn uống nước', 'wǒ xiǎng hē shuǐ', '我想喝水', 'Ăn uống', 'easy'),
('Ngon quá!', 'hǎo chī', '好吃', 'Ăn uống', 'easy'),
('Bây giờ là mấy giờ?', 'xiàn zài jǐ diǎn', '现在几点', 'Thời gian', 'medium'),
('Hôm nay thứ mấy?', 'jīn tiān xīng qī jǐ', '今天星期几', 'Thời gian', 'medium'),
('Tôi yêu bạn', 'wǒ ài nǐ', '我爱你', 'Cảm xúc', 'easy'),
('Tôi rất vui', 'wǒ hěn kāi xīn', '我很开心', 'Cảm xúc', 'easy'),
('Tôi mệt quá', 'wǒ hěn lèi', '我很累', 'Cảm xúc', 'easy');
```

## Bước 4: Lấy API Keys

1. Vào "Settings" → "API"
2. Copy 2 thông tin:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (key dài)

## Bước 5: Config trong project

1. Tạo file `.env` trong thư mục root:

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your_key_here
```

2. Restart dev server:

```bash
npm run dev
```

## Bước 6: Test

1. Mở http://localhost:5173/ - kiểm tra data load từ Supabase
2. Mở http://localhost:5173/admin - quản lý dữ liệu

## Bước 7: Deploy (optional)

Khi deploy lên Vercel/Netlify, nhớ thêm Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 🎉 Xong!

Giờ bạn có thể:
- ✅ Update data từ Supabase dashboard
- ✅ Hoặc dùng Admin UI tại /admin
- ✅ Import/Export CSV
- ✅ User tự động nhận data mới khi refresh

## 📚 Quản lý dữ liệu

### Cách 1: Supabase Dashboard
- Vào https://supabase.com/dashboard
- Chọn project → Table Editor → phrases
- Thêm/sửa/xóa trực tiếp

### Cách 2: Admin UI
- Mở http://localhost:5173/admin
- Giao diện đẹp hơn, dễ dùng hơn
- Import CSV hàng loạt

### Cách 3: Excel → CSV → Import
1. Tạo Excel với columns: Vietnamese, Pinyin, Chinese, Category, Difficulty
2. Save as CSV
3. Import vào Admin UI

## Troubleshooting

### Lỗi: "Failed to fetch"
- Kiểm tra .env có đúng keys không
- Restart dev server sau khi tạo .env

### Lỗi: "Row Level Security"
- Chạy lại SQL policies ở Bước 2

### Data không hiện
- Check Network tab trong DevTools
- Xem console có error gì không
