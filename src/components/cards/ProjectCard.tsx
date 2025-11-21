import { Project } from "@/types/project";
import Image from "next/image";
import Badge from "@/components/badge";

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="border border-[var(--border)] rounded-xl shadow-lg p-3  w-full bg-[var(--background-secondary)] hover:bg-[var(--hover-bg)] transition-colors duration-200 theme-transition flex flex-col md:flex-row items-start gap-3 md:gap-4 md:h-45 overflow-hidden">
            <div className="w-full md:w-40 h-28 md:h-full overflow-hidden rounded-lg flex items-center justify-center bg-[var(--border)] flex-shrink-0">
                <Image
                    src={project.image_path}
                    alt={project.title}
                    width={180}
                    height={180}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex-1 flex flex-col h-full min-w-0 justify-between">
                <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-1 text-[var(--text-primary)] truncate">
                        {project.title}
                    </h3>
                    <p className="text-[13px] md:text-base text-[var(--text-secondary)] m-0 line-clamp-2">
                        {project.description}
                    </p>
                </div>
                <div className="flex gap-1 md:gap-2 flex-wrap">
                    {project.technologies?.map((technology) => (
                        <Badge key={technology.id}>{technology.name}</Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
