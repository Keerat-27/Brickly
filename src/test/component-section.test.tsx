import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ComponentSection } from "@/app/components/ui/ComponentSection";
import { Button } from "@/app/components/ui/button";
import { buildFullExample } from "@/app/components/ui/buildFullExample";

vi.mock("@/app/components/ui/buildFullExample", () => ({
  buildFullExample: vi.fn(
    (code: string) => `FULL:${code}`,
  ),
}));

describe("ComponentSection", () => {
  beforeEach(() => {
    vi.mocked(buildFullExample).mockClear();
  });

  it("copies the full example using the shared import-path state", async () => {
    const user = userEvent.setup();
    const code = `import { Button } from "@/components/ui/button";

<Button>Primary</Button>`;

    render(
      <ComponentSection
        title="Variants"
        code={code}
        shadcnComponent="button"
      >
        <Button>Primary</Button>
      </ComponentSection>,
    );

    await user.click(screen.getByRole("button", { name: "Copy full example" }));

    expect(buildFullExample).toHaveBeenCalledWith(
      code,
      "alias",
      "npx shadcn@latest add button",
    );
  });

  it("passes the relative import style after toggling", async () => {
    const user = userEvent.setup();
    const code = `import { Button } from "@/components/ui/button";

<Button>Primary</Button>`;

    render(
      <ComponentSection title="Variants" code={code}>
        <Button>Primary</Button>
      </ComponentSection>,
    );

    await user.click(screen.getByRole("tab", { name: "Code" }));
    await user.click(screen.getByRole("button", { name: "Relative" }));
    await user.click(
      screen.getByRole("button", { name: "Copy full example" }),
    );

    expect(buildFullExample).toHaveBeenLastCalledWith(code, "relative", undefined);
  });
});
