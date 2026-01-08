import { useState, useRef, useEffect, useCallback } from 'react';
import { convertNumberedPinyin, pronouncePinyin, getChineseVoices } from '../utils/pinyin';
import { comparePinyin, type ComparisonResult } from '../utils/comparison';
import { startSpeechRecognition, isSpeechRecognitionSupported, compareSpeech } from '../utils/speechRecognition';
import { phrases as allPhrases, vocabulary as allVocabulary, categories as allCategories, type Phrase, type Vocabulary } from '../data';
import { searchVietnameseText } from '../utils/search';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import PracticeArea from './PracticeArea';

export default function PinyinConverter() {
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [speechResult, setSpeechResult] = useState<{ transcript: string; confidence: number; feedback: string } | null>(null);
  const [phrases] = useState<Phrase[]>(allPhrases);
  const [vocabulary] = useState<Vocabulary[]>(allVocabulary);
  const [categories] = useState<string[]>(['all', ...allCategories]);
  const [searchQuery, setSearchQuery] = useState('');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [dictionarySearch, setDictionarySearch] = useState('');
  const [streak, setStreak] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter phrases theo search và category
  const filteredPhrases = phrases.filter(phrase => {
    const matchCategory = selectedCategory === 'all' || phrase.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      phrase.chinese.includes(searchQuery) ||
      searchVietnameseText(phrase.vietnamese, searchQuery) ||
      phrase.pinyin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Filter vocabulary cho từ điển
  const dictionaryResults = vocabulary.filter(vocab => {
    if (dictionarySearch === '') return false;
    return vocab.chinese.includes(dictionarySearch) ||
      searchVietnameseText(vocab.vietnamese, dictionarySearch) ||
      vocab.pinyin.toLowerCase().includes(dictionarySearch.toLowerCase());
  });

  const handlePhraseClick = (phrase: Phrase) => {
    setCurrentPhrase(phrase);
    setUserInput('');
    setResult(null);
    setSpeechResult(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleReset = () => {
    setUserInput('');
    setResult(null);
    setSpeechResult(null);
  };

  const loadRandomPhrase = useCallback(() => {
    if (filteredPhrases.length === 0) return;

    const random = filteredPhrases[Math.floor(Math.random() * filteredPhrases.length)];
    setCurrentPhrase(random);
    setUserInput('');
    setResult(null);
    setSpeechResult(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [filteredPhrases]);

  // Load giọng đọc có sẵn
  useEffect(() => {
    const loadVoices = () => {
      const voices = getChineseVoices();
      setAvailableVoices(voices);
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

  // Load câu đầu tiên
  useEffect(() => {
    if (!currentPhrase && phrases.length > 0) {
      setCurrentPhrase(phrases[0]);
    }
  }, [currentPhrase, phrases]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    const lastChar = newValue[cursorPos - 1];
    if (lastChar && /[1-4]/.test(lastChar)) {
      const beforeCursor = newValue.substring(0, cursorPos);
      const match = beforeCursor.match(/(^|\s)([a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]{1,7})([1-4])$/i);

      if (match) {
        const [fullMatch, spaceOrStart, syllable, tone] = match;
        const startPos = cursorPos - fullMatch.length;

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
        const autoSpace = after[0] !== ' ' ? ' ' : '';
        const newText = before + spaceOrStart + converted + autoSpace + after;

        setUserInput(newText);

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

    // Update streak
    if (comparison.isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    loadRandomPhrase();
  };

  const handlePronounce = async (text: string) => {
    const success = await pronouncePinyin(text, selectedVoice);
    if (!success) {
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
      const comparison = compareSpeech(result.transcript, currentPhrase.chinese, currentPhrase.pinyin);

      setSpeechResult({
        transcript: result.transcript,
        confidence: result.confidence,
        feedback: comparison.feedback,
      });
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

  const toggleTheme = () => {
    setIsDark(prev => {
      const newDark = !prev;
      if (newDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newDark;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <LeftSidebar
        isOpen={leftSidebarOpen}
        onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        phrases={filteredPhrases}
        currentPhrase={currentPhrase}
        onPhraseClick={handlePhraseClick}
      />

      <PracticeArea
        currentPhrase={currentPhrase}
        userInput={userInput}
        onInputChange={handleInputChange}
        onKeyPress={handleKeyPress}
        inputRef={inputRef}
        result={result}
        speechResult={speechResult}
        isRecording={isRecording}
        availableVoices={availableVoices}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
        onCheck={handleCheck}
        onNext={handleNext}
        onPronounce={handlePronounce}
        onTestVoice={handleTestVoice}
        onStartRecording={handleStartRecording}
        isSpeechSupported={isSpeechRecognitionSupported()}
        streak={streak}
        onReset={handleReset}
        leftSidebarOpen={leftSidebarOpen}
        onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
        rightSidebarOpen={rightSidebarOpen}
        onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <RightSidebar
        isOpen={rightSidebarOpen}
        onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        searchQuery={dictionarySearch}
        onSearchChange={setDictionarySearch}
        results={dictionaryResults}
        onVocabularyClick={(vocab) => {
          // Tìm phrase chứa từ vựng này để luyện tập
          const relatedPhrase = phrases.find(p => p.chinese.includes(vocab.chinese));
          if (relatedPhrase) {
            handlePhraseClick(relatedPhrase);
          }
        }}
        onPronounce={handlePronounce}
      />
    </div>
  );
}
