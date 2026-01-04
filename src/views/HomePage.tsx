"use client";

import { useTabs } from "@/hooks/useTabs";
import Sidebar from "@/components/sidebar/Sidebar";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import WelcomePage from "@/views/WelcomePage";
import { useEffect, useCallback, useState, useContext, useRef } from "react";
import { Tab } from "@/types/tabs";
import AboutPage from "@/views/AboutPage";
import SkillsPage from "@/views/SkillsPage";
import ContactPage from "@/views/ContactPage";
import ProjectsPage from "./ProjectsPage";
import ProjectPage from "@/views/ProjectPage";
import { Project } from "@/types/project";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedText } from "@/lib/base";
import { UserContext } from "@/contexts/UserContext";
import { useSearchParams } from "next/navigation";

const STORAGE_KEY = "portfolio_tabs_state_v1";

export default function HomePage() {
    const { tabs, openTab, closeTab, activateTab } = useTabs();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(
        new Set(["nav-menu"])
    );
    const activeTabId = tabs.find((t) => t.isActive)?.id;
    const { locale } = useLocale();
    const { projects } = useContext(UserContext);
    const isRestoring = useRef(true);
    const searchParams = useSearchParams();

    const collapseItem = (itemId: string) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(itemId);
            return newSet;
        });
    };

    const createTab = useCallback((fileId: string): Tab | null => {
        if (projects) {
            const project = projects.find(p => p.id.toString() === fileId);
            if (project) {
                return {
                    id: project.id.toString(),
                    title: getLocalizedText(project.title, locale),
                    content: <ProjectPage project={project} />,
                    isActive: true,
                };
            }
        }

        switch (fileId) {
        case "welcome":
            return {
                id: "welcome",
                title: "welcome.tsx",
                 
                content: <WelcomePage onOpenFile={handleWelcomeAction} />,
                isActive: true,
            };
        case "about":
            return {
                id: fileId,
                title: "about.md",
                content: <AboutPage />,
                isActive: true,
            };
        case "skills":
            return {
                id: fileId,
                title: "skills.json",
                content: <SkillsPage />,
                isActive: true,
            };
        case "contact":
            return {
                id: fileId,
                title: "contact.ts",
                content: <ContactPage />,
                isActive: true,
            };
        case "projects":
            return {
                id: fileId,
                title: "projects/",
                content: <ProjectsPage onOpenProject={(project: Project) => {
                    const projectTab = {
                        id: project.id.toString(),
                        title: getLocalizedText(project.title, locale),
                        content: <ProjectPage project={project} />,
                        isActive: true,
                    };
                    openTab(projectTab);
                }} />,
                isActive: true,
            };
        default:
            return {
                id: fileId,
                title: fileId,
                content: `# ${fileId}\n\nPlaceholder content.`,
                isActive: true,
            };
        }
    }, [locale, projects, openTab]);

    const handleWelcomeAction = useCallback(
        (fileId: string) => {
            const tab = createTab(fileId);
            if (tab) openTab(tab);
        },
        [createTab, openTab]
    );

    useEffect(() => {
        if (!isRestoring.current || !projects) return;

        try {
            const savedState = localStorage.getItem(STORAGE_KEY);
            const urlTab = searchParams.get('tab');

            if (savedState) {
                const { openIds, activeId } = JSON.parse(savedState);
                const idsToRestore = Array.isArray(openIds) ? openIds : [];

                if (idsToRestore.length > 0) {
                    idsToRestore.forEach((id: string) => {
                        const tab = createTab(id);
                        if (tab) {
                            openTab({ ...tab, isActive: false });
                        }
                    });

                    const targetActiveId = urlTab || activeId;
                 
                    setTimeout(() => {
                        if (targetActiveId) {
                            activateTab(targetActiveId);
                        }
                    }, 0);

                } else {
                    const welcomeTab = createTab("welcome");
                    if (welcomeTab) openTab(welcomeTab);
                }
            } else {
                const welcomeTab = createTab("welcome");
                if (welcomeTab) openTab(welcomeTab);
            }
        } catch (e) {
            console.error("Failed to restore tabs", e);
            const welcomeTab = createTab("welcome");
            if (welcomeTab) openTab(welcomeTab);
        } finally {
            isRestoring.current = false;
        }
    }, [projects, createTab, openTab, activateTab, searchParams]);

    useEffect(() => {
        if (isRestoring.current) return;

        const activeId = tabs.find(t => t.isActive)?.id;
        
        if (activeId) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('tab', activeId);
            window.history.replaceState({}, '', newUrl.toString());
        }

        const stateToSave = {
            openIds: tabs.map(t => t.id),
            activeId: activeId
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [tabs]);

    const handleTabClose = (tabId: string) => {
        closeTab(tabId);
        if (tabId === "projects") {
            collapseItem("projects");
        }
    };

    return (
        <main className="flex flex-col md:flex-row h-screen min-h-0 w-full bg-[var(--background)] overflow-hidden">
            <div className="md:contents pt-14 md:pt-0 flex-1 flex min-h-0">
                <Sidebar
                    onTabOpen={openTab}
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                    activeTabId={activeTabId}
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
