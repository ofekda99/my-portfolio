import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the name heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Ofek Dahari" }),
    ).toBeInTheDocument();
  });

  it("renders the social links", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument();
  });
});
