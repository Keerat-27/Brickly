import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Square,
  Tag,
  Bell,
  User,
  CreditCard,
  FormInput,
  Activity,
  Layers,
  Grid3x3,
  Table2,
  Loader,
  Type,
  MessageSquare,
  ChevronDown,
  Navigation,
  Menu,
  SlidersHorizontal,
  ChevronRight,
  BellRing,
  ListOrdered,
  CalendarDays,
  Palette,
  BarChart3,
  Terminal,
  PanelLeft,
  KeyRound,
  Columns2,
  GalleryHorizontal,
  SquareMenu,
  Compass,
  ScrollText,
  SeparatorHorizontal,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navItems: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      { to: "/", label: "Overview", icon: LayoutGrid, end: true },
      { to: "/tokens", label: "Design Tokens", icon: Palette },
    ],
  },
  {
    label: "Components",
    items: [
      { to: "/accordion", label: "Accordion", icon: ChevronDown },
      { to: "/alerts", label: "Alerts", icon: Bell },
      { to: "/avatars", label: "Avatars", icon: User },
      { to: "/badges", label: "Badges", icon: Tag },
      { to: "/breadcrumbs", label: "Breadcrumbs", icon: Navigation },
      { to: "/buttons", label: "Buttons", icon: Square },
      { to: "/cards", label: "Cards", icon: CreditCard },
      { to: "/carousel", label: "Carousel", icon: GalleryHorizontal },
      { to: "/charts", label: "Charts", icon: BarChart3 },
      { to: "/command", label: "Command", icon: Terminal },
      { to: "/date-picker", label: "Date Picker", icon: CalendarDays },
      { to: "/dropdowns", label: "Dropdowns", icon: Menu },
      { to: "/forms", label: "Forms", icon: FormInput },
      { to: "/loading", label: "Loading", icon: Loader },
      { to: "/menubar", label: "Menubar", icon: SquareMenu },
      { to: "/modals", label: "Modals", icon: Layers },
      { to: "/navigation-menu", label: "Navigation Menu", icon: Compass },
      { to: "/otp", label: "OTP Input", icon: KeyRound },
      { to: "/pagination", label: "Pagination", icon: ChevronRight },
      { to: "/progress", label: "Progress", icon: Activity },
      { to: "/resizable", label: "Resizable", icon: Columns2 },
      { to: "/scroll-area", label: "Scroll Area", icon: ScrollText },
      { to: "/separator", label: "Separator", icon: SeparatorHorizontal },
      { to: "/sidebar", label: "Sidebar", icon: PanelLeft },
      { to: "/sliders", label: "Sliders", icon: SlidersHorizontal },
      { to: "/stepper", label: "Stepper", icon: ListOrdered },
      { to: "/tables", label: "Tables", icon: Table2 },
      { to: "/tabs", label: "Tabs", icon: Grid3x3 },
      { to: "/toasts", label: "Toasts", icon: BellRing },
      { to: "/tooltips", label: "Tooltips", icon: MessageSquare },
      { to: "/typography", label: "Typography", icon: Type },
    ],
  },
];
