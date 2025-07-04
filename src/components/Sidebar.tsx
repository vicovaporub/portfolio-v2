'use client';

import { useContext, useState } from 'react';
import ProjectPage from '../views/ProjectPage';
import ProjectsPage from '../views/ProjectsPage';
import WelcomePage from '../views/WelcomePage';
import ThemeToggle from './ThemeToggle';
import { UserContext } from '@/contexts/UserContext';
import { SidebarItem, SidebarProps } from '@/types/sidebar';
import { Tab } from '@/types/tabs';
import { Project } from '@/types/project';
import AboutPage from "@/views/AboutPage";
import SkillsPage from "@/views/SkillsPage";
import ContactPage from "@/views/ContactPage";

export default function Sidebar({ onTabOpen }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['nav-menu', 'projects']));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, projects } = useContext(UserContext)

  const sidebarItems: SidebarItem[] = [{
    id: 'nav-menu',
    label: user?.name,
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
        children: projects?.map((project: Project) => ({
          id: project?.id?.toString() ?? '',
          label: project?.title ?? '',
          icon: '⚛️',
          type: 'project'
        }))
      },
      {
        id: 'skills',
        label: 'skills.json',
        icon: '📄'
      },
      {
        id: 'contact',
        label: 'contact.ts',
        icon: '📧'
      }
    ]
  }]

  const toggleItem = (itemId: string) => {
    if (itemId === 'nav-menu') return;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: SidebarItem) => {
    if (!onTabOpen) return;
    let content: string | React.ReactNode;

    if (item.id === 'nav-menu') {
      // WelcomePage pode abrir arquivos
      const handleWelcomeAction = (fileId: string) => {
        let tab: Tab;
        switch (fileId) {
          case 'about':
            tab = {
              id: fileId,
              title: 'about.md',
              content: <AboutPage />, 
              isActive: true
            };
            break;
          case 'skills':
            tab = {
              id: fileId,
              title: 'skills.json',
              content: <SkillsPage />, 
              isActive: true
            };
            break;
          case 'contact':
            tab = {
              id: fileId,
              title: 'contact.ts',
              content: <ContactPage />, 
              isActive: true
            };
            break;
          case 'projects':
            tab = {
              id: fileId,
              title: 'projects/',
              content: `# ${fileId}\n\nThis is a placeholder content for ${fileId}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
              isActive: true
            };
            break;
          default:
            tab = {
              id: fileId,
              title: fileId,
              content: `# ${fileId}\n\nThis is a placeholder content for ${fileId}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
              isActive: true
            };
        }
        onTabOpen(tab);
      };
      content = <WelcomePage onOpenFile={handleWelcomeAction} />;
      const tab: Tab = {
        id: 'welcome',
        title: 'welcome.tsx',
        content: content,
        isActive: true
      };
      onTabOpen(tab);
      return;
    }

    if (item.id === 'projects') {
      const isProjectsOpen = expandedItems.has('projects');
      if (!isProjectsOpen) {
        content = <ProjectsPage />;
        const tab: Tab = {
          id: item.id,
          title: item.label || '',
          content: content,
          isActive: true
        };
        onTabOpen(tab);
      }
      toggleItem(item.id);
      return;
    } else if (item.type === 'project') {
      content = <ProjectPage projectId={item.id} />;
    } else if (item.id === 'about') {
      content = <AboutPage />;
    } else if (item.id === 'skills') {
      content = <SkillsPage />;
    } else if (item.id === 'contact') {
      content = <ContactPage />;
    } else {
      content = `# ${item.label}\n\nThis is a placeholder content for ${item.label}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    }
    const tab: Tab = {
      id: item.id,
      title: item.label || '',
      content: content,
      isActive: true
    };
    onTabOpen(tab);
  };

  const renderItem = (item: SidebarItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;

    const isExpanded = item.id === 'nav-menu' ? true : expandedItems.has(item.id);
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
              // nav-menu não alterna
              if (item.id !== 'nav-menu') toggleItem(item.id);
              // Lógica de abrir tab para projects/ já está em handleItemClick
              handleItemClick(item);
            } else {
              handleItemClick(item);
            }
          }}
        >
          {/* Só mostra seta se não for nav-menu */}
          {hasChildren && item.id !== 'nav-menu' && (
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

  // Botão de menu hambúrguer para mobile
  const HamburgerButton = (
    <button
      className="md:hidden fixed top-3 left-3 z-40 bg-[var(--sidebar-bg)] border border-[var(--border)] rounded p-2 shadow-lg"
      onClick={() => setDrawerOpen(true)}
      aria-label="Abrir menu"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)]"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
    </button>
  );

  // Sidebar como drawer no mobile
  const SidebarDrawer = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
        aria-label="Fechar menu"
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 max-w-full bg-[var(--sidebar-bg)] border-r border-[var(--border)] z-50 flex flex-col font-mono theme-transition transform transition-transform duration-200 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-60 md:h-screen md:z-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-[var(--border)] bg-[var(--sidebar-header-bg)]">
          <div className="flex items-center space-x-2">
            <h2 className="text-[var(--text-primary)] font-semibold text-[11px] tracking-wide uppercase">Portfolio</h2>
          </div>
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            {/* Mobile close button */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" /></svg>
            </button>
            <div className="hidden md:flex w-4 h-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer items-center justify-center">
              <span className="text-[10px]">⋮</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto sidebar-scrollbar">
          <div className="py-1">
            {sidebarItems.map(item => renderItem(item))}
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-[var(--border)] p-2 bg-[var(--sidebar-header-bg)]">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
            <span>
              {user?.name}
            </span>
            <span>2025</span>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {/* Hamburger button - mobile only */}
      {HamburgerButton}
      {/* Sidebar as drawer on mobile, fixed on desktop */}
      <div className="md:block">
        {SidebarDrawer}
      </div>
    </>
  );
} 