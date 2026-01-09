'use client';

import { Project } from '@/types/project';
import Image from 'next/image';
import Badge from '@/components/badge';
import { useLocale } from '@/hooks/useLocale';
import { getLocalizedText, portfolioTexts } from '@/lib/base';
import Markdown from 'react-markdown';

export default function ProjectPage( { project } : { project: Project }) {
    const { locale } = useLocale();

    if (!project) {
        return (
            <div className="flex items-center justify-center h-full text-text-muted">
                <p>Project not found</p>
            </div>
        );
    }

    const localizedTitle = getLocalizedText(project.title, locale);
    const localizedDescription = getLocalizedText(project.description, locale);
    const technologies = project.technologies ?? [];
    const hasImage = !!project.image_path && project.image_path !== '/';
    const hasRepo = !!project.repo_path && project.repo_path !== '/';
    const hasLive = !!project.live_path && project.live_path !== '/';

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-background text-text-primary theme-transition animate-fade-in-up">
            {hasImage && (
                <div className="w-full h-48 md:h-[350px] relative rounded-xl overflow-hidden border border-border shadow-sm mb-8 group">
                    <Image
                        src={project.image_path}
                        alt={localizedTitle}
                        fill
                        className="object-cover transition-transform duration-700"
                        priority
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 pb-6 border-b border-border">
                <div className="space-y-3">
                    {project.company && (
                        <span className="text-xs font-bold tracking-widest text-accent-blue uppercase block">
                            {project.company}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
                        {localizedTitle}
                    </h1>
                </div>

                <div className="flex items-center gap-3 pt-2 shrink-0">
                    {hasRepo && (
                        <a
                            href={project.repo_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-background-secondary hover:border-accent-blue hover:text-accent-blue text-sm font-medium transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                            <span>{getLocalizedText(portfolioTexts.pages.projects.project.sourceCode, locale)}</span>
                        </a>
                    )}
                    {hasLive && (
                        <a
                            href={project.live_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-blue text-white hover:opacity-90 text-sm font-medium transition-all shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                            <span>{getLocalizedText(portfolioTexts.pages.projects.project.liveProject, locale)}</span>
                        </a>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-3">
                    <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
                        {getLocalizedText(portfolioTexts.pages.projects.project.description, locale)}
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary leading-relaxed">
                        <Markdown>{localizedDescription}</Markdown>
                    </div>
                </div>

                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-8">
                    {technologies.length > 0 && (
                        <div className="sticky top-6">
                            <h2 className="text-sm font-bold text-text-primary mb-6 uppercase tracking-wider">
                                {getLocalizedText(portfolioTexts.pages.projects.project.technologies, locale)}
                            </h2>
                            <ul className="space-y-3">
                                {technologies.map((technology) => (
                                    <li key={technology.id}>
                                        <Badge className="w-full flex justify-center py-2 text-sm bg-background-secondary border-border hover:border-accent-blue transition-colors">
                                            {technology.name}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 