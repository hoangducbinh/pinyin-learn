/**
 * Chuẩn hóa pinyin để so sánh (loại bỏ khoảng trắng thừa, lowercase)
 */
export function normalizePinyin(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Tính độ tương đồng giữa 2 chuỗi bằng Levenshtein distance
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizePinyin(str1);
  const s2 = normalizePinyin(str2);
  
  const len1 = s1.length;
  const len2 = s2.length;
  const matrix: number[][] = [];

  // Khởi tạo matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Tính Levenshtein distance
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  const similarity = maxLen === 0 ? 100 : ((maxLen - distance) / maxLen) * 100;
  
  return Math.round(similarity);
}

/**
 * So sánh pinyin user nhập với đáp án đúng, trả về feedback
 */
export interface ComparisonResult {
  isCorrect: boolean;
  similarity: number;
  feedback: string;
  suggestions: string[];
  mistakes: string[];
}

/**
 * Kiểm tra xem có gõ dính từ không
 */
function detectMergedWords(userInput: string, correctAnswer: string): string[] {
  const userNormalized = normalizePinyin(userInput).replace(/\s+/g, '');
  const correctNormalized = normalizePinyin(correctAnswer).replace(/\s+/g, '');
  
  // Nếu không có space và độ dài tương tự, có thể gõ dính
  if (!userInput.includes(' ') && correctAnswer.includes(' ')) {
    return ['Bạn gõ dính các từ liền nhau. Cần có khoảng trắng giữa các từ'];
  }
  
  // Tìm các từ có thể bị gõ dính
  const mergedWords: string[] = [];
  const correctWords = correctAnswer.split(' ');
  const userWords = userInput.trim().split(/\s+/);
  
  for (let i = 0; i < userWords.length; i++) {
    const userWord = userWords[i];
    // Kiểm tra xem từ này có chứa nhiều từ đúng nối liền không
    let matched = false;
    for (let j = 0; j < correctWords.length - 1; j++) {
      const combined = correctWords[j] + correctWords[j + 1];
      if (userWord.replace(/\s+/g, '').toLowerCase() === combined.replace(/\s+/g, '').toLowerCase()) {
        mergedWords.push(`"${userWord}" nên tách thành "${correctWords[j]} ${correctWords[j + 1]}"`);
        matched = true;
        break;
      }
    }
  }
  
  return mergedWords;
}

export function comparePinyin(userInput: string, correctAnswer: string): ComparisonResult {
  const normalized1 = normalizePinyin(userInput);
  const normalized2 = normalizePinyin(correctAnswer);
  
  const similarity = calculateSimilarity(normalized1, normalized2);
  const isCorrect = similarity === 100;
  
  const mistakes: string[] = [];
  const suggestions: string[] = [];
  
  // Kiểm tra gõ dính từ
  const mergedWordErrors = detectMergedWords(userInput, correctAnswer);
  if (mergedWordErrors.length > 0) {
    mistakes.push(...mergedWordErrors);
  }
  
  // Phân tích từng từ
  const userWords = normalized1.split(' ');
  const correctWords = normalized2.split(' ');
  
  const wordCountDiff = Math.abs(userWords.length - correctWords.length);
  
  if (wordCountDiff > 0) {
    if (mergedWordErrors.length === 0) {
      // Chỉ hiện lỗi số từ nếu không phải do gõ dính
      if (userWords.length < correctWords.length) {
        mistakes.push(`Thiếu ${wordCountDiff} từ (bạn: ${userWords.length}, đúng: ${correctWords.length})`);
      } else {
        mistakes.push(`Thừa ${wordCountDiff} từ (bạn: ${userWords.length}, đúng: ${correctWords.length})`);
      }
    }
  }
  
  // So sánh từng từ (chỉ khi không có lỗi gõ dính lớn)
  if (mergedWordErrors.length === 0 && Math.abs(userWords.length - correctWords.length) <= 2) {
    const maxLen = Math.max(userWords.length, correctWords.length);
    for (let i = 0; i < maxLen; i++) {
      const userWord = userWords[i] || '';
      const correctWord = correctWords[i] || '';
      
      if (userWord !== correctWord) {
        if (userWord && correctWord) {
          // Cả hai đều có, sai thanh hoặc chính tả
          const userBase = userWord.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, match => {
            const map: Record<string, string> = {
              'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
              'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
              'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
              'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
              'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
              'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü',
            };
            return map[match] || match;
          });
          
          const correctBase = correctWord.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, match => {
            const map: Record<string, string> = {
              'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
              'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
              'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
              'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
              'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
              'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü',
            };
            return map[match] || match;
          });
          
          if (userBase === correctBase) {
            mistakes.push(`Từ thứ ${i + 1}: sai thanh điệu "${userWord}" → "${correctWord}"`);
          } else {
            mistakes.push(`Từ thứ ${i + 1}: "${userWord}" → nên là "${correctWord}"`);
          }
        } else if (!userWord) {
          mistakes.push(`Thiếu từ thứ ${i + 1}: "${correctWord}"`);
        } else {
          mistakes.push(`Từ thứ ${i + 1} thừa: "${userWord}"`);
        }
      }
    }
  }
  
  // Tạo feedback
  let feedback = '';
  if (isCorrect) {
    feedback = '🎉 Hoàn hảo! Chính xác 100%';
  } else if (similarity >= 80) {
    feedback = '👍 Tốt lắm! Gần đúng rồi, chỉ còn vài chi tiết nhỏ';
  } else if (similarity >= 60) {
    feedback = '💪 Cố gắng thêm! Bạn đang trên đúng hướng';
  } else if (similarity >= 40) {
    feedback = '📚 Cần ôn tập thêm. Hãy xem lại các thanh điệu';
  } else {
    feedback = '🤔 Hãy thử lại! So sánh với đáp án để học thêm';
  }
  
  // Gợi ý cải thiện
  if (!isCorrect) {
    suggestions.push(`Đáp án đúng: ${correctAnswer}`);
    
    if (mergedWordErrors.length > 0) {
      suggestions.push('💡 Nhớ thêm khoảng trắng giữa các từ khi gõ');
    }
    
    if (similarity < 100 && similarity >= 80) {
      suggestions.push('Kiểm tra lại thanh điệu của các âm tiết');
    }
    
    if (wordCountDiff > 0 && mergedWordErrors.length === 0) {
      suggestions.push('Đếm lại số từ trong câu');
    }
    
    suggestions.push('🔊 Nghe phát âm chuẩn để luyện thêm');
  }
  
  return {
    isCorrect,
    similarity,
    feedback,
    suggestions,
    mistakes,
  };
}
