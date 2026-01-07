export interface Vocabulary {
  id: number;
  vietnamese: string;
  pinyin: string;
  chinese: string;
  category: string;
  hskLevel: 'HSK1' | 'HSK2';
  partOfSpeech: string; // danh từ, động từ, tính từ, v.v.
}

export const vocabulary: Vocabulary[] = [
  // HSK1 - Đại từ nhân xưng
  { id: 1, vietnamese: 'Tôi', pinyin: 'wǒ', chinese: '我', category: 'Đại từ', hskLevel: 'HSK1', partOfSpeech: 'Đại từ' },
  { id: 2, vietnamese: 'Bạn', pinyin: 'nǐ', chinese: '你', category: 'Đại từ', hskLevel: 'HSK1', partOfSpeech: 'Đại từ' },
  { id: 3, vietnamese: 'Anh ấy', pinyin: 'tā', chinese: '他', category: 'Đại từ', hskLevel: 'HSK1', partOfSpeech: 'Đại từ' },
  { id: 4, vietnamese: 'Chúng tôi', pinyin: 'wǒ men', chinese: '我们', category: 'Đại từ', hskLevel: 'HSK1', partOfSpeech: 'Đại từ' },
  { id: 5, vietnamese: 'Các bạn', pinyin: 'nǐ men', chinese: '你们', category: 'Đại từ', hskLevel: 'HSK1', partOfSpeech: 'Đại từ' },
  { id: 6, vietnamese: 'Họ', pinyin: 'tā men', chinese: '他们', category: 'Đại từ', hskLevel: 'HSK1', partOfSpeech: 'Đại từ' },

  // HSK1 - Động từ cơ bản
  { id: 7, vietnamese: 'Là', pinyin: 'shì', chinese: '是', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 8, vietnamese: 'Có', pinyin: 'yǒu', chinese: '有', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 9, vietnamese: 'Nhìn, xem', pinyin: 'kàn', chinese: '看', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 10, vietnamese: 'Nghe', pinyin: 'tīng', chinese: '听', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 11, vietnamese: 'Nói', pinyin: 'shuō', chinese: '说', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 12, vietnamese: 'Đọc', pinyin: 'dú', chinese: '读', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 13, vietnamese: 'Viết', pinyin: 'xiě', chinese: '写', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 14, vietnamese: 'Ăn', pinyin: 'chī', chinese: '吃', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 15, vietnamese: 'Uống', pinyin: 'hē', chinese: '喝', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 16, vietnamese: 'Mua', pinyin: 'mǎi', chinese: '买', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 17, vietnamese: 'Yêu, thích', pinyin: 'ài', chinese: '爱', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 18, vietnamese: 'Làm', pinyin: 'zuò', chinese: '做', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 19, vietnamese: 'Đi', pinyin: 'qù', chinese: '去', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 20, vietnamese: 'Đến', pinyin: 'lái', chinese: '来', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 21, vietnamese: 'Gặp', pinyin: 'jiàn', chinese: '见', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 22, vietnamese: 'Gọi (tên)', pinyin: 'jiào', chinese: '叫', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 23, vietnamese: 'Ngồi', pinyin: 'zuò', chinese: '坐', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 24, vietnamese: 'Học', pinyin: 'xué', chinese: '学', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },
  { id: 25, vietnamese: 'Muốn', pinyin: 'xiǎng', chinese: '想', category: 'Động từ', hskLevel: 'HSK1', partOfSpeech: 'Động từ' },

  // HSK1 - Danh từ
  { id: 26, vietnamese: 'Người', pinyin: 'rén', chinese: '人', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 27, vietnamese: 'Tên', pinyin: 'míng zi', chinese: '名字', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 28, vietnamese: 'Bạn (bè)', pinyin: 'péng you', chinese: '朋友', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 29, vietnamese: 'Con gái', pinyin: 'nǚ ér', chinese: '女儿', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 30, vietnamese: 'Con trai', pinyin: 'ér zi', chinese: '儿子', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 31, vietnamese: 'Giáo viên', pinyin: 'lǎo shī', chinese: '老师', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 32, vietnamese: 'Học sinh', pinyin: 'xué shēng', chinese: '学生', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 33, vietnamese: 'Bác sĩ', pinyin: 'yī shēng', chinese: '医生', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 34, vietnamese: 'Nước', pinyin: 'shuǐ', chinese: '水', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 35, vietnamese: 'Cơm', pinyin: 'mǐ fàn', chinese: '米饭', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 36, vietnamese: 'Sách', pinyin: 'shū', chinese: '书', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 37, vietnamese: 'Tiền', pinyin: 'qián', chinese: '钱', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 38, vietnamese: 'Nhà', pinyin: 'jiā', chinese: '家', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 39, vietnamese: 'Trường học', pinyin: 'xué xiào', chinese: '学校', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 40, vietnamese: 'Quán ăn', pinyin: 'fàn diàn', chinese: '饭店', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 41, vietnamese: 'Công ty', pinyin: 'gōng sī', chinese: '公司', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 42, vietnamese: 'Bệnh viện', pinyin: 'yī yuàn', chinese: '医院', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 43, vietnamese: 'Mèo', pinyin: 'māo', chinese: '猫', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 44, vietnamese: 'Chó', pinyin: 'gǒu', chinese: '狗', category: 'Danh từ', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },

  // HSK1 - Tính từ
  { id: 45, vietnamese: 'Tốt', pinyin: 'hǎo', chinese: '好', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 46, vietnamese: 'Lớn', pinyin: 'dà', chinese: '大', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 47, vietnamese: 'Nhỏ', pinyin: 'xiǎo', chinese: '小', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 48, vietnamese: 'Nhiều', pinyin: 'duō', chinese: '多', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 49, vietnamese: 'Ít', pinyin: 'shǎo', chinese: '少', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 50, vietnamese: 'Nóng', pinyin: 'rè', chinese: '热', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 51, vietnamese: 'Lạnh', pinyin: 'lěng', chinese: '冷', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 52, vietnamese: 'Cao', pinyin: 'gāo', chinese: '高', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },
  { id: 53, vietnamese: 'Vui', pinyin: 'gāo xìng', chinese: '高兴', category: 'Tính từ', hskLevel: 'HSK1', partOfSpeech: 'Tính từ' },

  // HSK1 - Số đếm
  { id: 54, vietnamese: 'Một', pinyin: 'yī', chinese: '一', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 55, vietnamese: 'Hai', pinyin: 'èr', chinese: '二', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 56, vietnamese: 'Ba', pinyin: 'sān', chinese: '三', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 57, vietnamese: 'Bốn', pinyin: 'sì', chinese: '四', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 58, vietnamese: 'Năm', pinyin: 'wǔ', chinese: '五', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 59, vietnamese: 'Sáu', pinyin: 'liù', chinese: '六', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 60, vietnamese: 'Bảy', pinyin: 'qī', chinese: '七', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 61, vietnamese: 'Tám', pinyin: 'bā', chinese: '八', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 62, vietnamese: 'Chín', pinyin: 'jiǔ', chinese: '九', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },
  { id: 63, vietnamese: 'Mười', pinyin: 'shí', chinese: '十', category: 'Số đếm', hskLevel: 'HSK1', partOfSpeech: 'Số từ' },

  // HSK1 - Thời gian
  { id: 64, vietnamese: 'Hôm nay', pinyin: 'jīn tiān', chinese: '今天', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 65, vietnamese: 'Ngày mai', pinyin: 'míng tiān', chinese: '明天', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 66, vietnamese: 'Hôm qua', pinyin: 'zuó tiān', chinese: '昨天', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 67, vietnamese: 'Năm', pinyin: 'nián', chinese: '年', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 68, vietnamese: 'Tháng', pinyin: 'yuè', chinese: '月', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 69, vietnamese: 'Ngày', pinyin: 'rì', chinese: '日', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 70, vietnamese: 'Giờ (điểm)', pinyin: 'diǎn', chinese: '点', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },
  { id: 71, vietnamese: 'Bây giờ', pinyin: 'xiàn zài', chinese: '现在', category: 'Thời gian', hskLevel: 'HSK1', partOfSpeech: 'Danh từ' },

  // HSK1 - Phó từ
  { id: 72, vietnamese: 'Rất', pinyin: 'hěn', chinese: '很', category: 'Phó từ', hskLevel: 'HSK1', partOfSpeech: 'Phó từ' },
  { id: 73, vietnamese: 'Không', pinyin: 'bù', chinese: '不', category: 'Phó từ', hskLevel: 'HSK1', partOfSpeech: 'Phó từ' },
  { id: 74, vietnamese: 'Cũng', pinyin: 'yě', chinese: '也', category: 'Phó từ', hskLevel: 'HSK1', partOfSpeech: 'Phó từ' },
  { id: 75, vietnamese: 'Đều', pinyin: 'dōu', chinese: '都', category: 'Phó từ', hskLevel: 'HSK1', partOfSpeech: 'Phó từ' },

  // HSK2 - Động từ
  { id: 76, vietnamese: 'Chơi', pinyin: 'wán', chinese: '玩', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 77, vietnamese: 'Tìm', pinyin: 'zhǎo', chinese: '找', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 78, vietnamese: 'Biết', pinyin: 'zhī dào', chinese: '知道', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 79, vietnamese: 'Nghĩ', pinyin: 'juè de', chinese: '觉得', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 80, vietnamese: 'Bắt đầu', pinyin: 'kāi shǐ', chinese: '开始', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 81, vietnamese: 'Giúp đỡ', pinyin: 'bāng zhù', chinese: '帮助', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 82, vietnamese: 'Hiểu', pinyin: 'dǒng', chinese: '懂', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 83, vietnamese: 'Sống', pinyin: 'zhù', chinese: '住', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 84, vietnamese: 'Nhớ', pinyin: 'jì de', chinese: '记得', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 85, vietnamese: 'Quên', pinyin: 'wàng jì', chinese: '忘记', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 86, vietnamese: 'Chạy', pinyin: 'pǎo', chinese: '跑', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 87, vietnamese: 'Mặc', pinyin: 'chuān', chinese: '穿', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 88, vietnamese: 'Giới thiệu', pinyin: 'jiè shào', chinese: '介绍', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 89, vietnamese: 'Đợi', pinyin: 'děng', chinese: '等', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 90, vietnamese: 'Đi bộ', pinyin: 'zǒu', chinese: '走', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 91, vietnamese: 'Nghỉ ngơi', pinyin: 'xiū xi', chinese: '休息', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 92, vietnamese: 'Làm việc', pinyin: 'gōng zuò', chinese: '工作', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 93, vietnamese: 'Trả lời', pinyin: 'huí dá', chinese: '回答', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 94, vietnamese: 'Hỏi', pinyin: 'wèn', chinese: '问', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },
  { id: 95, vietnamese: 'Trả lại', pinyin: 'huán', chinese: '还', category: 'Động từ', hskLevel: 'HSK2', partOfSpeech: 'Động từ' },

  // HSK2 - Danh từ
  { id: 96, vietnamese: 'Thân thể', pinyin: 'shēn tǐ', chinese: '身体', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 97, vietnamese: 'Mắt', pinyin: 'yǎn jīng', chinese: '眼睛', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 98, vietnamese: 'Tai', pinyin: 'ěr duo', chinese: '耳朵', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 99, vietnamese: 'Miệng', pinyin: 'zuǐ', chinese: '嘴', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 100, vietnamese: 'Đầu', pinyin: 'tóu', chinese: '头', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 101, vietnamese: 'Tay', pinyin: 'shǒu', chinese: '手', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 102, vietnamese: 'Chân', pinyin: 'jiǎo', chinese: '脚', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 103, vietnamese: 'Xe', pinyin: 'chē', chinese: '车', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 104, vietnamese: 'Máy bay', pinyin: 'fēi jī', chinese: '飞机', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 105, vietnamese: 'Điện thoại', pinyin: 'diàn huà', chinese: '电话', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 106, vietnamese: 'Máy tính', pinyin: 'diàn nǎo', chinese: '电脑', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 107, vietnamese: 'Truyền hình', pinyin: 'diàn shì', chinese: '电视', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 108, vietnamese: 'Bàn', pinyin: 'zhuō zi', chinese: '桌子', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 109, vietnamese: 'Ghế', pinyin: 'yǐ zi', chinese: '椅子', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 110, vietnamese: 'Phòng', pinyin: 'fáng jiān', chinese: '房间', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 111, vietnamese: 'Khách sạn', pinyin: 'lǚ guǎn', chinese: '旅馆', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 112, vietnamese: 'Cửa hàng', pinyin: 'shāng diàn', chinese: '商店', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 113, vietnamese: 'Quần áo', pinyin: 'yī fu', chinese: '衣服', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 114, vietnamese: 'Màu', pinyin: 'yán sè', chinese: '颜色', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },
  { id: 115, vietnamese: 'Thời tiết', pinyin: 'tiān qì', chinese: '天气', category: 'Danh từ', hskLevel: 'HSK2', partOfSpeech: 'Danh từ' },

  // HSK2 - Tính từ
  { id: 116, vietnamese: 'Đẹp', pinyin: 'piào liang', chinese: '漂亮', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 117, vietnamese: 'Mệt', pinyin: 'lèi', chinese: '累', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 118, vietnamese: 'Nhanh', pinyin: 'kuài', chinese: '快', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 119, vietnamese: 'Chậm', pinyin: 'màn', chinese: '慢', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 120, vietnamese: 'Đắt', pinyin: 'guì', chinese: '贵', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 121, vietnamese: 'Rẻ', pinyin: 'pián yi', chinese: '便宜', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 122, vietnamese: 'Ngắn', pinyin: 'duǎn', chinese: '短', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 123, vietnamese: 'Dài', pinyin: 'cháng', chinese: '长', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 124, vietnamese: 'Đen', pinyin: 'hēi', chinese: '黑', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 125, vietnamese: 'Trắng', pinyin: 'bái', chinese: '白', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 126, vietnamese: 'Đỏ', pinyin: 'hóng', chinese: '红', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 127, vietnamese: 'Mới', pinyin: 'xīn', chinese: '新', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 128, vietnamese: 'Cũ', pinyin: 'jiù', chinese: '旧', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 129, vietnamese: 'Khỏe', pinyin: 'jiàn kāng', chinese: '健康', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },
  { id: 130, vietnamese: 'Đúng', pinyin: 'duì', chinese: '对', category: 'Tính từ', hskLevel: 'HSK2', partOfSpeech: 'Tính từ' },

  // HSK2 - Giới từ và liên từ
  { id: 131, vietnamese: 'Trong', pinyin: 'lǐ', chinese: '里', category: 'Giới từ', hskLevel: 'HSK2', partOfSpeech: 'Giới từ' },
  { id: 132, vietnamese: 'Trên', pinyin: 'shàng', chinese: '上', category: 'Giới từ', hskLevel: 'HSK2', partOfSpeech: 'Giới từ' },
  { id: 133, vietnamese: 'Dưới', pinyin: 'xià', chinese: '下', category: 'Giới từ', hskLevel: 'HSK2', partOfSpeech: 'Giới từ' },
  { id: 134, vietnamese: 'Trước', pinyin: 'qián', chinese: '前', category: 'Giới từ', hskLevel: 'HSK2', partOfSpeech: 'Giới từ' },
  { id: 135, vietnamese: 'Sau', pinyin: 'hòu', chinese: '后', category: 'Giới từ', hskLevel: 'HSK2', partOfSpeech: 'Giới từ' },
  { id: 136, vietnamese: 'Bên trái', pinyin: 'zuǒ', chinese: '左', category: 'Giới từ', hskLevel: 'HSK2', partOfSpeech: 'Giới từ' },
  { id: 137, vietnamese: 'Bên phải', pinyin: 'yòu', chinese: '右', category: 'Giới từ', hskLevel: 'HSK2', partOfSpeech: 'Giới từ' },
  { id: 138, vietnamese: 'Vì, bởi vì', pinyin: 'yīn wèi', chinese: '因为', category: 'Liên từ', hskLevel: 'HSK2', partOfSpeech: 'Liên từ' },
  { id: 139, vietnamese: 'Nên, cho nên', pinyin: 'suǒ yǐ', chinese: '所以', category: 'Liên từ', hskLevel: 'HSK2', partOfSpeech: 'Liên từ' },
  { id: 140, vietnamese: 'Nhưng', pinyin: 'dàn shì', chinese: '但是', category: 'Liên từ', hskLevel: 'HSK2', partOfSpeech: 'Liên từ' },

  // HSK2 - Từ nghi vấn
  { id: 141, vietnamese: 'Cái gì', pinyin: 'shén me', chinese: '什么', category: 'Nghi vấn', hskLevel: 'HSK2', partOfSpeech: 'Đại từ' },
  { id: 142, vietnamese: 'Ai', pinyin: 'shéi', chinese: '谁', category: 'Nghi vấn', hskLevel: 'HSK2', partOfSpeech: 'Đại từ' },
  { id: 143, vietnamese: 'Ở đâu', pinyin: 'nǎ lǐ', chinese: '哪里', category: 'Nghi vấn', hskLevel: 'HSK2', partOfSpeech: 'Đại từ' },
  { id: 144, vietnamese: 'Bao nhiêu', pinyin: 'duō shao', chinese: '多少', category: 'Nghi vấn', hskLevel: 'HSK2', partOfSpeech: 'Đại từ' },
  { id: 145, vietnamese: 'Bao nhiêu (số lượng nhỏ)', pinyin: 'jǐ', chinese: '几', category: 'Nghi vấn', hskLevel: 'HSK2', partOfSpeech: 'Đại từ' },
  { id: 146, vietnamese: 'Tại sao', pinyin: 'wèi shén me', chinese: '为什么', category: 'Nghi vấn', hskLevel: 'HSK2', partOfSpeech: 'Đại từ' },
  { id: 147, vietnamese: 'Như thế nào', pinyin: 'zěn me', chinese: '怎么', category: 'Nghi vấn', hskLevel: 'HSK2', partOfSpeech: 'Đại từ' },

  // HSK2 - Phó từ và trợ từ
  { id: 148, vietnamese: 'Thường', pinyin: 'cháng cháng', chinese: '常常', category: 'Phó từ', hskLevel: 'HSK2', partOfSpeech: 'Phó từ' },
  { id: 149, vietnamese: 'Đã (hoàn thành)', pinyin: 'yǐ jīng', chinese: '已经', category: 'Phó từ', hskLevel: 'HSK2', partOfSpeech: 'Phó từ' },
  { id: 150, vietnamese: 'Lại', pinyin: 'zài', chinese: '再', category: 'Phó từ', hskLevel: 'HSK2', partOfSpeech: 'Phó từ' },
];

export const hskCategories = Array.from(new Set(vocabulary.map(v => v.category)));
export const hskLevels = ['HSK1', 'HSK2'] as const;

// Thống kê theo level
export const getVocabularyByLevel = (level: 'HSK1' | 'HSK2') => {
  return vocabulary.filter(v => v.hskLevel === level);
};

// Thống kê theo loại từ
export const getVocabularyByPartOfSpeech = (partOfSpeech: string) => {
  return vocabulary.filter(v => v.partOfSpeech === partOfSpeech);
};

// Lấy từ vựng theo category và level
export const getVocabularyByCategoryAndLevel = (category: string, level: 'HSK1' | 'HSK2') => {
  return vocabulary.filter(v => v.category === category && v.hskLevel === level);
};
