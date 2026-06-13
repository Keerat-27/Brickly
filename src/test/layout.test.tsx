import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { THEME_STORAGE_KEY } from "../app/components/layout/useTheme";
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

  it("switches theme from the command palette", async () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    const user = userEvent.setup();
    renderWithRouter("/");

    await user.click(screen.getByRole("button", { name: "Search components" }));

    const darkModeItem = await screen.findByRole("option", {
      name: /switch to dark mode/i,
    });
    await user.click(darkModeItem);

    expect(document.documentElement).toHaveClass("dark");
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
