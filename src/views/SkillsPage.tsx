'use client'

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedText, portfolioTexts } from "@/lib/base";

export default function SkillsPage() {
    const { technologies } = useContext(UserContext);
    const { locale } = useLocale();

    if (!technologies || technologies.length === 0) {
        return (
            <div className="p-8 text-center text-[var(--text-muted)]">
                No skills found.
            </div>
        );
    }

    return (
        <div className="w-full p-4 md:p-8 bg-[var(--background)] text-[var(--text-primary)] theme-transition animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-bold mb-8 border-b border-[var(--border)] pb-4">
                {getLocalizedText(portfolioTexts.pages.skills.title, locale)}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {technologies.map((tech, index) => (
                    <div 
                        key={tech.id}
                        className="group flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent-blue)] hover:bg-[var(--card-hover-bg)] transition-all duration-300 opacity-0 animate-fade-in-up shadow-sm"
                        style={{ animationDelay: `${index * 0.03}s`, animationFillMode: 'forwards' }}
                    >
                        <div className="w-12 h-12 mb-3 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                            {tech.icon_path && tech.icon_path !== '/' ? (
                                <Image 
                                    src={tech.icon_path} 
                                    alt={tech.name} 
                                    width={48} 
                                    height={48}
                                    className="object-contain"
                                />
                            ) : (
                                <div className="text-2xl font-bold text-[var(--accent-blue)] opacity-50">
                                    {tech.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] text-center">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
