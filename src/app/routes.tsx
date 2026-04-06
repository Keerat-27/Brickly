import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { OverviewPage } from "./pages/OverviewPage";
import { ButtonsPage } from "./pages/ButtonsPage";
import { BadgesPage } from "./pages/BadgesPage";
import { AlertsPage } from "./pages/AlertsPage";
import { AvatarsPage } from "./pages/AvatarsPage";
import { CardsPage } from "./pages/CardsPage";
import { FormsPage } from "./pages/FormsPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ModalsPage } from "./pages/ModalsPage";
import { TabsPage } from "./pages/TabsPage";
import { TablesPage } from "./pages/TablesPage";
import { LoadingPage } from "./pages/LoadingPage";
import { TypographyPage } from "./pages/TypographyPage";
import { TooltipsPage } from "./pages/TooltipsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: OverviewPage },
      { path: "buttons", Component: ButtonsPage },
      { path: "badges", Component: BadgesPage },
      { path: "alerts", Component: AlertsPage },
      { path: "avatars", Component: AvatarsPage },
      { path: "cards", Component: CardsPage },
      { path: "forms", Component: FormsPage },
      { path: "progress", Component: ProgressPage },
      { path: "modals", Component: ModalsPage },
      { path: "tabs", Component: TabsPage },
      { path: "tables", Component: TablesPage },
      { path: "loading", Component: LoadingPage },
      { path: "typography", Component: TypographyPage },
      { path: "tooltips", Component: TooltipsPage },
    ],
  },
]);
