import { type Phrase } from '../data/phrases';
import { type ComparisonResult } from '../utils/comparison';

interface PracticeAreaProps {
  currentPhrase: Phrase | null;
  userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  result: ComparisonResult | null;
  speechResult: { transcript: string; confidence: number; feedback: string } | null;
  isRecording: boolean;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice | null) => void;
  onCheck: () => void;
  onNext: () => void;
  onPronounce: (text: string) => void;
  onTestVoice: () => void;
  onStartRecording: () => void;
  isSpeechSupported: boolean;
}

export default function PracticeArea({
  currentPhrase,
  userInput,
  onInputChange,
  onKeyPress,
  inputRef,
  result,
  speechResult,
  isRecording,
  availableVoices,
  selectedVoice,
  onVoiceChange,
  onCheck,
  onNext,
  onPronounce,
  onTestVoice,
  onStartRecording,
  isSpeechSupported,
}: PracticeAreaProps) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fa]">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e0e2e5] min-h-[64px] shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <div>
            <h1 className="text-xl font-bold text-[#1c1e21]">Luyện tập Pinyin</h1>
            <p className="text-xs text-[#65676b]">Học cách phát âm tiếng Trung chuẩn</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#f8f9fa] px-3 py-2 rounded-lg border border-[#e0e2e5]">
            <label className="text-xs font-medium text-[#65676b]">🎙️ Giọng đọc:</label>
            <select 
              value={selectedVoice?.name || ''} 
              onChange={(e) => {
                const voice = availableVoices.find(v => v.name === e.target.value);
                onVoiceChange(voice || null);
              }}
              className="py-1.5 px-2.5 border border-[#e0e2e5] rounded text-xs bg-white text-[#1c1e21] cursor-pointer transition-all duration-200 hover:border-[#0084ff] focus:outline-none focus:border-[#0084ff] focus:shadow-[0_0_0_3px_#e7f3ff]"
            >
              {availableVoices.length === 0 && (
                <option>Đang tải...</option>
              )}
              {availableVoices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name.length > 30 ? voice.name.substring(0, 30) + '...' : voice.name}
                </option>
              ))}
            </select>
            <button 
              onClick={onTestVoice}
              className="w-8 h-8 border border-[#e0e2e5] bg-white rounded cursor-pointer text-base transition-all duration-200 hover:bg-[#e7f3ff] hover:border-[#0084ff]" 
              title="Test giọng"
            >
              🔊
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {currentPhrase && (
            <div className="bg-white border border-[#e0e2e5] rounded-2xl p-8 shadow-lg mb-6">
              <div className="text-center py-10 border-b-2 border-[#f0f2f5] mb-8 relative">
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-3 py-1.5 rounded-full uppercase font-bold tracking-wider ${
                    currentPhrase.difficulty.toLowerCase() === 'easy' ? 'bg-[#e8f5e9] text-[#00a400]' :
                    currentPhrase.difficulty.toLowerCase() === 'medium' ? 'bg-[#fff4e6] text-[#f57c00]' :
                    'bg-[#ffebee] text-[#e4002b]'
                  }`}>
                    {currentPhrase.difficulty}
                  </span>
                </div>
                <div className="text-lg text-[#65676b] mb-6 font-medium">{currentPhrase.vietnamese}</div>
                <div className="text-6xl font-bold text-[#1c1e21] mb-6 tracking-wider">{currentPhrase.chinese}</div>
                <button 
                  onClick={() => onPronounce(currentPhrase.chinese)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#f0f2f5] rounded-lg text-sm font-medium text-[#1c1e21] transition-all duration-200 hover:bg-[#e7f3ff] hover:text-[#0084ff] hover:shadow-md"
                >
                  <span className="text-lg">🔊</span>
                  Nghe phát âm
                </button>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-[#1c1e21] mb-3 uppercase tracking-wide">
                  ✍️ Nhập Pinyin của bạn:
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={onInputChange}
                  onKeyPress={onKeyPress}
                  placeholder="Gõ pinyin... (vd: ni3 hao3 → nǐ hǎo)"
                  disabled={!!result}
                  className="w-full py-4 px-5 border-2 border-[#e0e2e5] rounded-xl text-2xl font-medium bg-[#f8f9fa] text-[#1c1e21] transition-all duration-200 text-center tracking-wider focus:outline-none focus:border-[#0084ff] focus:bg-white focus:shadow-[0_0_0_4px_#e7f3ff] disabled:bg-[#f0f2f5] disabled:cursor-not-allowed disabled:opacity-70"
                />
                <div className="mt-3 text-center">
                  <small className="text-sm text-[#65676b]">
                    💡 <strong>Mẹo:</strong> Gõ số 1-4 sau mỗi âm tiết để tự động thêm thanh điệu
                  </small>
                </div>
              </div>

              <div className="flex gap-3 justify-center mb-8 flex-wrap">
                {!result ? (
                  <>
                    <button 
                      onClick={onCheck}
                      className="px-8 py-3.5 rounded-xl text-base font-bold cursor-pointer transition-all duration-200 bg-gradient-to-r from-[#0084ff] to-[#0073e6] text-white border-none hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                      disabled={!userInput.trim()}
                    >
                      ✓ Kiểm tra
                    </button>
                    {isSpeechSupported && (
                      <button 
                        onClick={onStartRecording}
                        className={`px-8 py-3.5 rounded-xl text-base font-bold cursor-pointer transition-all duration-200 border-2 ${
                          isRecording 
                            ? 'animate-pulse bg-[#e4002b] text-white border-[#e4002b]' 
                            : 'bg-white text-[#1c1e21] border-[#e0e2e5] hover:border-[#0084ff] hover:bg-[#e7f3ff] hover:text-[#0084ff] hover:shadow-lg hover:-translate-y-0.5'
                        } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                        disabled={isRecording}
                      >
                        {isRecording ? '🎙️ Đang lắng nghe...' : '🎤 Nói thử'}
                      </button>
                    )}
                  </>
                ) : (
                  <button 
                    onClick={onNext}
                    className="px-8 py-3.5 rounded-xl text-base font-bold cursor-pointer transition-all duration-200 bg-gradient-to-r from-[#00a400] to-[#008f00] text-white border-none hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Câu tiếp theo →
                  </button>
                )}
              </div>

              {result && (
                <div className={`p-6 rounded-xl border-2 mb-6 ${
                  result.isCorrect 
                    ? 'bg-gradient-to-br from-[#e8f5e9] to-[#f1f8f4] border-[#00a400]' 
                    : 'bg-gradient-to-br from-[#ffebee] to-[#fff5f5] border-[#e4002b]'
                }`}>
                  <div className="flex items-start gap-5 mb-5">
                    <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-2xl font-black bg-white shadow-md ${
                      result.isCorrect ? 'text-[#00a400]' : 'text-[#e4002b]'
                    }`}>
                      {result.similarity}%
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold mb-2 text-[#1c1e21]">{result.feedback}</div>
                      {result.isCorrect && (
                        <div className="text-sm text-[#00a400] font-medium">🎉 Tuyệt vời! Bạn đã làm đúng!</div>
                      )}
                    </div>
                  </div>

                  {result.mistakes.length > 0 && (
                    <div className="mb-4 p-4 bg-white/70 rounded-lg">
                      <h4 className="font-bold mb-2 text-[#e4002b] flex items-center gap-2">
                        <span>❌</span> Những lỗi cần sửa:
                      </h4>
                      <ul className="ml-6 list-disc space-y-1">
                        {result.mistakes.map((mistake, i) => (
                          <li key={i} className="text-sm text-[#1c1e21]">{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.suggestions.length > 0 && (
                    <div className="mb-4 p-4 bg-white/70 rounded-lg">
                      <h4 className="font-bold mb-2 text-[#0084ff] flex items-center gap-2">
                        <span>💡</span> Gợi ý để cải thiện:
                      </h4>
                      <ul className="ml-6 list-disc space-y-1">
                        {result.suggestions.map((suggestion, i) => (
                          <li key={i} className="text-sm text-[#1c1e21]">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t-2 border-white/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                        <span className="text-xs font-semibold text-[#65676b] uppercase tracking-wider">Bạn gõ:</span>
                        <span className="text-lg font-bold tracking-wide text-[#1c1e21]">{userInput}</span>
                      </div>
                      <div 
                        className="flex items-center gap-3 p-3 bg-white/70 rounded-lg cursor-pointer hover:bg-white transition-all" 
                        onClick={() => onPronounce(currentPhrase.chinese)}
                      >
                        <span className="text-xs font-semibold text-[#65676b] uppercase tracking-wider">Đáp án:</span>
                        <span className="text-lg font-bold tracking-wide text-[#1c1e21]">{currentPhrase.pinyin}</span>
                        <span className="ml-auto">🔊</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {speechResult && (
                <div className="p-6 bg-gradient-to-br from-[#e7f3ff] to-[#f0f8ff] border-2 border-[#0084ff] rounded-xl mb-6 shadow-md">
                  <h4 className="mb-4 text-lg font-bold text-[#1c1e21] flex items-center gap-2">
                    <span className="text-2xl">🎤</span> Kết quả nhận diện giọng nói
                  </h4>
                  <div className="space-y-3">
                    <div className="flex gap-4 p-3 bg-white/70 rounded-lg">
                      <span className="text-sm font-semibold text-[#65676b] min-w-[130px]">Hệ thống nghe:</span>
                      <span className="font-bold text-[#1c1e21] text-lg">{speechResult.transcript}</span>
                    </div>
                    <div className="flex gap-4 p-3 bg-white/70 rounded-lg">
                      <span className="text-sm font-semibold text-[#65676b] min-w-[130px]">Đáp án đúng:</span>
                      <span className="font-bold text-[#1c1e21] text-lg">{currentPhrase.chinese}</span>
                    </div>
                    <div className="flex gap-4 p-3 bg-white/70 rounded-lg">
                      <span className="text-sm font-semibold text-[#65676b] min-w-[130px]">Độ tin cậy:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#0084ff] to-[#00a400] transition-all duration-300"
                            style={{ width: `${speechResult.confidence}%` }}
                          />
                        </div>
                        <span className="font-bold text-[#0084ff] text-lg">{speechResult.confidence}%</span>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white/70 rounded-lg border-l-4 border-[#0084ff]">
                      <div className="text-sm italic text-[#1c1e21] leading-relaxed">{speechResult.feedback}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#fff4e6] to-[#fffbf5] border-2 border-[#f57c00] rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold mb-4 text-[#1c1e21] flex items-center gap-2">
              <span className="text-2xl">📖</span> Hướng dẫn sử dụng
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/70 p-4 rounded-lg">
                <div className="font-bold text-[#f57c00] mb-2">⌨️ Cách nhập Pinyin</div>
                <ul className="text-sm text-[#1c1e21] space-y-1.5 ml-4 list-disc">
                  <li>Gõ chữ cái + số thanh (1-4)</li>
                  <li>Thanh 1: ā, Thanh 2: á, Thanh 3: ǎ, Thanh 4: à</li>
                  <li>Ví dụ: <code className="bg-white px-2 py-0.5 rounded">ni3hao3</code> → nǐ hǎo</li>
                </ul>
              </div>
              <div className="bg-white/70 p-4 rounded-lg">
                <div className="font-bold text-[#f57c00] mb-2">⚡ Phím tắt</div>
                <ul className="text-sm text-[#1c1e21] space-y-1.5 ml-4 list-disc">
                  <li><kbd className="bg-white px-2 py-0.5 rounded border">Enter</kbd> để kiểm tra</li>
                  <li><kbd className="bg-white px-2 py-0.5 rounded border">Enter</kbd> để sang câu tiếp</li>
                  <li>Tự động thêm khoảng trắng khi gõ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
