import { render, screen } from "@testing-library/react";
import ScrollReveal from "./ScrollReveal";

describe("ScrollReveal", () => {
  it("renders its children", () => {
    render(
      <ScrollReveal>
        <p>Hello world</p>
      </ScrollReveal>,
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
