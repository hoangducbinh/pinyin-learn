import { type Phrase } from '../data/phrases';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  results: Phrase[];
  onPhraseClick: (phrase: Phrase) => void;
  onPronounce: (text: string) => void;
}

export default function RightSidebar({
  isOpen,
  onToggle,
  searchQuery,
  onSearchChange,
  results,
  onPhraseClick,
  onPronounce,
}: RightSidebarProps) {
  return (
    <aside className={`${isOpen ? 'w-[350px]' : 'w-12'} bg-white border-l border-[#e0e2e5] flex flex-col transition-all duration-200`}>
      <div className="flex items-center justify-between p-4 border-b border-[#e0e2e5] bg-gradient-to-b from-white to-[#f8f9fa] min-h-[64px]">
        <button 
          onClick={onToggle}
          className="bg-[#f0f2f5] border-none w-9 h-9 rounded-lg cursor-pointer text-[#65676b] text-sm transition-all duration-200 hover:bg-[#e4e6eb] hover:text-[#1c1e21] hover:shadow-sm flex-shrink-0 flex items-center justify-center"
        >
          {isOpen ? '▶' : '◀'}
        </button>
        {isOpen && (
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="text-lg font-bold text-[#1c1e21]">Tra cứu</h2>
          </div>
        )}
      </div>

      {isOpen && (
        <>
          <div className="p-4 border-b border-[#e0e2e5] bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="🔎 Tìm từ, pinyin, nghĩa..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-[#e0e2e5] rounded-lg text-sm bg-[#f8f9fa] transition-all duration-200 focus:outline-none focus:border-[#0084ff] focus:bg-white focus:shadow-[0_0_0_3px_#e7f3ff]"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#65676b]">🔎</span>
            </div>
            {searchQuery && (
              <div className="mt-2 text-xs text-[#65676b]">
                Tìm thấy <strong className="text-[#0084ff]">{results.length}</strong> kết quả
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-[#f8f9fa]">
            {!searchQuery ? (
              <div className="text-center py-12 px-4">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-sm text-[#8a8d91] leading-relaxed">
                  Nhập từ tiếng Trung, pinyin hoặc nghĩa tiếng Việt để tra cứu
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="text-5xl mb-4">😔</div>
                <p className="text-sm text-[#8a8d91] font-medium">Không tìm thấy kết quả</p>
                <p className="text-xs text-[#8a8d91] mt-2">Thử tìm từ khác nhé!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((phrase, index) => (
                  <div 
                    key={index}
                    className="bg-white p-4 rounded-lg border border-[#e0e2e5] hover:border-[#0084ff] hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => onPhraseClick(phrase)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-2xl font-bold text-[#1c1e21]">{phrase.chinese}</div>
                      <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wide flex-shrink-0 ${
                        phrase.difficulty.toLowerCase() === 'easy' ? 'bg-[#e8f5e9] text-[#00a400]' :
                        phrase.difficulty.toLowerCase() === 'medium' ? 'bg-[#fff4e6] text-[#f57c00]' :
                        'bg-[#ffebee] text-[#e4002b]'
                      }`}>
                        {phrase.difficulty}
                      </span>
                    </div>
                    <div className="text-sm text-[#0084ff] font-mono mb-2">{phrase.pinyin}</div>
                    <div className="text-sm text-[#65676b] leading-relaxed">{phrase.vietnamese}</div>
                    <div className="mt-3 pt-3 border-t border-[#f0f2f5] flex items-center justify-between">
                      <span className="text-xs text-[#8a8d91] uppercase tracking-wide">{phrase.category}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onPronounce(phrase.chinese);
                        }}
                        className="text-sm px-3 py-1 bg-[#f0f2f5] rounded hover:bg-[#e7f3ff] hover:text-[#0084ff] transition-all"
                      >
                        🔊 Nghe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
