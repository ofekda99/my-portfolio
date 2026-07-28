import type { IconType } from "react-icons";

export type SocialLink = {
  href: string;
  label: string;
  icon: IconType;
  external: boolean;
};

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex items-center gap-6">
      {links.map(({ href, label, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
}
