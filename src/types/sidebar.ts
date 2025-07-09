import { Tab } from "./tabs";

export interface SidebarItem {
    id: string
    label: string | undefined;
    icon: string;
    isActive?: boolean;
    children?: SidebarItem[];
    type?: string;
}
export interface SidebarProps {
    onTabOpen?: (tab: Tab) => void;
    expandedItems?: Set<string>;
    setExpandedItems?: (items: Set<string>) => void;
}

export interface SidebarItemProps {
    item: SidebarItem;
    depth: number;
    isExpanded: boolean;
    onToggle: (itemId: string) => void;
    onClick: (item: SidebarItem) => void;
    expandedItems?: Set<string>;
  }