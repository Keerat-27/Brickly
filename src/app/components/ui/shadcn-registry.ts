/**
 * Maps Brickly UI files to shadcn/ui registry names for CLI install hints.
 * @see https://ui.shadcn.com/docs/components
 */
const SHADCN_REGISTRY = {
  accordion: "accordion",
  alert: "alert",
  "alert-dialog": "alert-dialog",
  "aspect-ratio": "aspect-ratio",
  avatar: "avatar",
  badge: "badge",
  breadcrumb: "breadcrumb",
  button: "button",
  calendar: "calendar",
  card: "card",
  carousel: "carousel",
  chart: "chart",
  checkbox: "checkbox",
  collapsible: "collapsible",
  command: "command",
  "context-menu": "context-menu",
  dialog: "dialog",
  drawer: "drawer",
  "dropdown-menu": "dropdown-menu",
  form: "form",
  "hover-card": "hover-card",
  input: "input",
  "input-otp": "input-otp",
  label: "label",
  menubar: "menubar",
  "navigation-menu": "navigation-menu",
  pagination: "pagination",
  popover: "popover",
  progress: "progress",
  "radio-group": "radio-group",
  resizable: "resizable",
  "scroll-area": "scroll-area",
  select: "select",
  separator: "separator",
  sheet: "sheet",
  sidebar: "sidebar",
  skeleton: "skeleton",
  slider: "slider",
  sonner: "sonner",
  switch: "switch",
  table: "table",
  tabs: "tabs",
  textarea: "textarea",
  toggle: "toggle",
  "toggle-group": "toggle-group",
  tooltip: "tooltip",
} as const;

export type ShadcnComponentName = keyof typeof SHADCN_REGISTRY;

export const getShadcnInstallCommand = (
  component: ShadcnComponentName | string,
): string => {
  const name =
    component in SHADCN_REGISTRY
      ? SHADCN_REGISTRY[component as ShadcnComponentName]
      : component;

  return `npx shadcn@latest add ${name}`;
};
