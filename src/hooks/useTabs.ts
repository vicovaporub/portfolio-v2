import { useState, useCallback } from 'react';
import { Tab } from '@/types/tabs';

function orderTabs(tabs: Tab[]) {
    const welcomeTab = tabs.find(tab => tab.id === 'welcome');
    const otherTabs = tabs.filter(tab => tab.id !== 'welcome');
    return welcomeTab ? [welcomeTab, ...otherTabs] : otherTabs;
}

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
                updatedTabs.push({ ...newTab, isActive: true });
            }
            return orderTabs(updatedTabs);
        });
    }, []);

    // Função para fechar um tab (exceto welcome)
    const closeTab = useCallback((tabId: string) => {
        if (tabId === 'welcome') return;
        setTabs(prevTabs => {
            let updatedTabs = prevTabs.filter(tab => tab.id !== tabId);
            // Se o tab fechado estava ativo, ativa o welcome
            const closedTabWasActive = prevTabs.find(tab => tab.id === tabId)?.isActive;
            if (closedTabWasActive) {
                updatedTabs = updatedTabs.map(tab => ({ ...tab, isActive: tab.id === 'welcome' }));
            }
            return orderTabs(updatedTabs);
        });
    }, []);

    // Função para ativar um tab
    const activateTab = useCallback((tabId: string) => {
        setTabs(prevTabs => orderTabs(prevTabs.map(tab => ({ ...tab, isActive: tab.id === tabId }))));
    }, []);

    return { tabs, openTab, closeTab, activateTab };
} 