import { screen } from "@testing-library/react";
import { renderWithRouter } from "./renderWithRouter";

const routeExpectations = [
  { path: "/", heading: "Brickly Component Library" },
  { path: "/buttons", heading: "Buttons" },
  { path: "/modals", heading: "Modals" },
  { path: "/forms", heading: "Forms" },
  { path: "/dropdowns", heading: "Dropdowns" },
  { path: "/tokens", heading: "Design Tokens" },
  { path: "/charts", heading: "Charts" },
  { path: "/command", heading: "Command" },
] as const;

describe("routing", () => {
  it.each(routeExpectations)(
    "renders $heading at $path",
    async ({ path, heading }) => {
      renderWithRouter(path);
      expect(
        await screen.findByRole("heading", { level: 1, name: heading }),
      ).toBeInTheDocument();
    },
  );
});
