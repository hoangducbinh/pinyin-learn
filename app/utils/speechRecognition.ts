/**
 * Speech Recognition cho tiếng Trung
 */

// Type declaration cho Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface RecognitionResult {
  success: boolean;
  transcript: string;
  confidence: number;
  error?: string;
}

/**
 * Kiểm tra browser có hỗ trợ Speech Recognition không
 */
export function isSpeechRecognitionSupported(): boolean {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

/**
 * Bắt đầu ghi âm và nhận diện giọng nói tiếng Trung
 */
export function startSpeechRecognition(): Promise<RecognitionResult> {
  return new Promise((resolve) => {
    if (!isSpeechRecognitionSupported()) {
      resolve({
        success: false,
        transcript: '',
        confidence: 0,
        error: 'Trình duyệt không hỗ trợ nhận diện giọng nói',
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Cấu hình
    recognition.lang = 'zh-CN'; // Tiếng Trung
    recognition.continuous = false; // Chỉ nhận 1 câu
    recognition.interimResults = false; // Chỉ lấy kết quả cuối
    recognition.maxAlternatives = 3; // Lấy tối đa 3 kết quả

    // Timeout 10 giây
    const timeout = setTimeout(() => {
      recognition.stop();
      resolve({
        success: false,
        transcript: '',
        confidence: 0,
        error: 'Hết thời gian ghi âm',
      });
    }, 10000);

    recognition.onresult = (event: any) => {
      clearTimeout(timeout);
      
      const result = event.results[0];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;

      resolve({
        success: true,
        transcript,
        confidence: Math.round(confidence * 100),
      });
    };

    recognition.onerror = (event: any) => {
      clearTimeout(timeout);
      
      let errorMessage = 'Lỗi nhận diện giọng nói';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'Không nghe thấy giọng nói. Hãy thử lại';
          break;
        case 'audio-capture':
          errorMessage = 'Không truy cập được microphone';
          break;
        case 'not-allowed':
          errorMessage = 'Cần cấp quyền microphone';
          break;
        case 'network':
          errorMessage = 'Lỗi mạng. Kiểm tra kết nối internet';
          break;
        default:
          errorMessage = `Lỗi: ${event.error}`;
      }

      resolve({
        success: false,
        transcript: '',
        confidence: 0,
        error: errorMessage,
      });
    };

    recognition.onend = () => {
      clearTimeout(timeout);
    };

    try {
      recognition.start();
    } catch (error) {
      clearTimeout(timeout);
      resolve({
        success: false,
        transcript: '',
        confidence: 0,
        error: 'Không thể bắt đầu ghi âm',
      });
    }
  });
}

/**
 * So sánh giọng nói của user với đáp án
 */
export function compareSpeech(userSpeech: string, correctChinese: string, correctPinyin: string): {
  isCorrect: boolean;
  similarity: number;
  feedback: string;
} {
  const userNormalized = userSpeech.trim().replace(/\s+/g, '');
  const correctNormalized = correctChinese.trim().replace(/\s+/g, '');

  // So sánh trực tiếp chữ Hán
  const isExactMatch = userNormalized === correctNormalized;
  
  // Tính độ tương đồng đơn giản
  let matchCount = 0;
  const maxLen = Math.max(userNormalized.length, correctNormalized.length);
  
  for (let i = 0; i < Math.min(userNormalized.length, correctNormalized.length); i++) {
    if (userNormalized[i] === correctNormalized[i]) {
      matchCount++;
    }
  }
  
  const similarity = maxLen > 0 ? Math.round((matchCount / maxLen) * 100) : 0;

  let feedback = '';
  if (isExactMatch) {
    feedback = '🎉 Phát âm hoàn hảo! Chính xác 100%';
  } else if (similarity >= 80) {
    feedback = '👍 Rất tốt! Phát âm gần như chuẩn rồi';
  } else if (similarity >= 60) {
    feedback = '💪 Khá ổn! Cần luyện thêm một chút';
  } else if (similarity >= 40) {
    feedback = '📚 Cần cải thiện. Nghe lại và luyện tập thêm';
  } else {
    feedback = '🤔 Chưa chính xác. Hãy nghe và bắt chước lại';
  }

  return {
    isCorrect: isExactMatch,
    similarity,
    feedback,
  };
}
