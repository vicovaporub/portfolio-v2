import { Project } from "@/types/project";
import Image from "next/image";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="border border-[var(--border)] rounded-xl shadow-lg p-4 md:p-6 max-w-xs w-full bg-[var(--background-secondary)] flex flex-col items-center gap-2 md:gap-4 hover:bg-[var(--hover-bg)] transition-colors duration-200 theme-transition">
      <div className="w-full h-28 md:h-40 overflow-hidden rounded-lg flex items-center justify-center bg-[var(--border)]">
        <Image
          src={project.image_path}
          alt={project.title}
          width={180}
          height={180}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-lg md:text-xl font-semibold mt-2 mb-1 text-[var(--text-primary)]">
        {project.title}
      </h3>
      <p className="text-[13px] md:text-base text-[var(--text-secondary)] text-center m-0">
        {project.description}
      </p>
      <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
        <span className="bg-[var(--border)] text-[var(--text-secondary)] rounded-md px-2 md:px-3 py-1 text-xs md:text-sm border border-[var(--border)]">
          React
        </span>
        <span className="bg-[var(--border)] text-[var(--text-secondary)] rounded-md px-2 md:px-3 py-1 text-xs md:text-sm border border-[var(--border)]">
          TypeScript
        </span>
        <span className="bg-[var(--border)] text-[var(--text-secondary)] rounded-md px-2 md:px-3 py-1 text-xs md:text-sm border border-[var(--border)]">
          CSS
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
