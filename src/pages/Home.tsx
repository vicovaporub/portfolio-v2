'use client';

import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import PortfolioTab from "@/components/PortfolioTab";
import WelcomeView from "@/components/WelcomeView";

interface Tab {
  id: string;
  title: string;
  content: string | React.ReactNode;
  isActive: boolean;
}

export default function HomePage() {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const handleTabOpen = (newTab: Tab) => {
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
  };

  const handleTabClose = (tabId: string) => {
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    
    // If we closed the active tab, activate the last remaining tab
    if (updatedTabs.length > 0 && tabs.find(tab => tab.id === tabId)?.isActive) {
      updatedTabs[updatedTabs.length - 1].isActive = true;
    }
    
    setTabs(updatedTabs);
  };

  const handleTabActivate = (tabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    }));
    setTabs(updatedTabs);
  };

  const handleWelcomeAction = (fileId: string) => {
    // Create a tab based on the fileId from welcome view
    const tab: Tab = {
      id: fileId,
      title: fileId === 'about' ? 'about.md' : 
             fileId === 'projects' ? 'projects/' :
             fileId === 'skills' ? 'skills.json' :
             fileId === 'contact' ? 'contact.ts' : fileId,
      content: `# ${fileId}\n\nThis is a placeholder content for ${fileId}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      isActive: true
    };
    handleTabOpen(tab);
  };

  return (
    <main className="flex h-screen">
      <Sidebar onTabOpen={handleTabOpen} />
      {tabs.length > 0 ? (
        <PortfolioTab 
          tabs={tabs}
          onTabClose={handleTabClose}
          onTabActivate={handleTabActivate}
        />
      ) : (
        <WelcomeView onOpenFile={handleWelcomeAction} />
      )}
    </main>
  );
}