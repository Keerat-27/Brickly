import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "./renderWithRouter";

describe("layout", () => {
  it("renders the header search trigger with an accessible label", () => {
    renderWithRouter("/");
    expect(
      screen.getByRole("button", { name: "Search components" }),
    ).toBeInTheDocument();
  });

  it("toggles dark mode from the header", async () => {
    const user = userEvent.setup();
    renderWithRouter("/");

    const toggle = screen.getByRole("button", { name: "Switch to dark mode" });
    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(toggle);

    expect(document.documentElement).toHaveClass("dark");
    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });

  it("opens the mobile navigation menu", async () => {
    const user = userEvent.setup();
    renderWithRouter("/");

    const sidebar = screen.getByRole("navigation", { name: "Component navigation" });
    expect(sidebar.closest("aside")).toHaveClass("-translate-x-full");

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(sidebar.closest("aside")).toHaveClass("translate-x-0");
  });
});
