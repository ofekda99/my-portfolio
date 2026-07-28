import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import type { IconType } from "react-icons";

type SocialLink = {
  href: string;
  label: string;
  icon: IconType;
  external: boolean;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/ofekda99",
    label: "GitHub",
    icon: FaGithub,
    external: true,
  },
  {
    href: "https://linkedin.com/in/ofek-dahari",
    label: "LinkedIn",
    icon: FaLinkedin,
    external: true,
  },
  {
    href: "mailto:ofekda9@gmail.com",
    label: "Email",
    icon: FaEnvelope,
    external: false,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-6">
      {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
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
