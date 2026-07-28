import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the name heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Ofek Dahari" }),
    ).toBeInTheDocument();
  });

  it("renders the social links pointing at the correct destinations", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/ofekda99",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/ofek-dahari",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:ofekda9@gmail.com",
    );
  });
});
