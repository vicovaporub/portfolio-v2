'use client';

import { useState } from 'react';
import ProjectView from './ProjectView';
import ProjectsPage from '../pages/ProjectsPage';
import ThemeToggle from './ThemeToggle';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  children?: SidebarItem[];
}

interface Tab {
  id: string;
  title: string;
  content: string | React.ReactNode;
  isActive: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'explorer',
    label: 'VICTOR CASTRO',
    icon: '📁',
    isActive: true,
    children: [
      {
        id: 'about',
        label: 'about.md',
        icon: '📄'
      },
      {
        id: 'projects',
        label: 'projects/',
        icon: '📂',
        children:
        [
          { id: 'project1', label: 'project-1.tsx', icon: '⚛️' },
          { id: 'project2', label: 'project-2.tsx', icon: '⚛️' },
          { id: 'project3', label: 'project-3.tsx', icon: '⚛️' },
        ]
      },
      {
        id: 'skills',
        label: 'skills.json',
        icon: '⚙️'
      },
      {
        id: 'contact',
        label: 'contact.ts',
        icon: '📧'
      },
    ]
  },
];

interface SidebarProps {
  onTabOpen?: (tab: Tab) => void;
}

export default function Sidebar({ onTabOpen }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['explorer', 'projects']));

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: SidebarItem) => {
    if (onTabOpen) {
      let content: string | React.ReactNode;
      
      if (item.id === 'projects') {
        content = <ProjectsPage />;
      } else if (item.id.startsWith('project')) {
        content = <ProjectView projectId={item.id} />;
      } else {
        content = `# ${item.label}\n\nThis is a placeholder content for ${item.label}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
      }
      
      const tab: Tab = {
        id: item.id,
        title: item.label,
        content: content,
        isActive: true
      };
      onTabOpen(tab);
    }
  };

  const renderItem = (item: SidebarItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = item.isActive;

    return (
      <div key={item.id}>
        <div
          className={`
            flex items-center px-2 py-1 text-xs cursor-pointer transition-all duration-150 select-none theme-transition
            ${depth > 0 ? 'ml-3' : ''}
            ${isActive 
              ? 'bg-[var(--accent-blue-light)] text-[var(--accent-blue)] font-medium' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'
            }
            ${depth === 0 ? 'font-semibold tracking-wide' : 'font-normal'}
          `}
          onClick={() => {
            if (hasChildren) {
              toggleItem(item.id);
              // Also open tab for folders
              handleItemClick(item);
            } else {
              handleItemClick(item);
            }
          }}
        >
          {hasChildren && (
            <span className={`mr-1.5 text-[8px] transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
          )}
          {!hasChildren && depth > 0 && (
            <div className="w-4 mr-1.5 flex justify-center">
              <span className="text-[8px] text-[var(--text-muted)]">•</span>
            </div>
          )}
          <span className="mr-2 text-[10px] opacity-70">{item.icon}</span>
          <span className={`truncate ${depth === 0 ? 'text-[10px]' : 'text-[10px]'}`}>
            {item.label}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-1 border-l border-[var(--border)]/30">
            {item.children!.map(child => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-60 h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex flex-col font-mono theme-transition">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[var(--border)] bg-[var(--sidebar-header-bg)]">
        <div className="flex items-center space-x-2">
          <h2 className="text-[var(--text-primary)] font-semibold text-[11px] tracking-wide uppercase">Portfolio</h2>
        </div>
        <div className="flex items-center space-x-1">
          <ThemeToggle />
          <div className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer flex items-center justify-center">
            <span className="text-[10px]">⋮</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto sidebar-scrollbar">
        <div className="py-1">
          {sidebarItems.map(item => renderItem(item))}
        </div>
      </div>

      <div className="border-t border-[var(--border)] p-2 bg-[var(--sidebar-header-bg)]">
        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
          <span>Victor Castro</span>
          <span>2025</span>
        </div>
      </div>
    </div>
  );
} 