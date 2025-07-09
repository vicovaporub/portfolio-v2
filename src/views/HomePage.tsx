'use client';

import { useTabs } from '@/hooks/useTabs';
import Sidebar from "@/components/sidebar/Sidebar";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import WelcomePage from "@/views/WelcomePage";
import { useEffect, useCallback, useState } from 'react';
import { Tab } from '@/types/tabs';
import AboutPage from "@/views/AboutPage";
import SkillsPage from "@/views/SkillsPage";
import ContactPage from "@/views/ContactPage";
import ProjectsPage from './ProjectsPage';

export default function HomePage() {
  const { tabs, openTab, closeTab, activateTab } = useTabs();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['nav-menu']));

  // Função para recolher um item
  const collapseItem = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  // Função para abrir tabs a partir do WelcomePage
  const handleWelcomeAction = useCallback((fileId: string) => {
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
          content: <ProjectsPage />, 
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
    openTab(tab);
  }, [openTab]);

  useEffect(() => {
    if (tabs.length === 0) {
      const welcomeTab: Tab = {
        id: 'welcome',
        title: 'welcome.tsx',
        content: <WelcomePage onOpenFile={handleWelcomeAction} />, // Passa a função aqui
        isActive: true
      };
      openTab(welcomeTab);
    }
  }, [tabs.length, openTab, handleWelcomeAction]);

  // Função para fechar tab e recolher item na sidebar
  const handleTabClose = (tabId: string) => {
    closeTab(tabId);
    if (tabId === 'projects') {
      collapseItem('projects');
    }
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-[var(--background)]">
      {/* Padding top no mobile para não ficar atrás do botão hambúrguer */}
      <div className="md:contents pt-14 md:pt-0 flex-1 flex">
        <Sidebar
          onTabOpen={openTab}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
        />
        <PortfolioTab 
          tabs={tabs}
          onTabClose={handleTabClose}
          onTabActivate={activateTab}
        />
      </div>
    </main>
  );
}