// Mapping từ số (1-4) sang dấu thanh
const TONE_MARKS: Record<string, Record<number, string>> = {
  a: { 1: 'ā', 2: 'á', 3: 'ǎ', 4: 'à' },
  e: { 1: 'ē', 2: 'é', 3: 'ě', 4: 'è' },
  i: { 1: 'ī', 2: 'í', 3: 'ǐ', 4: 'ì' },
  o: { 1: 'ō', 2: 'ó', 3: 'ǒ', 4: 'ò' },
  u: { 1: 'ū', 2: 'ú', 3: 'ǔ', 4: 'ù' },
  ü: { 1: 'ǖ', 2: 'ǘ', 3: 'ǚ', 4: 'ǜ' },
  v: { 1: 'ǖ', 2: 'ǘ', 3: 'ǚ', 4: 'ǜ' }, // v thường dùng thay ü
};

// Các finals (vần) hợp lệ trong pinyin
const VALID_FINALS = [
  'a', 'ai', 'an', 'ang', 'ao',
  'e', 'ei', 'en', 'eng', 'er',
  'i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iong', 'iu',
  'o', 'ong', 'ou',
  'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo',
  'ü', 'üan', 'üe', 'ün',
  'v', 'van', 've', 'vn', // v = ü
];

// Các initials (thanh mẫu) hợp lệ
const VALID_INITIALS = [
  'b', 'p', 'm', 'f',
  'd', 't', 'n', 'l',
  'g', 'k', 'h',
  'j', 'q', 'x',
  'zh', 'ch', 'sh', 'r',
  'z', 'c', 's',
  'y', 'w',
];

/**
 * Chuyển đổi pinyin có số (1-4) sang pinyin có dấu thanh
 * Ví dụ: "ni3 hao3" → "nǐ hǎo"
 */
export function convertNumberedPinyin(input: string): string {
  if (!input.trim()) return '';

  const words = input.toLowerCase().trim().split(/\s+/);
  
  return words.map(word => {
    // Tìm số thanh (1-4) ở cuối
    const match = word.match(/^([a-zü]+)([1-4])$/);
    if (!match) return word;

    const [, syllable, tone] = match;
    const toneNum = parseInt(tone);

    // Quy tắc đặt dấu:
    // 1. Nếu có 'a' hoặc 'e' → đặt dấu lên đó
    // 2. Nếu có 'ou' → đặt lên 'o'
    // 3. Nếu không → đặt lên nguyên âm cuối

    let result = syllable;
    
    // Rule 1: a hoặc e (ưu tiên cao nhất)
    if (syllable.includes('a')) {
      result = syllable.replace('a', TONE_MARKS.a[toneNum]);
    } else if (syllable.includes('e')) {
      result = syllable.replace('e', TONE_MARKS.e[toneNum]);
    } 
    // Rule 2: ou
    else if (syllable.includes('ou')) {
      result = syllable.replace('o', TONE_MARKS.o[toneNum]);
    }
    // Rule 3: nguyên âm cuối
    else {
      // Tìm nguyên âm cuối cùng
      const vowels = ['o', 'i', 'u', 'ü', 'v'];
      for (let i = syllable.length - 1; i >= 0; i--) {
        const char = syllable[i];
        if (vowels.includes(char)) {
          const toneChar = TONE_MARKS[char][toneNum];
          result = syllable.substring(0, i) + toneChar + syllable.substring(i + 1);
          break;
        }
      }
    }

    return result;
  }).join(' ');
}

/**
 * Kiểm tra xem một âm tiết pinyin có hợp lệ không
 */
export function isValidPinyin(syllable: string): boolean {
  if (!syllable) return false;
  
  const lower = syllable.toLowerCase();
  
  // Loại bỏ số thanh nếu có
  const withoutTone = lower.replace(/[1-4]$/, '');
  
  // Trường hợp chỉ có final (không có initial)
  if (VALID_FINALS.includes(withoutTone)) {
    return true;
  }

  // Tìm initial dài nhất khớp
  for (const initial of VALID_INITIALS.sort((a, b) => b.length - a.length)) {
    if (withoutTone.startsWith(initial)) {
      const final = withoutTone.slice(initial.length);
      if (VALID_FINALS.includes(final)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Validate chuỗi pinyin nhiều từ
 */
export function validatePinyinString(input: string): {
  isValid: boolean;
  invalidSyllables: string[];
} {
  if (!input.trim()) {
    return { isValid: false, invalidSyllables: [] };
  }

  const words = input.toLowerCase().trim().split(/\s+/);
  const invalidSyllables: string[] = [];

  for (const word of words) {
    if (!isValidPinyin(word)) {
      invalidSyllables.push(word);
    }
  }

  return {
    isValid: invalidSyllables.length === 0,
    invalidSyllables,
  };
}

/**
 * Lấy danh sách giọng tiếng Trung có sẵn
 */
export function getChineseVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(voice => 
    voice.lang.includes('zh') || 
    voice.lang.includes('cmn') ||
    voice.lang.includes('CN')
  );
}

/**
 * Phát âm với giọng được chọn
 */
export function pronouncePinyin(text: string, selectedVoice?: SpeechSynthesisVoice | null): Promise<boolean> {
  return new Promise((resolve) => {
    if (!text.trim()) {
      resolve(false);
      return;
    }

    // Kiểm tra browser support
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt không hỗ trợ phát âm');
      resolve(false);
      return;
    }

    // Dừng phát âm trước đó (nếu có)
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.75;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;

    // Dùng giọng được chọn hoặc tự động chọn
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      // Tự động chọn giọng nữ tiếng Trung
      const voices = window.speechSynthesis.getVoices();
      const chineseVoice = voices.find(voice => {
        const isChineseFemale = 
          voice.lang.includes('zh') && 
          (voice.name.includes('Female') || 
           voice.name.includes('female') ||
           voice.name.includes('Ting-Ting') ||
           voice.name.includes('Mei-Jia') ||
           voice.name.includes('Google 普通话'));
        return isChineseFemale;
      }) || voices.find(voice => voice.lang.includes('zh-CN') || voice.lang.includes('zh'));

      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }
    }

    // Xử lý sự kiện
    utterance.onend = () => resolve(true);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      resolve(false);
    };

    try {
      window.speechSynthesis.speak(utterance);
      
      // Timeout fallback - một số giọng không trigger onend/onerror
      setTimeout(() => resolve(true), 100);
    } catch (error) {
      console.error('Error speaking:', error);
      resolve(false);
    }
  });
}

// Load voices khi page load (cần cho một số browser)
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
