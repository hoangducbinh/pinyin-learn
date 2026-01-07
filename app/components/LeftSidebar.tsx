import { type Phrase } from '../data';

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
  return (
    <aside className={`${isOpen ? 'w-80' : 'w-12'} bg-white border-r border-[#e0e2e5] flex flex-col transition-all duration-200`}>
      <div className="flex items-center justify-between p-4 border-b border-[#e0e2e5] bg-gradient-to-b from-white to-[#f8f9fa] min-h-[64px]">
        {isOpen && (
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <h2 className="text-lg font-bold text-[#1c1e21]">Mẫu câu</h2>
          </div>
        )}
        <button 
          onClick={onToggle}
          className="bg-[#f0f2f5] border-none w-9 h-9 rounded-lg cursor-pointer text-[#65676b] text-sm transition-all duration-200 hover:bg-[#e4e6eb] hover:text-[#1c1e21] hover:shadow-sm flex-shrink-0 flex items-center justify-center"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      
      {isOpen && (
        <>
          <div className="p-4 border-b border-[#e0e2e5] bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm mẫu câu..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-[#e0e2e5] rounded-lg text-sm bg-[#f8f9fa] text-[#1c1e21] placeholder:text-[#8a8d91] transition-all duration-200 focus:outline-none focus:border-[#0084ff] focus:bg-white focus:shadow-[0_0_0_3px_#e7f3ff]"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#65676b]">🔍</span>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-[#e0e2e5] bg-[#f8f9fa]">
            <div className="text-xs font-semibold text-[#65676b] mb-2 uppercase tracking-wider">Danh mục</div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`py-2 px-3 border rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat 
                      ? 'bg-[#0084ff] text-white border-[#0084ff] shadow-sm' 
                      : 'bg-white text-[#65676b] border-[#e0e2e5] hover:bg-[#e7f3ff] hover:border-[#0084ff] hover:text-[#0084ff]'
                  }`}
                  onClick={() => onCategoryChange(cat)}
                >
                  {cat === 'all' ? '📋 Tất cả' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-white">
            <div className="text-xs font-semibold text-[#65676b] mb-3 px-1 uppercase tracking-wider">
              {phrases.length} mẫu câu
            </div>
            {phrases.map((phrase, index) => (
              <div 
                key={index}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                  currentPhrase?.chinese === phrase.chinese 
                    ? 'bg-[#e7f3ff] border-[#0084ff] shadow-sm transform scale-[1.02]' 
                    : 'border-transparent bg-[#f8f9fa] hover:bg-white hover:border-[#e0e2e5] hover:shadow-sm'
                }`}
                onClick={() => onPhraseClick(phrase)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-sm font-medium text-[#1c1e21] leading-relaxed">{phrase.vietnamese}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wide flex-shrink-0 ${
                    phrase.difficulty.toLowerCase() === 'easy' ? 'bg-[#e8f5e9] text-[#00a400]' :
                    phrase.difficulty.toLowerCase() === 'medium' ? 'bg-[#fff4e6] text-[#f57c00]' :
                    'bg-[#ffebee] text-[#e4002b]'
                  }`}>
                    {phrase.difficulty}
                  </span>
                </div>
                <div className="text-lg text-[#1c1e21] mb-1 font-medium">{phrase.chinese}</div>
                <div className="text-xs text-[#65676b] font-mono">{phrase.pinyin}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
