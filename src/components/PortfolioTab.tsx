'use client';

interface TabProps {
  id: string;
  title: string;
  content: string | React.ReactNode;
  isActive?: boolean;
  onClose?: () => void;
  onActivate?: () => void;
}

interface PortfolioTabProps {
  tabs: TabProps[];
  onTabClose?: (tabId: string) => void;
  onTabActivate?: (tabId: string) => void;
}

export default function PortfolioTab({ tabs, onTabClose, onTabActivate }: PortfolioTabProps) {
  const getFileIcon = (title: string) => {
    if (title.endsWith('.md')) return '📄';
    if (title.endsWith('.tsx') || title.endsWith('.ts')) return '⚛️';
    if (title.endsWith('.json')) return '⚙️';
    if (title.endsWith('/')) return '📂';
    return '📄';
  };

  const getFileColor = (title: string) => {
    if (title.endsWith('.md')) return 'text-blue-400';
    if (title.endsWith('.tsx') || title.endsWith('.ts')) return 'text-blue-300';
    if (title.endsWith('.json')) return 'text-yellow-400';
    if (title.endsWith('/')) return 'text-green-400';
    return 'text-gray-300';
  };

  const renderContent = (content: string | React.ReactNode) => {
    if (typeof content === 'string') {
      return (
        <div className="p-4">
          <div className="bg-[#2d2d30] rounded border border-[#3c3c3c] p-6">
            <div className="text-[11px] text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </div>
      );
    }
    
    // If it's a React component, render it directly
    return content;
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e]">
      {/* Tab Bar */}
      <div className="flex bg-[#2d2d30] border-b border-[#3c3c3c] min-h-[35px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center px-4 py-2 cursor-pointer transition-all duration-150 select-none
              ${tab.isActive 
                ? 'bg-[#1e1e1e] text-white border-r border-[#3c3c3c]' 
                : 'bg-[#2d2d30] text-gray-400 hover:text-white hover:bg-[#3c3c3c]'
              }
            `}
            onClick={() => onTabActivate?.(tab.id)}
          >
            <span className="mr-2 text-[10px] opacity-70">{getFileIcon(tab.title)}</span>
            <span className={`text-[11px] font-mono ${getFileColor(tab.title)}`}>
              {tab.title}
            </span>
            <button
              className="ml-3 w-4 h-4 rounded hover:bg-gray-600 flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose?.(tab.id);
              }}
            >
              <span className="text-[8px] text-gray-400 hover:text-white">×</span>
            </button>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto sidebar-scrollbar">
        {tabs.find(tab => tab.isActive) && (
          renderContent(tabs.find(tab => tab.isActive)?.content)
        )}
      </div>
    </div>
  );
} 