export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { name, description, techStack, githubUrl, liveUrl } = project;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-black">
      <h3 className="text-xl font-semibold text-black dark:text-zinc-50">
        {name}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      <ul className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>
      {(githubUrl || liveUrl) && (
        <div className="flex gap-4 text-sm font-medium">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-950 hover:underline dark:text-zinc-50"
            >
              View Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-950 hover:underline dark:text-zinc-50"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
