import { useState, useRef, useEffect, useCallback } from 'react';
import { convertNumberedPinyin, pronouncePinyin, getChineseVoices } from '../utils/pinyin';
import { comparePinyin, type ComparisonResult } from '../utils/comparison';
import { startSpeechRecognition, isSpeechRecognitionSupported, compareSpeech } from '../utils/speechRecognition';
import { fetchPhrases, fetchCategories, /* saveUserProgress, getUserStats, */ type Phrase } from '../services/supabase';
import { phrases as localPhrases } from '../data/phrases';
// import { useAuth } from '../contexts/AuthContext';
// import LoginModal from './LoginModal';

export default function PinyinConverter() {
  // const { user } = useAuth();
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [speechResult, setSpeechResult] = useState<{ transcript: string; confidence: number; feedback: string } | null>(null);
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load data từ Supabase hoặc fallback sang local
  useEffect(() => {
    const loadData = async () => {
      try {
        const [phrasesData, categoriesData] = await Promise.all([
          fetchPhrases(),
          fetchCategories()
        ]);

        if (phrasesData.length > 0) {
          // Dùng data từ Supabase
          setPhrases(phrasesData);
          setCategories(['all', ...categoriesData]);
        } else {
          // Fallback sang local data
          console.log('Using local data as fallback');
          setPhrases(localPhrases);
          const localCategories = Array.from(new Set(localPhrases.map(p => p.category)));
          setCategories(['all', ...localCategories]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback sang local
        setPhrases(localPhrases);
        const localCategories = Array.from(new Set(localPhrases.map(p => p.category)));
        setCategories(['all', ...localCategories]);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // TẠM THỜI TẮT LOAD STATS TỪ DATABASE
  /*
  // Load stats từ database khi user đăng nhập
  useEffect(() => {
    const loadUserStats = async () => {
      if (user) {
        const dbStats = await getUserStats(user.id);
        setStats({ correct: dbStats.correct, total: dbStats.total });
      } else {
        // Reset stats khi logout
        setStats({ correct: 0, total: 0 });
      }
    };

    loadUserStats();
  }, [user]);
  */

  const loadRandomPhrase = useCallback(() => {
    if (phrases.length === 0) return;
    
    const filtered = selectedCategory === 'all' 
      ? phrases 
      : phrases.filter(p => p.category === selectedCategory);
    
    if (filtered.length > 0) {
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      setCurrentPhrase(random);
      setUserInput('');
      setResult(null);
      setSpeechResult(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [selectedCategory, phrases]);

  // Load giọng đọc có sẵn
  useEffect(() => {
    const loadVoices = () => {
      const voices = getChineseVoices();
      setAvailableVoices(voices);
      // Tự động chọn giọng nữ đầu tiên
      if (voices.length > 0 && !selectedVoice) {
        const femaleVoice = voices.find(v => 
          v.name.includes('Female') || 
          v.name.includes('Ting-Ting') ||
          v.name.includes('Mei-Jia')
        ) || voices[0];
        setSelectedVoice(femaleVoice);
      }
    };

    loadVoices();
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoice]);

  // Load câu đầu tiên khi mount hoặc đổi category
  useEffect(() => {
    loadRandomPhrase();
  }, [loadRandomPhrase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    // Auto convert khi gõ số 1-4
    const lastChar = newValue[cursorPos - 1];
    if (lastChar && /[1-4]/.test(lastChar)) {
      const beforeCursor = newValue.substring(0, cursorPos);
      // Match từ sau space hoặc đầu string: (^|\s)
      // Bao gồm cả chữ có dấu để cho phép sửa dấu: [a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]{1,7}
      const match = beforeCursor.match(/(^|\s)([a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]{1,7})([1-4])$/i);
      
      if (match) {
        const [fullMatch, spaceOrStart, syllable, tone] = match;
        const startPos = cursorPos - fullMatch.length;
        
        // Loại bỏ dấu cũ (nếu có) trước khi convert dấu mới
        const syllableWithoutTone = syllable
          .replace(/[āáǎà]/g, 'a')
          .replace(/[ēéěè]/g, 'e')
          .replace(/[īíǐì]/g, 'i')
          .replace(/[ōóǒò]/g, 'o')
          .replace(/[ūúǔù]/g, 'u')
          .replace(/[ǖǘǚǜ]/g, 'ü');
        
        const converted = convertNumberedPinyin(syllableWithoutTone + tone);
        
        const before = newValue.substring(0, startPos);
        const after = newValue.substring(cursorPos);
        
        // Tự động thêm space sau từ đã convert (trừ khi sau đó đã có space rồi)
        const autoSpace = after[0] !== ' ' ? ' ' : '';
        const newText = before + spaceOrStart + converted + autoSpace + after;
        
        setUserInput(newText);
        
        // Di chuyển con trỏ đến sau space (nếu có thêm)
        setTimeout(() => {
          if (inputRef.current) {
            const newCursorPos = startPos + spaceOrStart.length + converted.length + autoSpace.length;
            inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          }
        }, 0);
        
        return;
      }
    }
    
    setUserInput(newValue);
  };

  const handleCheck = () => {
    if (!currentPhrase || !userInput.trim()) return;
    
    const comparison = comparePinyin(userInput, currentPhrase.pinyin);
    setResult(comparison);
    
    // Cập nhật stats local
    setStats(prev => ({
      correct: prev.correct + (comparison.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    // TẠM THỜI TẮT LƯU VÀO DATABASE
    /*
    // Lưu vào database nếu user đã đăng nhập
    if (user) {
      saveUserProgress(currentPhrase.id, comparison.isCorrect, userInput);
    }
    */
  };

  const handleNext = () => {
    loadRandomPhrase();
  };

  const handlePronounce = async (text: string) => {
    const success = await pronouncePinyin(text, selectedVoice);
    if (!success) {
      // Nếu thất bại, thử với giọng mặc định
      await pronouncePinyin(text, null);
    }
  };

  const handleTestVoice = async () => {
    if (!selectedVoice) return;
    await pronouncePinyin('你好', selectedVoice);
  };

  const handleStartRecording = async () => {
    if (!currentPhrase || !isSpeechRecognitionSupported()) {
      alert('Trình duyệt không hỗ trợ nhận diện giọng nói');
      return;
    }

    setIsRecording(true);
    setSpeechResult(null);

    const result = await startSpeechRecognition();

    setIsRecording(false);

    if (result.success) {
      // So sánh với đáp án
      const comparison = compareSpeech(result.transcript, currentPhrase.chinese, currentPhrase.pinyin);
      
      setSpeechResult({
        transcript: result.transcript,
        confidence: result.confidence,
        feedback: comparison.feedback,
      });

      // Cập nhật stats
      setStats(prev => ({
        correct: prev.correct + (comparison.isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));

      // TẠM THỜI TẮT LƯU VÀO DATABASE
      /*
      // Lưu vào database nếu user đã đăng nhập
      if (user && currentPhrase) {
        saveUserProgress(currentPhrase.id, comparison.isCorrect, result.transcript);
      }
      */
    } else {
      alert(result.error || 'Không thể nhận diện giọng nói');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (result) {
        handleNext();
      } else {
        handleCheck();
      }
    }
  };

  if (loadingData) {
    return (
      <div className="learn-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!currentPhrase) return null;

  return (
    <>
      <div className="learn-container">
        {/* Header */}
        <header className="learn-header">
          <div>
            <h1>Học Pinyin</h1>
            <div className="voice-selector">
              <label>🎙️ Giọng đọc:</label>
              <select 
                value={selectedVoice?.name || ''} 
                onChange={(e) => {
                  const voice = availableVoices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice || null);
                }}
                className="voice-select"
              >
                {availableVoices.length === 0 && (
                  <option>Đang tải giọng...</option>
                )}
                {availableVoices.map(voice => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name.length > 35 ? voice.name.substring(0, 35) + '...' : voice.name}
                  </option>
                ))}
              </select>
              <button onClick={handleTestVoice} className="btn-test-voice" title="Test giọng">
                🔊
              </button>
            </div>
          </div>
          <div className="header-right">
            <div className="stats">
              <span className="stat-item">
                ✅ {stats.correct}/{stats.total}
              </span>
              <span className="stat-item">
                📊 {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </span>
            </div>
            {/* TẠM THỜI TẮT LOGIN/LOGOUT UI */}
            {/*
            {user ? (
              <div className="user-menu">
                <span className="user-name">
                  {user.user_metadata?.username || user.email}
                </span>
                <button onClick={() => {
                  if (window.confirm('Bạn có muốn đăng xuất?')) {
                    import('../services/auth').then(({ signOut }) => signOut());
                  }
                }} className="btn-logout">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="btn-login">
                🔐 Đăng nhập
              </button>
            )}
            */}
          </div>
        </header>

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          Tất cả
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Card */}
      <div className="practice-card">
        {/* Question */}
        <div className="question-section">
          <div className="difficulty-badge">{currentPhrase.difficulty}</div>
          <div className="vietnamese-text">{currentPhrase.vietnamese}</div>
          <div className="chinese-text">{currentPhrase.chinese}</div>
        </div>

        {/* Input */}
        <div className="input-section">
          <label>Gõ Pinyin của bạn:</label>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Gõ pinyin... (vd: ni3 hao3)"
            disabled={!!result}
            className="pinyin-input-field"
          />
          <small className="hint">💡 Gõ số 1-4 sau mỗi âm tiết để thêm thanh tự động</small>
        </div>

        {/* Actions */}
        <div className="action-buttons">
          {!result ? (
            <>
              <button onClick={handleCheck} className="btn-primary" disabled={!userInput.trim()}>
                Kiểm tra
              </button>
              <button onClick={() => handlePronounce(currentPhrase.chinese)} className="btn-secondary">
                🔊 Nghe
              </button>
              {isSpeechRecognitionSupported() && (
                <button 
                  onClick={handleStartRecording} 
                  className={`btn-record ${isRecording ? 'recording' : ''}`}
                  disabled={isRecording}
                >
                  {isRecording ? '🎙️ Đang nghe...' : '🎤 Nói thử'}
                </button>
              )}
            </>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              Câu tiếp theo →
            </button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className={`result-section ${result.isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="result-header">
              <div className="score-circle">{result.similarity}%</div>
              <div className="feedback">{result.feedback}</div>
            </div>

            {result.mistakes.length > 0 && (
              <div className="mistakes">
                <h4>❌ Sai sót:</h4>
                <ul>
                  {result.mistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.suggestions.length > 0 && (
              <div className="suggestions">
                <h4>💡 Gợi ý:</h4>
                <ul>
                  {result.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="answer-comparison">
              <div className="comparison-row">
                <span className="label">Bạn gõ:</span>
                <span className="value user">{userInput}</span>
              </div>
              <div className="comparison-row">
                <span className="label">Đáp án:</span>
                <span className="value correct" onClick={() => handlePronounce(currentPhrase.chinese)}>
                  {currentPhrase.pinyin}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Speech Recognition Result */}
        {speechResult && (
          <div className="speech-result">
            <h4>🎤 Kết quả nhận diện giọng nói:</h4>
            <div className="speech-info">
              <div className="speech-row">
                <span className="label">Hệ thống nghe:</span>
                <span className="value">{speechResult.transcript}</span>
              </div>
              <div className="speech-row">
                <span className="label">Đáp án:</span>
                <span className="value">{currentPhrase.chinese}</span>
              </div>
              <div className="speech-row">
                <span className="label">Độ tin cậy:</span>
                <span className="value">{speechResult.confidence}%</span>
              </div>
              <div className="speech-feedback">{speechResult.feedback}</div>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="tips-section">
        <h3>📖 Hướng dẫn</h3>
        <ul>
          <li>Gõ chữ cái + số thanh (1-4) sẽ tự động thành dấu</li>
          <li>Thanh 1: ā, Thanh 2: á, Thanh 3: ǎ, Thanh 4: à</li>
          <li>✨ <strong>Tự động thêm space</strong> - Gõ liền thoải mái: ni3hao3 → nǐ hǎo</li>
          <li>Nhấn Enter để kiểm tra hoặc chuyển câu tiếp</li>
          {/* TẠM THỜI TẮT LOGIN TIP */}
          {/* {!user && <li>💡 Đăng nhập để lưu lịch sử học tập của bạn!</li>} */}
        </ul>
      </div>
    </div>

    {/* TẠM THỜI TẮT LOGIN MODAL */}
    {/* <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} /> */}
    </>
  );
}