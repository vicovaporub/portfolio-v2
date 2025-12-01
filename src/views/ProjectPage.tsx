'use client';

import { Project } from '@/types/project';
import Image from 'next/image';
import Badge from '@/components/badge';
import { useLocale } from '@/hooks/useLocale';
import { getLocalizedText, portfolioTexts } from '@/lib/base';

export default function ProjectPage( { project } : { project: Project }) {
    const { locale } = useLocale();

    if (!project) {
        return (
            <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
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
        <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-60 h-40 md:h-48 overflow-hidden rounded-lg bg-[var(--border)] flex items-center justify-center">
                    {hasImage ? (
                        <Image
                            src={project.image_path}
                            alt={localizedTitle}
                            width={320}
                            height={192}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-[var(--text-muted)] text-sm">{project.slug}</span>
                    )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-secondary)]">
                        {localizedTitle}
                    </h1>
                    {project.company && (
                        <p className="text-xs md:text-sm m-0 text-[var(--text-muted)]">
                            {project.company}
                        </p>
                    )}
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                        {hasRepo && (
                            <a
                                href={project.repo_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-md border border-[var(--tab-border)] bg-[var(--tab-bg)] hover:bg-[var(--tab-hover-bg)] text-xs md:text-sm text-[var(--text-secondary)] theme-transition"
                            >
                                Repository
                            </a>
                        )}
                        {hasLive && (
                            <a
                                href={project.live_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-md border border-[var(--tab-border)] bg-[var(--tab-bg)] hover:bg-[var(--tab-hover-bg)] text-xs md:text-sm text-[var(--text-secondary)] theme-transition"
                            >
                                Live
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-6">
                <h2 className="text-sm md:text-base font-semibold text-[var(--accent-blue)] mb-2 tracking-wide">
                    {getLocalizedText(portfolioTexts.pages.projects.project.description, locale)}
                </h2>
                <p className="text-[13px] md:text-base m-0 text-[var(--text-secondary)]">
                    {localizedDescription}
                </p>
            </div>

            {technologies.length > 0 && (
                <div className="mt-4 md:mt-6">
                    <h2 className="text-sm md:text-base font-semibold text-[var(--accent-blue)] mb-2 tracking-wide">
                        {getLocalizedText(portfolioTexts.pages.projects.project.technologies, locale)}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                        {technologies.map((technology) => (
                            <Badge key={technology.id} className="flex items-center gap-1">
                                {technology.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 