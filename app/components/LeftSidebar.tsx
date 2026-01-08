import { type Phrase } from '../data';
import { GraduationCap, Search, ChevronRight } from 'lucide-react';

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  phrases: Phrase[];
  currentPhrase: Phrase | null;
  onPhraseClick: (phrase: Phrase) => void;
}

const levelConfig = {
  easy: { label: "Dễ", color: "bg-success/15 text-success" },
  medium: { label: "TB", color: "bg-warning/15 text-warning" },
  hard: { label: "Khó", color: "bg-destructive/15 text-destructive" },
};

export default function LeftSidebar({
  isOpen,
  onToggle,
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  phrases,
  currentPhrase,
  onPhraseClick,
}: LeftSidebarProps) {
  const stats = {
    total: phrases.length,
    easy: phrases.filter((p) => p.difficulty === 'easy').length,
    medium: phrases.filter((p) => p.difficulty === 'medium').length,
    hard: phrases.filter((p) => p.difficulty === 'hard').length,
  };

  return (
    <aside className={`${isOpen ? 'w-80' : 'w-0'} bg-card border-r border-border flex flex-col transition-all duration-300 overflow-hidden`}>
      {isOpen && (
        <>
          <div className="flex items-center justify-between p-5 border-b border-border min-h-[64px]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Mẫu câu</h1>
                <p className="text-xs text-muted-foreground">{stats.total} mẫu câu</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="bg-secondary hover:bg-secondary/80 w-9 h-9 rounded-lg cursor-pointer text-muted-foreground text-sm transition-all duration-200 hover:text-foreground hover:shadow-sm flex-shrink-0 flex items-center justify-center"
              aria-label="Close sidebar"
            >
              <ChevronRight className="w-4 h-4 transform rotate-180" />
            </button>
          </div>

          <div className="p-5 border-b border-border">
            {/* Stats Bar */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 p-2.5 bg-success/10 rounded-xl text-center">
                <span className="text-lg font-bold text-success">{stats.easy}</span>
                <p className="text-[10px] text-muted-foreground">Dễ</p>
              </div>
              <div className="flex-1 p-2.5 bg-warning/10 rounded-xl text-center">
                <span className="text-lg font-bold text-warning">{stats.medium}</span>
                <p className="text-[10px] text-muted-foreground">Trung bình</p>
              </div>
              <div className="flex-1 p-2.5 bg-destructive/10 rounded-xl text-center">
                <span className="text-lg font-bold text-destructive">{stats.hard}</span>
                <p className="text-[10px] text-muted-foreground">Khó</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm mẫu câu..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`py-2 px-3 border rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ${selectedCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-secondary/30 text-foreground border-border hover:bg-secondary/60'
                    }`}
                  onClick={() => onCategoryChange(cat)}
                >
                  {cat === 'all' ? 'Tất cả' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Phrases List */}
          <div className="flex-1 overflow-auto p-3">
            <div className="space-y-2">
              {phrases.map((phrase, index) => {
                const isSelected = currentPhrase?.chinese === phrase.chinese;
                return (
                  <button
                    key={index}
                    onClick={() => onPhraseClick(phrase)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 group hover:scale-[1.01] ${isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                      : "bg-secondary/30 hover:bg-secondary/60"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                        {phrase.vietnamese}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isSelected ? "bg-primary-foreground/20 text-primary-foreground" : levelConfig[phrase.difficulty].color
                          }`}
                      >
                        {levelConfig[phrase.difficulty].label}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold mb-1 ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                      {phrase.chinese}
                    </p>
                    <p className={`text-sm ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {phrase.pinyin}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
