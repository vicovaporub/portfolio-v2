'use client';

import { useState } from 'react';
import ProjectView from './ProjectView';

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
    label: 'EXPLORER',
    icon: '📁',
    isActive: true,
    children: [
      { id: 'about', label: 'about.md', icon: '📄' },
      { id: 'projects', label: 'projects/', icon: '📂', children: [
        { id: 'project1', label: 'project-1.tsx', icon: '⚛️' },
        { id: 'project2', label: 'project-2.tsx', icon: '⚛️' },
        { id: 'project3', label: 'project-3.tsx', icon: '⚛️' },
      ]},
      { id: 'skills', label: 'skills.json', icon: '⚙️' },
      { id: 'contact', label: 'contact.ts', icon: '📧' },
    ]
  },
  {
    id: 'search',
    label: 'SEARCH',
    icon: '🔍',
  },
  {
    id: 'source-control',
    label: 'SOURCE CONTROL',
    icon: '📊',
  },
  {
    id: 'run-and-debug',
    label: 'RUN AND DEBUG',
    icon: '🐛',
  },
  {
    id: 'extensions',
    label: 'EXTENSIONS',
    icon: '🧩',
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
    // Only open tabs for files (items without children)
    if (!item.children && onTabOpen) {
      let content: string | React.ReactNode;
      
      // Check if it's a project
      if (item.id.startsWith('project')) {
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
            flex items-center px-2 py-1 text-xs cursor-pointer transition-all duration-150 select-none
            ${depth > 0 ? 'ml-3' : ''}
            ${isActive ? 'bg-blue-600/30 text-blue-300 font-medium' : 'text-gray-300 hover:text-white hover:bg-gray-700/40'}
            ${depth === 0 ? 'font-semibold tracking-wide' : 'font-normal'}
          `}
          onClick={() => {
            if (hasChildren) {
              toggleItem(item.id);
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
              <span className="text-[8px] text-gray-500">•</span>
            </div>
          )}
          <span className="mr-2 text-[10px] opacity-70">{item.icon}</span>
          <span className={`truncate ${depth === 0 ? 'text-[10px]' : 'text-[10px]'}`}>
            {item.label}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-1 border-l border-gray-700/20">
            {item.children!.map(child => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-60 h-screen bg-[#1e1e1e] border-r border-[#3c3c3c] flex flex-col font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#3c3c3c] bg-[#2d2d30]">
        <h2 className="text-white font-semibold text-[11px] tracking-wide uppercase">Portfolio</h2>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27ca3f]"></div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto sidebar-scrollbar">
        <div className="py-1">
          {sidebarItems.map(item => renderItem(item))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#3c3c3c] p-2 bg-[#2d2d30]">
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
} 