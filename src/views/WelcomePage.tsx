"use client";

import { useContext, useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { UserContext } from "@/contexts/UserContext";
import { getLocalizedText, portfolioTexts } from "@/lib/base";
import { useLocale } from "@/hooks/useLocale";

interface WelcomePageProps {
  onOpenFile?: (fileId: string) => void;
}

const { menu } = portfolioTexts;

export default function WelcomePage({ onOpenFile }: WelcomePageProps) {
    const { user, projects } = useContext(UserContext);
    const { locale } = useLocale();
    const [isExpanded, setIsExpanded] = useState(false);
    const topCount = 5;

    const collapseContentRef = useRef<HTMLDivElement>(null);
    const [collapseHeight, setCollapseHeight] = useState(0);

    const rightItems = useMemo(() => {
        if (!projects || projects.length === 0) return [];
        const projectCount = projects.length;
        const techIdToCount = new Map<string, { name: string; count: number }>();
        for (const project of projects) {
            const technologies = project.technologies ?? [];
            const uniqueTechIds = new Set(technologies.map((t) => t.id));
            for (const techId of uniqueTechIds) {
                const tech = technologies.find((t) => t.id === techId);
                if (!tech) continue;
                const current = techIdToCount.get(techId);
                if (current) {
                    current.count += 1;
                } else {
                    techIdToCount.set(techId, { name: tech.name, count: 1 });
                }
            }
        }
        const items = Array.from(techIdToCount.entries()).map(([id, { name, count }]) => ({
            id,
            label: name,
            percentage: Math.round((count / projectCount) * 100),
            count,
        }));
        items.sort((a, b) => b.count - a.count || b.percentage - a.percentage || a.label.localeCompare(b.label));
        return items;
    }, [projects]);

    useEffect(() => {
        const measure = () => {
            if (collapseContentRef.current) {
                setCollapseHeight(collapseContentRef.current.scrollHeight);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [rightItems, locale]);

    const leftActions = [
        {
            label: getLocalizedText(menu.menuItem.about, locale),
            action: () => onOpenFile?.("about"),
            icon: "📄",
        },
        {
            label: getLocalizedText(menu.menuItem.projects, locale),
            action: () => onOpenFile?.("projects"),
            icon: "📁",
        },
        {
            label: getLocalizedText(menu.menuItem.skills, locale),
            action: () => onOpenFile?.("skills"),
            icon: "⚙️",
        },
        {
            label: getLocalizedText(menu.menuItem.contact, locale),
            action: () => onOpenFile?.("contact"),
            icon: "📧",
        },
    ];

    const topItems = useMemo(() => rightItems.slice(0, topCount), [rightItems]);
    const remainingItems = useMemo(() => rightItems.slice(topCount), [rightItems]);

    return (
        <div className="flex-1 bg-[var(--background)] text-[var(--text-primary)] flex flex-col theme-transition">
            <div className="flex-1 flex flex-col pt-8 md:pt-24 px-4 md:pl-24 space-y-8 md:space-y-12 w-full">
                <div className="space-y-2">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between max-w-2xl w-full gap-4 md:gap-0">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-light">{user?.name}</h1>
                            <p className="text-base md:text-lg font-normal text-[var(--accent-blue)] tracking-wide mb-2">
                                {getLocalizedText(portfolioTexts.pages.welcome.title, locale)}
                            </p>
                        </div>
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-blue)]/80 flex items-center justify-center text-2xl font-bold">
                            {user?.image_path ? (
                                <Image
                                    src={user?.image_path}
                                    alt={user?.name ?? ""}
                                    width={80}
                                    height={80}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                user?.name
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full max-w-4xl mt-4 md:mt-6 space-y-8 md:space-y-0 md:space-x-16">
                    <div className="md:w-1/2 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-base font-semibold text-[var(--accent-blue)] mb-2 tracking-wide">
                                {getLocalizedText(portfolioTexts.menu.menuLabel, locale)}
                            </h2>
                            {leftActions.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="w-full hover:cursor-pointer flex items-center space-x-3 p-2 text-left hover:bg-[var(--hover-bg)] rounded transition-colors group theme-transition"
                                >
                                    <span className="text-base opacity-70 group-hover:opacity-100 text-[var(--accent-blue)]">
                                        {item.icon}
                                    </span>
                                    <span className="text-[var(--accent-blue)] group-hover:text-[var(--text-primary)] font-light tracking-wide text-[16px]">
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="hidden md:block space-y-1">
                            <p className="text-xs text-[var(--accent-blue)] font-light tracking-wide">
                    Desenvolvedor Full Stack • React • TypeScript • Node.js
                            </p>
                            <div className="flex flex-col sm:flex-row sm:space-x-6 text-xs text-[var(--accent-blue)] font-light tracking-wide gap-1 sm:gap-0">
                                <span>📍 São Paulo, Brasil</span>
                                <span>📧 seu.email@exemplo.com</span>
                                <span>🐙 github.com/seuusuario</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 space-y-2">
                        <h2 className="text-base font-semibold text-[var(--accent-blue)] mb-2 tracking-wide">
                            {getLocalizedText(
                                portfolioTexts.pages.welcome.mostUsedSkills,
                                locale
                            )}
                        </h2>
                        <div className="space-y-2">
                            {topItems.map((item) => (
                                <div key={item.id ?? item.label} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--accent-blue)] font-light tracking-wide">
                                            {item.label}
                                        </span>
                                        <span className="text-[var(--accent-blue)] font-light">
                                            {item.percentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                                        <div
                                            className="bg-[var(--accent-blue)] h-1.5 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}

                            <div
                                className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                                style={{ maxHeight: isExpanded ? collapseHeight : 0 }}
                            >
                                <div
                                    ref={collapseContentRef}
                                    className={`space-y-2 transition-opacity ${isExpanded ? "opacity-100 duration-500" : "opacity-0 duration-300"}`}
                                >
                                    {remainingItems.map((item) => (
                                        <div key={item.id ?? item.label} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[var(--accent-blue)] font-light tracking-wide">
                                                    {item.label}
                                                </span>
                                                <span className="text-[var(--accent-blue)] font-light">
                                                    {item.percentage}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                                                <div
                                                    className="bg-[var(--accent-blue)] h-1.5 rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {rightItems.length > 5 && (
                                <div
                                    onClick={() => setIsExpanded((prev) => !prev)}
                                    className="mt-2 hover:cursor-pointer w-full py-2 flex items-center justify-center text-[var(--accent-blue)] hover:bg-[var(--hover-bg)] rounded transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="block md:hidden space-y-1 mt-6 md:mt-8 mb-4">
                    <p className="text-xs text-[var(--accent-blue)] font-light tracking-wide">
            Desenvolvedor Full Stack • React • TypeScript • Node.js
                    </p>
                    <div className="flex flex-col sm:flex-row sm:space-x-6 text-xs text-[var(--accent-blue)] font-light tracking-wide gap-1 sm:gap-0">
                        <span>📍 São Paulo, Brasil</span>
                        <span>📧 seu.email@exemplo.com</span>
                        <span>🐙 github.com/seuusuario</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
