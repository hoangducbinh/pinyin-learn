import { type Phrase } from '../data';
import { GraduationCap, Search, ChevronRight, SlidersHorizontal, X, Check } from 'lucide-react';
import { useState } from 'react';

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  phrases: Phrase[];
  currentPhrase: Phrase | null;
  onPhraseClick: (phrase: Phrase) => void;
}

const levelConfig: Record<string, { label: string; color: string }> = {
  easy: { label: "Dễ", color: "bg-success/15 text-success" },
  medium: { label: "TB", color: "bg-warning/15 text-warning" },
  hard: { label: "Khó", color: "bg-destructive/15 text-destructive" },
};

const difficulties = [
  { id: 'all', label: 'Tất cả' },
  { id: 'easy', label: 'Dễ' },
  { id: 'medium', label: 'Trung bình' },
  { id: 'hard', label: 'Khó' },
];

export default function LeftSidebar({
  isOpen,
  onToggle,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  searchQuery,
  onSearchChange,
  phrases,
  currentPhrase,
  onPhraseClick,
}: LeftSidebarProps) {
  const [showFilter, setShowFilter] = useState(false);

  const stats = {
    total: phrases.length,
    easy: phrases.filter((p) => p.difficulty === 'easy').length,
    medium: phrases.filter((p) => p.difficulty === 'medium').length,
    hard: phrases.filter((p) => p.difficulty === 'hard').length,
  };

  return (
    <aside className={`${isOpen ? 'w-80' : 'w-0'} bg-card border-r border-border flex flex-col transition-all duration-300 overflow-hidden relative`}>
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

          <div className="p-5 pb-2 border-b border-border">
            {/* Search & Filter Trigger */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilter(true)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${selectedCategory !== 'all' || selectedDifficulty !== 'all'
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-secondary/50 border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                title="Bộ lọc"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tags Display (Optional - shows what's selected) */}
            {(selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                    {selectedCategory}
                    <button onClick={() => onCategoryChange('all')} className="hover:text-primary/70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedDifficulty !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                    {difficulties.find(d => d.id === selectedDifficulty)?.label}
                    <button onClick={() => onDifficultyChange('all')} className="hover:text-primary/70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
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

          {/* Filter Modal Overlay */}
          {showFilter && (
            <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="w-full bg-card border border-border rounded-2xl shadow-xl p-5 space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Bộ lọc</h3>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="p-1 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Difficulty Section */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Độ khó</p>
                  <div className="grid grid-cols-2 gap-2">
                    {difficulties.map(diff => (
                      <button
                        key={diff.id}
                        onClick={() => onDifficultyChange(diff.id)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${selectedDifficulty === diff.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-secondary/50 text-foreground hover:bg-secondary'
                          }`}
                      >
                        {diff.label}
                        {selectedDifficulty === diff.id && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Section */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Danh mục</p>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedCategory === cat
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border text-muted-foreground hover:border-foreground/20'
                          }`}
                      >
                        {cat === 'all' ? 'Tất cả' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowFilter(false)}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
                >
                  Áp dụng bộ lọc
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
