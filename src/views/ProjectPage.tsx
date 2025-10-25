'use client';

import { Project } from '@/types/project';

export default function ProjectPage( { project } : { project: Project }) {
    if (!project) {
        return (
            <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
                <p>Project not found</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{project.title}</h1>
        </div>
    );
} 