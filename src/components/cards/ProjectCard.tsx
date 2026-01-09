import { Project } from "@/types/project";
import Image from "next/image";
import Badge from "@/components/badge";
import { getLocalizedText, portfolioTexts } from "@/lib/base";
import { useLocale } from "@/hooks/useLocale";

const ProjectCard = ({ project, onOpenProject }: { project: Project; onOpenProject?: (project: Project) => void }) => {
    const { locale } = useLocale();
    const technologies = project.technologies ?? [];
    const displayedTechnologies = technologies.slice(0, 4);
    const remainingTechnologiesCount = technologies.length - displayedTechnologies.length;

    const title = getLocalizedText(project.title, locale);
    const description = getLocalizedText(project.description, locale);

    const hasRepo = !!project.repo_path && project.repo_path !== '/';
    const hasLive = !!project.live_path && project.live_path !== '/';

    return (
        <div
            className="group relative border border-tab-border rounded-xl shadow-sm p-3 w-full bg-card-bg hover:bg-card-hover-bg hover:border-accent-blue transition-all duration-300 theme-transition flex flex-col md:flex-row items-stretch gap-4 overflow-hidden cursor-pointer h-full"
            onClick={() => onOpenProject?.(project)}
        >
            {/* Image Section */}
            <div className="w-full md:w-48 h-40 md:h-auto overflow-hidden rounded-lg bg-border shrink-0 relative">
                <Image
                    src={project.image_path}
                    alt={title}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col min-w-0 py-1 min-h-0">
                <div className="flex-1 min-h-0 flex flex-col">
                    <div className="flex justify-between items-start mb-1 shrink-0">
                        <div className="flex flex-col min-w-0">
                            {project.company && (
                                <span className="text-[10px] uppercase tracking-widest text-accent-blue font-bold mb-0.5">
                                    {project.company}
                                </span>
                            )}
                            <h3 className="text-lg font-bold truncate text-text-primary transition-colors pr-2">
                                {title}
                            </h3>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                            {hasRepo && (
                                <a 
                                    href={project.repo_path} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 text-text-secondary hover:text-accent-blue transition-colors"
                                    title="View Repository"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                                </a>
                            )}
                            {hasLive && (
                                <a 
                                    href={project.live_path} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 text-text-secondary hover:text-accent-blue transition-colors"
                                    title={getLocalizedText(portfolioTexts.pages.projects.project.liveProject, locale)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                                </a>
                            )}
                        </div>
                    </div>
                    
                    <p className="text-[13px] leading-relaxed line-clamp-3 text-text-secondary mb-3">
                        {description}
                    </p>
                </div>

                {/* Footer with Stack */}
                <div className="flex items-center gap-1.5 mt-auto flex-wrap shrink-0">
                    {displayedTechnologies.map((technology) => (
                        <Badge key={technology.id} className="text-[10px] px-2 py-0.5 whitespace-nowrap">
                            {technology.name}
                        </Badge>
                    ))}
                    {remainingTechnologiesCount > 0 && (
                        <Badge key="more" className="text-[10px] px-2 py-0.5">
                            +{remainingTechnologiesCount}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
