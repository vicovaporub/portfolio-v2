'use client'
import ProjectCard from '../components/cards/ProjectCard';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';
import { Project } from '@/types/project';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

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
                <EmptyState 
                    title="Something went wrong" 
                    message={error}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
                        </svg>
                    }
                />
            </div>
        );
    }

    if (!projects || projects.length === 0) {
        return (
            <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
                <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Projects</h1>
                <EmptyState 
                    title="No projects found"
                    message="I haven't uploaded any projects yet. Check back soon!"
                />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Projects</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                {projects.map((project, index) => {
                    return (
                        <div 
                            key={project.id} 
                            className="opacity-0 animate-fade-in-up h-full"
                            style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards' }}
                        >
                            <ProjectCard project={project} onOpenProject={onOpenProject} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProjectsPage; 