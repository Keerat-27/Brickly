import { describe, expect, it } from "vitest";
import { buildFullExample } from "@/app/components/ui/buildFullExample";

describe("buildFullExample", () => {
  const code = `import { Button } from "@/components/ui/button";

<Button>Click me</Button>`;

  it("returns transformed code without an install command", () => {
    expect(buildFullExample(code, "alias")).toContain(
      '@/app/components/ui/button',
    );
    expect(buildFullExample(code, "relative")).toContain(
      "../components/ui/button",
    );
  });

  it("prepends the install command when provided", () => {
    const result = buildFullExample(
      code,
      "alias",
      "npx shadcn@latest add button",
    );

    expect(result).toMatch(/^npx shadcn@latest add button\n\n/);
    expect(result).toContain('<Button>Click me</Button>');
  });
});
