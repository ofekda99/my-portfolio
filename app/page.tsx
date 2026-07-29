import SocialLinks from "./components/SocialLinks";
import Projects from "./components/Projects";
import { SOCIAL_LINKS } from "./data/social-links";
import { PROJECTS } from "./data/projects";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-120px] left-1/2 h-[320px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/10"
      />
      <main className="relative flex w-full max-w-4xl flex-1 flex-col items-center gap-16 px-8 py-16 text-center sm:px-16 sm:py-24">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Ofek Dahari
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Full-Stack Developer
          </p>
          <SocialLinks links={SOCIAL_LINKS} />
        </div>
        <Projects projects={PROJECTS} />
      </main>
    </div>
  );
}
