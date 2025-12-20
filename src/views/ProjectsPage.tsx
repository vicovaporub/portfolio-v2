'use client'
import ProjectCard from '../components/cards/ProjectCard';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';
import { Project } from '@/types/project';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

const ProjectsPage = ({ onOpenProject }: { onOpenProject?: (project: Project) => void }) => {
    const { projects, isLoading, error } = useContext(UserContext)

    if (isLoading) {
        return (
            <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
                <div className="flex items-center justify-center min-h-[400px]">
                    <LoadingSpinner size="lg" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
                <ErrorMessage message={error} />
            </div>
        );
    }

    if (!projects || projects.length === 0) {
        return (
            <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
                <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Projects</h1>
                <p className="text-[var(--text-muted)]">No projects found.</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects.map((project) => {
                    return (
                        <ProjectCard key={project.id} project={project} onOpenProject={onOpenProject} />
                    )
                })}
            </div>
        </div>
    );
};

export default ProjectsPage; 