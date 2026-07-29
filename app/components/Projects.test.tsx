import { render, screen } from "@testing-library/react";
import Projects from "./Projects";
import type { Project } from "./ProjectCard";

const FIXTURE_PROJECTS: Project[] = [
  { name: "Project A", description: "First", techStack: ["React"] },
  { name: "Project B", description: "Second", techStack: ["Vue"] },
];

describe("Projects", () => {
  it("renders a section heading", () => {
    render(<Projects projects={FIXTURE_PROJECTS} />);
    expect(
      screen.getByRole("heading", { name: "Projects", level: 2 }),
    ).toBeInTheDocument();
  });

  it("renders a card for every project in the list", () => {
    render(<Projects projects={FIXTURE_PROJECTS} />);
    expect(
      screen.getByRole("heading", { name: "Project A" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Project B" }),
    ).toBeInTheDocument();
  });
});
