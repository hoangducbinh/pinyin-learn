export interface Phrase {
  id: number;
  vietnamese: string;
  pinyin: string;
  chinese: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const phrases: Phrase[] = [
  // Chào hỏi cơ bản
  { id: 1, vietnamese: 'Xin chào', pinyin: 'nǐ hǎo', chinese: '你好', category: 'Chào hỏi', difficulty: 'easy' },
  { id: 2, vietnamese: 'Cảm ơn', pinyin: 'xiè xiè', chinese: '谢谢', category: 'Chào hỏi', difficulty: 'easy' },
  { id: 3, vietnamese: 'Tạm biệt', pinyin: 'zài jiàn', chinese: '再见', category: 'Chào hỏi', difficulty: 'easy' },
  { id: 4, vietnamese: 'Xin lỗi', pinyin: 'duì bù qǐ', chinese: '对不起', category: 'Chào hỏi', difficulty: 'easy' },
  { id: 5, vietnamese: 'Không sao', pinyin: 'méi guān xì', chinese: '没关系', category: 'Chào hỏi', difficulty: 'easy' },
  
  // Giới thiệu bản thân
  { id: 6, vietnamese: 'Tôi là người Việt Nam', pinyin: 'wǒ shì yuè nán rén', chinese: '我是越南人', category: 'Giới thiệu', difficulty: 'medium' },
  { id: 7, vietnamese: 'Bạn tên gì?', pinyin: 'nǐ jiào shén me míng zi', chinese: '你叫什么名字', category: 'Giới thiệu', difficulty: 'medium' },
  { id: 8, vietnamese: 'Tôi tên Minh', pinyin: 'wǒ jiào míng', chinese: '我叫明', category: 'Giới thiệu', difficulty: 'medium' },
  { id: 9, vietnamese: 'Rất vui được gặp bạn', pinyin: 'hěn gāo xìng rèn shi nǐ', chinese: '很高兴认识你', category: 'Giới thiệu', difficulty: 'medium' },
  
  // Hỏi đường
  { id: 10, vietnamese: 'Nhà vệ sinh ở đâu?', pinyin: 'cè suǒ zài nǎ lǐ', chinese: '厕所在哪里', category: 'Hỏi đường', difficulty: 'medium' },
  { id: 11, vietnamese: 'Bạn có thể nói chậm hơn không?', pinyin: 'nǐ néng shuō màn yì diǎn ma', chinese: '你能说慢一点吗', category: 'Giao tiếp', difficulty: 'hard' },
  { id: 12, vietnamese: 'Tôi không hiểu', pinyin: 'wǒ bù dǒng', chinese: '我不懂', category: 'Giao tiếp', difficulty: 'easy' },
  
  // Ăn uống
  { id: 13, vietnamese: 'Cái này bao nhiêu tiền?', pinyin: 'zhè gè duō shao qián', chinese: '这个多少钱', category: 'Mua sắm', difficulty: 'medium' },
  { id: 14, vietnamese: 'Tôi muốn uống nước', pinyin: 'wǒ xiǎng hē shuǐ', chinese: '我想喝水', category: 'Ăn uống', difficulty: 'easy' },
  { id: 15, vietnamese: 'Ngon quá!', pinyin: 'hǎo chī', chinese: '好吃', category: 'Ăn uống', difficulty: 'easy' },
  
  // Số đếm & Thời gian
  { id: 16, vietnamese: 'Bây giờ là mấy giờ?', pinyin: 'xiàn zài jǐ diǎn', chinese: '现在几点', category: 'Thời gian', difficulty: 'medium' },
  { id: 17, vietnamese: 'Hôm nay thứ mấy?', pinyin: 'jīn tiān xīng qī jǐ', chinese: '今天星期几', category: 'Thời gian', difficulty: 'medium' },
  
  // Cảm xúc
  { id: 18, vietnamese: 'Tôi yêu bạn', pinyin: 'wǒ ài nǐ', chinese: '我爱你', category: 'Cảm xúc', difficulty: 'easy' },
  { id: 19, vietnamese: 'Tôi rất vui', pinyin: 'wǒ hěn kāi xīn', chinese: '我很开心', category: 'Cảm xúc', difficulty: 'easy' },
  { id: 20, vietnamese: 'Tôi mệt quá', pinyin: 'wǒ hěn lèi', chinese: '我很累', category: 'Cảm xúc', difficulty: 'easy' },
];

export const categories = Array.from(new Set(phrases.map(p => p.category)));
