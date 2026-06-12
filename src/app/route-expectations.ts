import { navItems } from "./components/layout/nav-config";
import { appRoutes } from "./routes";

export interface RouteExpectation {
  path: string;
  heading: string;
}

/** Overview uses a custom hero h1 instead of PageHeader. */
const OVERVIEW_HEADING = "Brickly Component Library";

export const getRouteExpectations = (): RouteExpectation[] =>
  navItems.flatMap((group) =>
    group.items.map((item) => ({
      path: item.to,
      heading: item.to === "/" ? OVERVIEW_HEADING : item.label,
    })),
  );

export const getAppChildRoutePaths = (): string[] => {
  const layoutRoute = appRoutes[0];
  if (!layoutRoute?.children) return [];

  return layoutRoute.children.map((child) => {
    if ("index" in child && child.index) return "/";
    return `/${child.path}`;
  });
};

export const assertRoutesMatchNav = (): void => {
  const navPaths = getRouteExpectations()
    .map((route) => route.path)
    .sort();
  const routePaths = getAppChildRoutePaths().sort();

  if (navPaths.length !== routePaths.length) {
    throw new Error(
      `Route count mismatch: nav has ${navPaths.length}, appRoutes has ${routePaths.length}`,
    );
  }

  for (let i = 0; i < navPaths.length; i += 1) {
    if (navPaths[i] !== routePaths[i]) {
      throw new Error(
        `Route mismatch at index ${i}: nav "${navPaths[i]}" vs routes "${routePaths[i]}"`,
      );
    }
  }
};
