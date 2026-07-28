import ScrollReveal from "./ScrollReveal";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { name, description, techStack, githubUrl, liveUrl } = project;
  return (
    <ScrollReveal
      direction={index % 2 === 0 ? "left" : "right"}
      delay={index * 0.1}
      className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-black"
    >
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
        <div className="flex gap-3 text-sm font-medium">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <FaGithub aria-hidden="true" size={14} />
              View Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <FaArrowUpRightFromSquare aria-hidden="true" size={12} />
              Live Demo
            </a>
          )}
        </div>
      )}
    </ScrollReveal>
  );
}
