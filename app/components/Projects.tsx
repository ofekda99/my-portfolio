import ProjectCard, { type Project } from "./ProjectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="flex w-full flex-col items-center gap-8">
      <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Projects
      </h2>
      <div className="grid w-full gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
