'use client';

import { useContext, useState } from 'react';
import ProjectPage from '../../views/ProjectPage';
import ProjectsPage from '../../views/ProjectsPage';
import { UserContext } from '@/contexts/UserContext';
import { SidebarItem as SidebarItemType, SidebarProps } from '@/types/sidebar';
import { Tab } from '@/types/tabs';
import { Project } from '@/types/project';
import AboutPage from "@/views/AboutPage";
import SkillsPage from "@/views/SkillsPage";
import ContactPage from "@/views/ContactPage";
import SidebarDrawer from './SidebarDrawer';
import SidebarItem from './SidebarItem';
import MobileHeader from './MobileHeader';

export default function Sidebar({ onTabOpen, expandedItems, setExpandedItems }: SidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, projects } = useContext(UserContext)

  const sidebarItems: SidebarItemType[] = [{
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
        id: 'skills',
        label: 'skills.json',
        icon: '📄'
      },
      {
        id: 'certifications',
        label: 'certifications.json',
        icon: '📄'
      },
      {
        id: 'projects',
        label: 'projects',
        icon: '📂',
        children: projects?.map((project: Project) => ({
          id: project?.id?.toString() ?? '',
          label: project?.title ?? '',
          icon: '⚛️',
          type: 'project'
        }))
      },
      {
        id: 'contact',
        label: 'contact.ts',
        icon: '📧'
      }
    ]
  }]

  const toggleItem = (itemId: string) => {
    if (!expandedItems || !setExpandedItems) return;
    if (itemId === 'nav-menu') return;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: SidebarItemType) => {
    if (!onTabOpen) return;
    if (item.id === 'nav-menu') return;
    let content: string | React.ReactNode;

    // Remover lógica de reabrir a tab welcome manualmente
    if (item.id === 'projects') {
      const isProjectsOpen = expandedItems?.has('projects');
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

  return (
    <>
      <MobileHeader onOpenDrawer={() => setDrawerOpen(true)} />
      <div className="md:block">
        <SidebarDrawer 
          isOpen={drawerOpen} 
          onClose={() => setDrawerOpen(false)}
          userName={user?.name}
        >
          {sidebarItems.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              depth={0}
              isExpanded={item.id === 'nav-menu' ? true : expandedItems?.has(item.id) || false}
              onToggle={toggleItem}
              onClick={handleItemClick}
              expandedItems={expandedItems}
            />
          ))}
        </SidebarDrawer>
      </div>
    </>
  );
}