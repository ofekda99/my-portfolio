import SocialLinks from "./components/SocialLinks";
import Projects from "./components/Projects";
import { SOCIAL_LINKS } from "./data/social-links";
import { PROJECTS } from "./data/projects";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-4xl flex-1 flex-col items-center gap-16 bg-white px-8 py-16 text-center sm:px-16 sm:py-24 dark:bg-black">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Ofek Dahari
          </h1>
          <SocialLinks links={SOCIAL_LINKS} />
        </div>
        <Projects projects={PROJECTS} />
      </main>
    </div>
  );
}
