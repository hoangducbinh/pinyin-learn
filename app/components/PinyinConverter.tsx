import { useState, useRef, useEffect, useCallback } from 'react';
import { convertNumberedPinyin, pronouncePinyin, getChineseVoices } from '../utils/pinyin';
import { comparePinyin, type ComparisonResult } from '../utils/comparison';
import { startSpeechRecognition, isSpeechRecognitionSupported, compareSpeech } from '../utils/speechRecognition';
import { phrases as localPhrases, categories as localCategories, type Phrase } from '../data/phrases';
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
  const [phrases] = useState<Phrase[]>(localPhrases);
  const [categories] = useState<string[]>(['all', ...localCategories]);
  const [searchQuery, setSearchQuery] = useState('');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [dictionarySearch, setDictionarySearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter phrases theo search và category
  const filteredPhrases = phrases.filter(phrase => {
    const matchCategory = selectedCategory === 'all' || phrase.category === selectedCategory;
    const matchSearch = searchQuery === '' || 
      phrase.chinese.includes(searchQuery) ||
      phrase.vietnamese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.pinyin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Filter phrases cho từ điển
  const dictionaryResults = phrases.filter(phrase => {
    if (dictionarySearch === '') return false;
    return phrase.chinese.includes(dictionarySearch) ||
      phrase.vietnamese.toLowerCase().includes(dictionarySearch.toLowerCase()) ||
      phrase.pinyin.toLowerCase().includes(dictionarySearch.toLowerCase());
  });

  const handlePhraseClick = (phrase: Phrase) => {
    setCurrentPhrase(phrase);
    setUserInput('');
    setResult(null);
    setSpeechResult(null);
    setTimeout(() => inputRef.current?.focus(), 100);
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

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
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
      />

      <RightSidebar
        isOpen={rightSidebarOpen}
        onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        searchQuery={dictionarySearch}
        onSearchChange={setDictionarySearch}
        results={dictionaryResults}
        onPhraseClick={handlePhraseClick}
        onPronounce={handlePronounce}
      />
    </div>
  );
}
