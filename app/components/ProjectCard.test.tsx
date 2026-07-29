import { render, screen } from "@testing-library/react";
import ProjectCard, { type Project } from "./ProjectCard";

const PROJECT_WITH_LINKS: Project = {
  name: "Full Project",
  description: "Has both links",
  techStack: ["React", "Node.js"],
  githubUrl: "https://github.com/example/full",
  liveUrl: "https://full.example.com",
};

const PROJECT_WITHOUT_LINKS: Project = {
  name: "No Links Project",
  description: "Has no links",
  techStack: ["C#"],
};

describe("ProjectCard", () => {
  it("renders the project name and description", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    expect(
      screen.getByRole("heading", { name: "Full Project" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Has both links")).toBeInTheDocument();
  });

  it("renders each tech stack tag", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders a GitHub link with security attributes when githubUrl is present", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    const link = screen.getByRole("link", { name: "View Code" });
    expect(link).toHaveAttribute("href", "https://github.com/example/full");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a Live Demo link with security attributes when liveUrl is present", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    const link = screen.getByRole("link", { name: "Live Demo" });
    expect(link).toHaveAttribute("href", "https://full.example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders no links when neither githubUrl nor liveUrl is present", () => {
    render(<ProjectCard project={PROJECT_WITHOUT_LINKS} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
