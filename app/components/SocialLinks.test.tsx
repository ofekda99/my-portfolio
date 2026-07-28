import { render, screen } from "@testing-library/react";
import SocialLinks from "./SocialLinks";

describe("SocialLinks", () => {
  it("renders a GitHub link with correct href and security attributes", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("href", "https://github.com/ofekda99");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a LinkedIn link with correct href and security attributes", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute("href", "https://linkedin.com/in/ofek-dahari");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a mailto Email link without target=_blank", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: "Email" });
    expect(link).toHaveAttribute("href", "mailto:ofekda9@gmail.com");
    expect(link).not.toHaveAttribute("target");
  });
});
