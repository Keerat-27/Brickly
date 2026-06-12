import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../components/ui/menubar";

export const MenubarPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Menubar"
        description="Desktop-style menu bars with nested submenus, checkboxes, and radio groups."
        badge="Component"
      />

      <ComponentSection
        title="Default"
        description="A horizontal menu bar with File, Edit, and View menus."
        source="shadcn"
        shadcnComponent="menubar"
        accessibility="Menu items are keyboard navigable with arrow keys; submenus open on Enter or Right arrow."
        code={`import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
      >
        <Menubar className="w-full max-w-xl">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Reload</MenubarItem>
              <MenubarItem>Full Screen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ComponentSection>

      <ComponentSection
        title="Submenus"
        description="Nested menus for grouped actions like export formats."
        source="shadcn"
        shadcnComponent="menubar"
        code={`<MenubarMenu>
  <MenubarTrigger>Export</MenubarTrigger>
  <MenubarContent>
    <MenubarSub>
      <MenubarSubTrigger>Share</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>Email link</MenubarItem>
        <MenubarItem>Messages</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>`}
      >
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Export</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Download PDF</MenubarItem>
              <MenubarItem>Download CSV</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ComponentSection>

      <ComponentSection
        title="Checkbox & Radio Items"
        description="Toggle options and single-select groups inside a menu."
        source="shadcn"
        shadcnComponent="menubar"
        code={`<MenubarContent>
  <MenubarCheckboxItem checked>Show Toolbar</MenubarCheckboxItem>
  <MenubarCheckboxItem>Show Full URLs</MenubarCheckboxItem>
  <MenubarSeparator />
  <MenubarRadioGroup value="center">
    <MenubarRadioItem value="left">Left</MenubarRadioItem>
    <MenubarRadioItem value="center">Center</MenubarRadioItem>
    <MenubarRadioItem value="right">Right</MenubarRadioItem>
  </MenubarRadioGroup>
</MenubarContent>`}
      >
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Options</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked>Show Toolbar</MenubarCheckboxItem>
              <MenubarCheckboxItem>Show Full URLs</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarRadioGroup value="center">
                <MenubarRadioItem value="left">Align Left</MenubarRadioItem>
                <MenubarRadioItem value="center">Align Center</MenubarRadioItem>
                <MenubarRadioItem value="right">Align Right</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ComponentSection>
    </div>
  );
};
