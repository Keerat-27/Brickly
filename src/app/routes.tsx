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
import { AccordionPage } from "./pages/AccordionPage";
import { BreadcrumbsPage } from "./pages/BreadcrumbsPage";
import { DropdownsPage } from "./pages/DropdownsPage";
import { SlidersPage } from "./pages/SlidersPage";
import { PaginationPage } from "./pages/PaginationPage";
import { ToastsPage } from "./pages/ToastsPage";
import { StepperPage } from "./pages/StepperPage";
import { DatePickerPage } from "./pages/DatePickerPage";
import { TokensPage } from "./pages/TokensPage";

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
      { path: "accordion", Component: AccordionPage },
      { path: "breadcrumbs", Component: BreadcrumbsPage },
      { path: "dropdowns", Component: DropdownsPage },
      { path: "sliders", Component: SlidersPage },
      { path: "pagination", Component: PaginationPage },
      { path: "toasts", Component: ToastsPage },
      { path: "stepper", Component: StepperPage },
      { path: "date-picker", Component: DatePickerPage },
      { path: "tokens", Component: TokensPage },
    ],
  },
]);