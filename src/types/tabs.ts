export interface TabProps {
    id: string;
    title: string;
    content: string | React.ReactNode;
    isActive?: boolean;
    onClose?: () => void;
    onActivate?: () => void;
}
  
export interface PortfolioTabProps {
    tabs: TabProps[];
    onTabClose?: (tabId: string) => void;
    onTabActivate?: (tabId: string) => void;
}

export interface Tab {
    id: string;
    title: string;
    content: string | React.ReactNode;
    isActive: boolean;
}
  