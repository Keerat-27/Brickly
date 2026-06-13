import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { RouteErrorPage } from "./components/layout/RouteErrorPage";
import { lazyPage } from "./lazy-page";

const OverviewPage = lazyPage(() => import("./pages/OverviewPage"), "OverviewPage");
const ButtonsPage = lazyPage(() => import("./pages/ButtonsPage"), "ButtonsPage");
const BadgesPage = lazyPage(() => import("./pages/BadgesPage"), "BadgesPage");
const AlertsPage = lazyPage(() => import("./pages/AlertsPage"), "AlertsPage");
const AvatarsPage = lazyPage(() => import("./pages/AvatarsPage"), "AvatarsPage");
const CardsPage = lazyPage(() => import("./pages/CardsPage"), "CardsPage");
const FormsPage = lazyPage(() => import("./pages/FormsPage"), "FormsPage");
const ProgressPage = lazyPage(() => import("./pages/ProgressPage"), "ProgressPage");
const ModalsPage = lazyPage(() => import("./pages/ModalsPage"), "ModalsPage");
const TabsPage = lazyPage(() => import("./pages/TabsPage"), "TabsPage");
const TablesPage = lazyPage(() => import("./pages/TablesPage"), "TablesPage");
const LoadingPage = lazyPage(() => import("./pages/LoadingPage"), "LoadingPage");
const TypographyPage = lazyPage(() => import("./pages/TypographyPage"), "TypographyPage");
const TooltipsPage = lazyPage(() => import("./pages/TooltipsPage"), "TooltipsPage");
const AccordionPage = lazyPage(() => import("./pages/AccordionPage"), "AccordionPage");
const BreadcrumbsPage = lazyPage(() => import("./pages/BreadcrumbsPage"), "BreadcrumbsPage");
const DropdownsPage = lazyPage(() => import("./pages/DropdownsPage"), "DropdownsPage");
const SlidersPage = lazyPage(() => import("./pages/SlidersPage"), "SlidersPage");
const PaginationPage = lazyPage(() => import("./pages/PaginationPage"), "PaginationPage");
const ToastsPage = lazyPage(() => import("./pages/ToastsPage"), "ToastsPage");
const StepperPage = lazyPage(() => import("./pages/StepperPage"), "StepperPage");
const DatePickerPage = lazyPage(() => import("./pages/DatePickerPage"), "DatePickerPage");
const TokensPage = lazyPage(() => import("./pages/TokensPage"), "TokensPage");
const ChartsPage = lazyPage(() => import("./pages/ChartsPage"), "ChartsPage");
const CommandPage = lazyPage(() => import("./pages/CommandPage"), "CommandPage");
const SidebarPage = lazyPage(() => import("./pages/SidebarPage"), "SidebarPage");
const OtpPage = lazyPage(() => import("./pages/OtpPage"), "OtpPage");
const ResizablePage = lazyPage(() => import("./pages/ResizablePage"), "ResizablePage");
const CarouselPage = lazyPage(() => import("./pages/CarouselPage"), "CarouselPage");
const MenubarPage = lazyPage(() => import("./pages/MenubarPage"), "MenubarPage");
const NavigationMenuPage = lazyPage(
  () => import("./pages/NavigationMenuPage"),
  "NavigationMenuPage",
);
const ScrollAreaPage = lazyPage(() => import("./pages/ScrollAreaPage"), "ScrollAreaPage");
const SeparatorPage = lazyPage(() => import("./pages/SeparatorPage"), "SeparatorPage");

export const appRoutes = [
  {
    path: "/",
    Component: Layout,
    errorElement: <RouteErrorPage />,
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
      { path: "charts", Component: ChartsPage },
      { path: "command", Component: CommandPage },
      { path: "sidebar", Component: SidebarPage },
      { path: "otp", Component: OtpPage },
      { path: "resizable", Component: ResizablePage },
      { path: "carousel", Component: CarouselPage },
      { path: "menubar", Component: MenubarPage },
      { path: "navigation-menu", Component: NavigationMenuPage },
      { path: "scroll-area", Component: ScrollAreaPage },
      { path: "separator", Component: SeparatorPage },
    ],
  },
];

export const router = createBrowserRouter(appRoutes, {
  basename: import.meta.env.BASE_URL.replace(/\/$/, "") || undefined,
});
