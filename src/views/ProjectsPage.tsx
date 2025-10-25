'use client'
import ProjectCard from '../components/cards/ProjectCard';
import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';

const ProjectsPage = () => {
    const { projects } = useContext(UserContext)


    return (
        <div className="p-4 md:p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects?.map((project) => {
                    return (
                        <ProjectCard key={project.id} project={project} />
                    )
                })}
            </div>
        </div>
    );
};

export default ProjectsPage; 