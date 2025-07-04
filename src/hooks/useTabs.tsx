import { useState, useCallback } from 'react';
import { Tab } from '@/types/tabs';

export function useTabs() {
  const [tabs, setTabs] = useState<Tab[]>([]);

  // Função para abrir um tab
  const openTab = useCallback((newTab: Tab) => {
    setTabs(prevTabs => {
      const updatedTabs = prevTabs.map(tab => ({ ...tab, isActive: false }));
      const existingTabIndex = updatedTabs.findIndex(tab => tab.id === newTab.id);
      if (existingTabIndex >= 0) {
        updatedTabs[existingTabIndex].isActive = true;
      } else {
        updatedTabs.push(newTab);
      }
      // Welcome tab sempre primeiro
      const welcomeTab = updatedTabs.find(tab => tab.id === 'welcome');
      const otherTabs = updatedTabs.filter(tab => tab.id !== 'welcome');
      return welcomeTab ? [welcomeTab, ...otherTabs] : updatedTabs;
    });
  }, []);

  // Função para fechar um tab
  const closeTab = useCallback((tabId: string) => {
    if (tabId === 'welcome') return;
    setTabs(prevTabs => {
      const updatedTabs = prevTabs.filter(tab => tab.id !== tabId);
      if (prevTabs.find(tab => tab.id === tabId)?.isActive) {
        const welcomeTab = updatedTabs.find(tab => tab.id === 'welcome');
        if (welcomeTab) welcomeTab.isActive = true;
      }
      return updatedTabs;
    });
  }, []);

  // Função para ativar um tab
  const activateTab = useCallback((tabId: string) => {
    setTabs(prevTabs => prevTabs.map(tab => ({ ...tab, isActive: tab.id === tabId })));
  }, []);

  return { tabs, openTab, closeTab, activateTab };
} 