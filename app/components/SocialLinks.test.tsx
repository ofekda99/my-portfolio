import { render, screen } from "@testing-library/react";
import { FaGithub } from "react-icons/fa6";
import SocialLinks, { type SocialLink } from "./SocialLinks";

const FIXTURE_LINKS: SocialLink[] = [
  {
    href: "https://example.com/external",
    label: "External Example",
    icon: FaGithub,
    external: true,
  },
  {
    href: "mailto:test@example.com",
    label: "Internal Example",
    icon: FaGithub,
    external: false,
  },
];

describe("SocialLinks", () => {
  it("renders an external link with target=_blank and rel=noopener noreferrer", () => {
    render(<SocialLinks links={FIXTURE_LINKS} />);
    const link = screen.getByRole("link", { name: "External Example" });
    expect(link).toHaveAttribute("href", "https://example.com/external");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a non-external link without target=_blank", () => {
    render(<SocialLinks links={FIXTURE_LINKS} />);
    const link = screen.getByRole("link", { name: "Internal Example" });
    expect(link).toHaveAttribute("href", "mailto:test@example.com");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("renders exactly the links it's given", () => {
    render(<SocialLinks links={FIXTURE_LINKS} />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
