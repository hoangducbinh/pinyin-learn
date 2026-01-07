# Cấu trúc dữ liệu - Data Structure

## 📁 Tổ chức thư mục

```
app/data/
├── index.ts              # File chính để import data
├── vocabulary/           # Từ vựng theo HSK
│   ├── hsk1.json        # HSK1 vocabulary (150 từ)
│   ├── hsk2.json        # HSK2 vocabulary (150 từ)
│   ├── hsk3.json        # HSK3 vocabulary (300 từ)
│   ├── hsk4.json        # HSK4 vocabulary (600 từ)
│   ├── hsk5.json        # HSK5 vocabulary (1300 từ)
│   └── hsk6.json        # HSK6 vocabulary (2500 từ)
└── phrases/              # Mẫu câu theo HSK
    ├── hsk1.json        # HSK1 phrases
    ├── hsk2.json        # HSK2 phrases
    ├── hsk3.json        # HSK3 phrases
    ├── hsk4.json        # HSK4 phrases
    ├── hsk5.json        # HSK5 phrases
    └── hsk6.json        # HSK6 phrases
```

## 📝 Cấu trúc dữ liệu

### Vocabulary (Từ vựng)

```json
{
  "id": 1,
  "vietnamese": "Tôi",
  "pinyin": "wǒ",
  "chinese": "我",
  "category": "Đại từ",
  "hskLevel": "HSK1",
  "partOfSpeech": "Đại từ"
}
```

**Các trường:**
- `id`: ID duy nhất (number)
- `vietnamese`: Nghĩa tiếng Việt (string)
- `pinyin`: Phiên âm pinyin có dấu (string)
- `chinese`: Chữ Hán (string)
- `category`: Danh mục (Đại từ, Động từ, Danh từ, ...) (string)
- `hskLevel`: Cấp độ HSK (HSK1-HSK6) (string)
- `partOfSpeech`: Từ loại (string)

### Phrases (Mẫu câu)

```json
{
  "id": 1,
  "vietnamese": "Xin chào",
  "pinyin": "nǐ hǎo",
  "chinese": "你好",
  "category": "Chào hỏi",
  "hskLevel": "HSK1",
  "difficulty": "easy"
}
```

**Các trường:**
- `id`: ID duy nhất (number)
- `vietnamese`: Nghĩa tiếng Việt (string)
- `pinyin`: Phiên âm pinyin có dấu (string)
- `chinese`: Chữ Hán (string)
- `category`: Danh mục (Chào hỏi, Giới thiệu, ...) (string)
- `hskLevel`: Cấp độ HSK (HSK1-HSK6) (string)
- `difficulty`: Độ khó (easy | medium | hard) (string)

## 🔧 Cách sử dụng

### Import trong code

```typescript
// Import tất cả
import { phrases, vocabulary, categories, hskLevels } from '@/data';

// Import helper functions
import { 
  getPhrasesByLevel, 
  getVocabularyByLevel,
  getPhrasesByCategory 
} from '@/data';

// Sử dụng
const hsk1Phrases = getPhrasesByLevel('HSK1');
const hsk2Vocab = getVocabularyByLevel('HSK2');
const greetings = getPhrasesByCategory('Chào hỏi');
```

## 📊 Nguồn dữ liệu

Bạn có thể tìm và tải về dữ liệu HSK từ các nguồn sau:

### Repositories GitHub có sẵn:
1. **chinesedict** - https://github.com/chinesedict/chinese-dictionary
2. **HSK Standard Course** - https://github.com/elkmovie/hsk
3. **CC-CEDICT** - https://github.com/skishore/makemeahanzi
4. **Chinese Vocab Lists** - https://github.com/hughgrigg/chinese-vocab-list

### Các website cung cấp data:
1. https://www.hanbantest.com/hsk/ (Official HSK)
2. https://www.digmandarin.com/hsk-vocabulary-list.html
3. https://www.dong-chinese.com/wiki/hsk

## 🎯 Cách thêm dữ liệu mới

### 1. Tạo file JSON mới

Tạo file `hsk3.json` trong thư mục tương ứng:

```json
[
  {
    "id": 1,
    "vietnamese": "...",
    "pinyin": "...",
    "chinese": "...",
    "category": "...",
    "hskLevel": "HSK3",
    "difficulty": "medium"
  }
]
```

### 2. Import vào index.ts

```typescript
import hsk3Phrases from './phrases/hsk3.json';
import hsk3Vocab from './vocabulary/hsk3.json';

export const phrases: Phrase[] = [
  ...hsk1Phrases,
  ...hsk2Phrases,
  ...hsk3Phrases, // Thêm dòng này
];
```

### 3. Validate dữ liệu

Đảm bảo:
- ID không trùng lặp
- Tất cả các field bắt buộc đều có
- Pinyin có dấu thanh đúng
- HSK level đúng format (HSK1, HSK2, ...)

## 🔍 Lọc và tìm kiếm

Component tự động hỗ trợ:
- ✅ Lọc theo category
- ✅ Lọc theo HSK level
- ✅ Tìm kiếm theo tiếng Việt, tiếng Trung, pinyin
- ✅ Hiển thị số lượng kết quả

## 💡 Tips

1. **ID không trùng**: Mỗi level có thể bắt đầu từ 1, hoặc dùng prefix: 1001, 2001, 3001...
2. **Pinyin chuẩn**: Sử dụng dấu thanh đúng (ā, á, ǎ, à)
3. **Category nhất quán**: Dùng các category giống nhau để dễ lọc
4. **Difficulty mapping**: 
   - easy: HSK1-2
   - medium: HSK3-4  
   - hard: HSK5-6
