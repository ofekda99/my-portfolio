import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import type { SocialLink } from "../components/SocialLinks";

export const SOCIAL_LINKS: SocialLink[] = [
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
