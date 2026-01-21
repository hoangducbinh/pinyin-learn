import { type Phrase } from '../data';
import { type ComparisonResult } from '../utils/comparison';
import { Sparkles, Volume2, Check, RotateCcw, Mic, ChevronRight, ChevronLeft, Lightbulb, X, Moon, Sun, Languages, ChevronDown } from 'lucide-react';

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
  streak: number;
  onReset: () => void;
  leftSidebarOpen: boolean;
  onToggleLeftSidebar: () => void;
  rightSidebarOpen: boolean;
  onToggleRightSidebar: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const levelConfig = {
  easy: { label: "Dễ", color: "bg-success/10 text-success border-success/20" },
  medium: { label: "Trung bình", color: "bg-warning/10 text-warning border-warning/20" },
  hard: { label: "Khó", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

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
  streak,
  onReset,
  leftSidebarOpen,
  onToggleLeftSidebar,
  rightSidebarOpen,
  onToggleRightSidebar,
  isDark,
  onToggleTheme,
}: PracticeAreaProps) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-background">
      <header className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 min-h-[64px]">
        <div className="flex items-center gap-4">
          {!leftSidebarOpen && (
            <button
              onClick={onToggleLeftSidebar}
              className="bg-secondary hover:bg-secondary/80 w-9 h-9 rounded-lg cursor-pointer text-muted-foreground text-sm transition-all duration-200 hover:text-foreground hover:shadow-sm flex items-center justify-center"
              aria-label="Open sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Luyện tập Pinyin</h1>
            <p className="text-sm text-muted-foreground">Nhập pinyin đúng để học phát âm</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* {streak > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-xl">
              <span className="text-success text-sm font-medium">Streak: {streak}</span>
            </div>
          )} */}
          {currentPhrase && (
            <span className={`px-4 py-2 rounded-xl text-sm font-medium border ${levelConfig[currentPhrase.difficulty].color}`}>
              {levelConfig[currentPhrase.difficulty].label}
            </span>
          )}
          <div className="group relative flex items-center gap-1.5 bg-secondary/30 hover:bg-secondary/50 border border-border/50 hover:border-primary/30 py-1 pl-3 pr-1 rounded-full transition-all duration-300">
            <Languages className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            <div className="relative">
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = availableVoices.find(v => v.name === e.target.value);
                  onVoiceChange(voice || null);
                }}
                className="w-[140px] appearance-none bg-transparent py-1 pl-1 pr-6 text-xs font-medium text-foreground focus:outline-none cursor-pointer truncate"
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
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-3 h-3 text-muted-foreground/70" />
              </div>
            </div>
            <div className="w-px h-4 bg-border/50 mx-0.5" />
            <button
              onClick={onTestVoice}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-background/50 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all shadow-sm active:scale-95"
              title="Test giọng"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 border border-border bg-background rounded-lg cursor-pointer text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-secondary hover:border-primary/50 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {!rightSidebarOpen && (
              <button
                onClick={onToggleRightSidebar}
                className="bg-secondary hover:bg-secondary/80 w-9 h-9 rounded-lg cursor-pointer text-muted-foreground text-sm transition-all duration-200 hover:text-foreground hover:shadow-sm flex items-center justify-center"
                aria-label="Open dictionary"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {currentPhrase && (
            <>
              {/* Word Display Card */}
              <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-xl shadow-foreground/5 border border-border">
                <p className="text-center text-muted-foreground text-lg mb-4">{currentPhrase.vietnamese}</p>

                {/* Chinese Character - Large and Prominent */}
                <p className="text-center text-6xl lg:text-8xl font-bold text-foreground mb-8 tracking-wide">
                  {currentPhrase.chinese}
                </p>

                {/* Audio Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => onPronounce(currentPhrase.chinese)}
                    className="flex items-center gap-3 px-8 py-4 bg-secondary hover:bg-secondary/80 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Volume2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">Nghe phát âm</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Input Section */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-lg shadow-foreground/5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Nhập Pinyin của bạn</h3>
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={onInputChange}
                  onKeyPress={onKeyPress}
                  placeholder="Nhập pinyin tại đây..."
                  disabled={!!result}
                  className={`w-full px-6 py-5 text-xl bg-secondary/50 border-2 rounded-2xl focus:outline-none transition-all text-foreground placeholder:text-muted-foreground ${result?.isCorrect
                    ? "border-success bg-success/5 ring-4 ring-success/20"
                    : result && !result.isCorrect
                      ? "border-destructive bg-destructive/5 ring-4 ring-destructive/20"
                      : "border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                />

                {/* Feedback Message */}
                {result && (
                  <div
                    className={`mt-4 p-4 rounded-2xl flex items-center gap-3 ${result.isCorrect
                      ? "bg-success/10 border border-success/20"
                      : "bg-destructive/10 border border-destructive/20"
                      }`}
                  >
                    {result.isCorrect ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-success">Chính xác!</p>
                          <p className="text-sm text-muted-foreground">Tiếp tục phát huy nhé</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium text-destructive">Chưa đúng</p>
                          <p className="text-sm text-muted-foreground">
                            Đáp án: <span className="font-medium text-foreground">{currentPhrase.pinyin}</span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                {!result ? (
                  <>
                    <button
                      onClick={onCheck}
                      disabled={!userInput.trim()}
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-primary/20"
                    >
                      <Check className="w-5 h-5" />
                      <span className="hidden sm:inline">Kiểm tra</span>
                    </button>
                    <button
                      onClick={onReset}
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-foreground rounded-2xl font-semibold hover:bg-secondary/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span className="hidden sm:inline">Làm lại</span>
                    </button>
                    {isSpeechSupported && (
                      <button
                        onClick={onStartRecording}
                        disabled={isRecording}
                        className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isRecording
                          ? "bg-destructive text-destructive-foreground animate-pulse"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                          }`}
                      >
                        <Mic className="w-5 h-5" />
                        <span className="hidden sm:inline">{isRecording ? "Đang nghe..." : "Nói thử"}</span>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={onNext}
                      className="col-span-3 flex items-center justify-center gap-2 px-6 py-4 bg-success text-success-foreground rounded-2xl font-semibold hover:bg-success/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-success/20"
                    >
                      <ChevronRight className="w-5 h-5" />
                      <span>Câu tiếp theo</span>
                    </button>
                  </>
                )}
              </div>

              {/* Detailed Feedback */}
              {result && result.mistakes.length > 0 && (
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h4 className="font-bold mb-3 text-destructive flex items-center gap-2">
                    <X className="w-5 h-5" /> Những lỗi cần sửa:
                  </h4>
                  <ul className="ml-6 list-disc space-y-1">
                    {result.mistakes.map((mistake, i) => (
                      <li key={i} className="text-sm text-foreground">{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result && result.suggestions.length > 0 && (
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h4 className="font-bold mb-3 text-primary flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" /> Gợi ý để cải thiện:
                  </h4>
                  <ul className="ml-6 list-disc space-y-1">
                    {result.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm text-foreground">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {speechResult && (
                <div className="bg-card rounded-2xl p-6 border-2 border-primary shadow-md">
                  <h4 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                    <Mic className="w-6 h-6 text-primary" /> Kết quả nhận diện giọng nói
                  </h4>
                  <div className="space-y-3">
                    <div className="flex gap-4 p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm font-semibold text-muted-foreground min-w-[130px]">Hệ thống nghe:</span>
                      <span className="font-bold text-foreground text-lg">{speechResult.transcript}</span>
                    </div>
                    <div className="flex gap-4 p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm font-semibold text-muted-foreground min-w-[130px]">Đáp án đúng:</span>
                      <span className="font-bold text-foreground text-lg">{currentPhrase.chinese}</span>
                    </div>
                    <div className="flex gap-4 p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm font-semibold text-muted-foreground min-w-[130px]">Độ tin cậy:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-primary to-success transition-all duration-300"
                            style={{ width: `${speechResult.confidence}%` }}
                          />
                        </div>
                        <span className="font-bold text-primary text-lg">{speechResult.confidence}%</span>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-secondary/50 rounded-lg border-l-4 border-primary">
                      <div className="text-sm italic text-foreground leading-relaxed">{speechResult.feedback}</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
