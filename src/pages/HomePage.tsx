'use client';

import { useState, useCallback, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import WelcomePage from "@/pages/WelcomePage";
import AboutPage from "@/pages/AboutPage";
import SkillsPage from "@/pages/SkillsPage";
import ContactPage from "@/pages/ContactPage";
import { Tab } from '@/types/tabs';

export default function HomePage() {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const handleTabOpen = useCallback((newTab: Tab) => {
    // Deactivate all existing tabs
    const updatedTabs = tabs.map(tab => ({ ...tab, isActive: false }));
    
    // Check if tab already exists
    const existingTabIndex = updatedTabs.findIndex(tab => tab.id === newTab.id);
    
    if (existingTabIndex >= 0) {
      // Activate existing tab
      updatedTabs[existingTabIndex].isActive = true;
    } else {
      // Add new tab
      updatedTabs.push(newTab);
    }
    
    setTabs(updatedTabs);
  }, [tabs]);

  const handleWelcomeAction = useCallback((fileId: string) => {
    // Create a tab based on the fileId from welcome view
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
    
    handleTabOpen(tab);
  }, [handleTabOpen]);

  const handleTabClose = useCallback((tabId: string) => {
    // Prevent closing the welcome tab
    if (tabId === 'welcome') return;
    
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    
    // If we closed the active tab, activate the welcome tab
    if (tabs.find(tab => tab.id === tabId)?.isActive) {
      const welcomeTab = updatedTabs.find(tab => tab.id === 'welcome');
      if (welcomeTab) {
        welcomeTab.isActive = true;
      }
    }
    
    setTabs(updatedTabs);
  }, [tabs]);

  const handleTabActivate = useCallback((tabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    }));
    setTabs(updatedTabs);
  }, [tabs]);

  // Initialize with welcome tab on component mount
  useEffect(() => {
    if (tabs.length === 0) {
      setTabs([
        {
          id: 'welcome',
          title: 'welcome.tsx',
          content: <WelcomePage onOpenFile={handleWelcomeAction} />,
          isActive: true
        }
      ]);
    }
  }, [tabs.length, handleWelcomeAction]);

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-[var(--background)]">
      {/* Padding top no mobile para não ficar atrás do botão hambúrguer */}
      <div className="md:contents pt-14 md:pt-0 flex-1 flex">
        <Sidebar
          onTabOpen={handleTabOpen}
        />
        <PortfolioTab 
          tabs={tabs}
          onTabClose={handleTabClose}
          onTabActivate={handleTabActivate}
        />
      </div>
    </main>
  );
}