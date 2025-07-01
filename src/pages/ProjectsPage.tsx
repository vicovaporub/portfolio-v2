import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
  return (
    <div className="p-6 bg-[var(--background)] text-[var(--text-primary)] theme-transition">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectsPage; 