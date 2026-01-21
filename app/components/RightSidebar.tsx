import { type Vocabulary } from '../data';
import { BookOpen, Search, Volume2, ChevronLeft, ArrowRight, SearchX } from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  results: Vocabulary[];
  onVocabularyClick: (vocabulary: Vocabulary) => void;
  onPronounce: (text: string) => void;
}

export default function RightSidebar({
  isOpen,
  onToggle,
  searchQuery,
  onSearchChange,
  results,
  onVocabularyClick,
  onPronounce,
}: RightSidebarProps) {
  return (
    <aside className={`${isOpen ? 'w-80' : 'w-0'} bg-card border-l border-border flex flex-col transition-all duration-300 overflow-hidden`}>
      {isOpen && (
        <>
          <div className="flex items-center justify-between p-5 border-b border-border min-h-[64px]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">Từ điển</h2>
                <p className="text-xs text-muted-foreground">Tra cứu nhanh</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="bg-secondary hover:bg-secondary/80 w-9 h-9 rounded-lg cursor-pointer text-muted-foreground text-sm transition-all duration-200 hover:text-foreground hover:shadow-sm flex-shrink-0 flex items-center justify-center"
              aria-label="Close dictionary"
            >
              <ChevronLeft className="w-4 h-4 transform rotate-180" />
            </button>
          </div>

          <div className="p-5 border-b border-border">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Nhập từ cần tra..."
                className="w-full pl-4 pr-14 py-3.5 bg-secondary/50 border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 text-foreground placeholder:text-muted-foreground transition-all"
              />
              <button
                onClick={() => { }}
                disabled
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Result */}
          {searchQuery && results.length > 0 && (
            <div className="p-5 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <ArrowRight className="w-3 h-3" />
                Kết quả ({results.length})
              </p>
              {results.slice(0, 3).map((vocab, index) => (
                <div key={index} className="p-5 bg-linear-to-br from-accent/5 to-accent/10 rounded-2xl border border-accent/10 mb-3 last:mb-0">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl font-bold text-foreground">{vocab.chinese}</span>
                    <button
                      onClick={() => onPronounce(vocab.chinese)}
                      className="p-2.5 hover:bg-accent/10 rounded-xl transition-colors group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform inline-block">
                        <Volume2 className="w-5 h-5 text-accent" />
                      </span>
                    </button>
                  </div>
                  <p className="text-accent font-semibold text-lg mb-1">{vocab.pinyin}</p>
                  <p className="text-muted-foreground">{vocab.vietnamese}</p>
                </div>
              ))}
            </div>
          )}

          {/* Results List */}
          <div className="flex-1 p-5 overflow-auto">
            {!searchQuery ? (
              <div className="text-center py-12 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/5 mb-4">
                  <Search className="w-8 h-8 text-accent/50" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nhập từ tiếng Trung, pinyin hoặc nghĩa tiếng Việt để tra cứu
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/5 mb-4">
                  <SearchX className="w-8 h-8 text-destructive/50" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">Không tìm thấy kết quả</p>
                <p className="text-xs text-muted-foreground mt-2">Thử tìm từ khác nhé!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((vocab, index) => (
                  <button
                    key={index}
                    onClick={() => onVocabularyClick(vocab)}
                    className="w-full p-4 bg-secondary/30 hover:bg-secondary/60 rounded-2xl text-left transition-all duration-200 group hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl font-bold text-foreground">{vocab.chinese}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        {vocab.hskLevel}
                      </span>
                    </div>
                    <p className="text-sm text-accent font-medium">{vocab.pinyin}</p>
                    <p className="text-sm text-muted-foreground">{vocab.vietnamese}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="p-5 border-t border-border">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
              <p className="text-sm text-primary font-semibold mb-1">Mẹo học tập</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Luyện tập 10-15 phút mỗi ngày giúp bạn tiến bộ nhanh hơn việc học dồn vào một ngày.
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
