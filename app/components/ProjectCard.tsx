import ScrollReveal from "./ScrollReveal";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TECH_ICONS } from "../data/tech-icons";

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
        {techStack.map((tech) => {
          const techIcon = TECH_ICONS[tech];
          const Icon = techIcon?.icon;
          return (
            <li
              key={tech}
              className={
                techIcon
                  ? "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  : "rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              }
              style={
                techIcon
                  ? {
                      backgroundColor: `${techIcon.color}1a`,
                      color: techIcon.color,
                    }
                  : undefined
              }
            >
              {Icon && <Icon aria-hidden="true" size={14} />}
              {tech}
            </li>
          );
        })}
      </ul>
      {(githubUrl || liveUrl) && (
        <div className="flex gap-3 text-sm font-medium">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-indigo-200 px-3 py-1.5 text-indigo-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950"
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
              className="flex items-center gap-1.5 rounded-full border border-indigo-200 px-3 py-1.5 text-indigo-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950"
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
