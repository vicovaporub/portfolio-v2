import { Tab } from "./tabs";

export interface SidebarItem {
    id: string
    label: string | undefined;
    icon: string;
    isActive?: boolean;
    children?: SidebarItem[];
}

export interface SidebarProps {
    onTabOpen?: (tab: Tab) => void;
}
  