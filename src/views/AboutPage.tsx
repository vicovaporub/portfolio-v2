'use client'

import { UserContext } from "@/contexts/UserContext";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedText } from "@/lib/base";
import Image from "next/image";
import { useContext } from "react";
import Markdown from "react-markdown";

export default function AboutPage() {
    const { about, user } = useContext(UserContext);
    const { locale } = useLocale()

    if (!about || !user) {
        return null;
    }

    return (
        <div className="w-full p-4 md:p-6 lg:p-8 bg-[var(--background)] text-[var(--text-primary)] theme-transition animate-fade-in-up">
            
            {/* Project Header / Breadcrumbs Fake */}
            <div className="flex items-center gap-2 mb-6 text-sm text-[var(--text-secondary)] border-b border-[var(--border)] pb-4">
                <div className="w-5 h-5 rounded-full overflow-hidden relative border border-[var(--border)]">
                    {user.image_path ? (
                        <Image src={user.image_path} alt="user" fill className="object-cover" />
                    ) : <div className="bg-gray-500 w-full h-full" />}
                </div>
                <span className="font-semibold text-[var(--text-primary)]">{user.name}</span>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="font-semibold text-[var(--text-primary)]">about-me</span>
                <span className="px-2 py-0.5 text-xs rounded-full border border-[var(--border)] text-[var(--text-muted)] bg-[var(--background-secondary)]">Public</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Main Content - README style */}
                <div className="lg:col-span-9">
                    <div className="border border-[var(--border)] rounded-md bg-[var(--background)] overflow-hidden">
                        {/* File Header */}
                        <div className="bg-[var(--background-secondary)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[var(--hover-bg)] border border-[var(--border)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                </div>
                                <span className="font-mono text-sm font-semibold">README.md</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--text-muted)]">
                                <span className="px-2 py-1 hover:bg-[var(--hover-bg)] rounded cursor-pointer transition-colors">Edit</span>
                                <span className="px-2 py-1 hover:bg-[var(--hover-bg)] rounded cursor-pointer transition-colors">Raw</span>
                                <span className="px-2 py-1 hover:bg-[var(--hover-bg)] rounded cursor-pointer transition-colors">Blame</span>
                            </div>
                        </div>

                        <div className="p-6 md:p-10 bg-[var(--background)]">
                            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed font-sans whitespace-pre-line">
                                <Markdown>
                                    {getLocalizedText(about.text, locale)}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 space-y-6">
                    
                    <div className="space-y-4 border-b border-[var(--border)] pb-6">
                        <h3 className="font-semibold text-[var(--text-primary)]">About</h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {getLocalizedText(user.position ?? '', locale)} based in Brazil. <br/>
                            Passionate about building scalable software and intuitive interfaces.
                        </p>
                        
                        <div className="flex flex-col gap-2 text-sm">
                            {user.linkedin && (
                                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--accent-blue)] hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                    linkedin.com/in/{user.name?.split(' ')[0].toLowerCase()}
                                </a>
                            )}
                            {user.github && (
                                <a href={user.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--accent-blue)] hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                    github.com/{user.name?.split(' ')[0].toLowerCase()}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Releases / CV Section */}
                    <div className="space-y-3 border-b border-[var(--border)] pb-6">
                        <h3 className="font-semibold text-[var(--text-primary)]">Releases</h3>
                        {user.cv_path ? (
                            <a href={user.cv_path} target="_blank" rel="noopener noreferrer" className="group block">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-blue)]"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                                    <span className="font-semibold text-[var(--accent-blue)] group-hover:underline truncate">CV / Resume v2025</span>
                                    <span className="text-xs text-[#2da44e] border border-[#2da44e] rounded-full px-2 py-0.5 ml-auto">Latest</span>
                                </div>
                                <div className="text-xs text-[var(--text-muted)] pl-6">
                                    PDF • 4.5MB • Released just now
                                </div>
                            </a>
                        ) : (
                            <div className="text-sm text-[var(--text-muted)]">No releases published</div>
                        )}
                    </div>

                    {/* Languages / Skills (Fake Stats) */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-[var(--text-primary)]">Languages</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="w-3 h-3 rounded-full bg-[#3178c6]"></span>
                                <span className="text-[var(--text-primary)] font-medium">TypeScript</span>
                                <span className="text-[var(--text-muted)] ml-auto">52.8%</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="w-3 h-3 rounded-full bg-[#f7df1e]"></span>
                                <span className="text-[var(--text-primary)] font-medium">JavaScript</span>
                                <span className="text-[var(--text-muted)] ml-auto">35.4%</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="w-3 h-3 rounded-full bg-[#e34c26]"></span>
                                <span className="text-[var(--text-primary)] font-medium">HTML/CSS</span>
                                <span className="text-[var(--text-muted)] ml-auto">11.8%</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
