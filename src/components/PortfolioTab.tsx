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
    if (title.endsWith('.md')) return 'text-[var(--accent-blue)]';
    if (title.endsWith('.tsx') || title.endsWith('.ts')) return 'text-[var(--accent-blue)]';
    if (title.endsWith('.json')) return 'text-[var(--text-secondary)]';
    if (title.endsWith('/')) return 'text-[var(--text-secondary)]';
    return 'text-[var(--text-secondary)]';
  };

  const renderContent = (content: string | React.ReactNode) => {
    if (typeof content === 'string') {
      return (
        <div className="p-4">
          <div className="bg-[var(--background-secondary)] rounded border border-[var(--border)] p-6 theme-transition">
            <div className="text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed whitespace-pre-wrap">
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
    <div className="flex-1 flex flex-col bg-[var(--background)] theme-transition">
      {/* Tab Bar */}
      <div className="flex bg-[var(--tab-bg)] border-b border-[var(--tab-border)] min-h-[35px] theme-transition">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center px-4 py-2 cursor-pointer transition-all duration-150 select-none theme-transition
              ${tab.isActive 
                ? 'bg-[var(--tab-active-bg)] text-[var(--text-primary)] border-r border-[var(--tab-border)]' 
                : 'bg-[var(--tab-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'
              }
            `}
            onClick={() => onTabActivate?.(tab.id)}
          >
            <span className="mr-2 text-[10px] opacity-70">{getFileIcon(tab.title)}</span>
            <span className={`text-[11px] font-mono ${getFileColor(tab.title)}`}>
              {tab.title}
            </span>
            <button
              className="ml-3 w-4 h-4 rounded hover:bg-[var(--hover-bg)] flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose?.(tab.id);
              }}
            >
              <span className="text-[8px] text-[var(--text-muted)] hover:text-[var(--text-primary)]">×</span>
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