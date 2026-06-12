import { screen } from "@testing-library/react";
import {
  assertRoutesMatchNav,
  getRouteExpectations,
} from "@/app/route-expectations";
import { renderWithRouter } from "./renderWithRouter";

describe("routing", () => {
  it("keeps nav items and appRoutes in sync", () => {
    expect(() => assertRoutesMatchNav()).not.toThrow();
  });

  it.each(getRouteExpectations())(
    "renders $heading at $path",
    async ({ path, heading }) => {
      renderWithRouter(path);
      expect(
        await screen.findByRole("heading", { level: 1, name: heading }),
      ).toBeInTheDocument();
    },
    15_000,
  );
});
