import { render, screen } from "@testing-library/react";
import { Button } from "@/app/components/ui/button";

describe("Button", () => {
  it("renders default and destructive variants", () => {
    render(
      <>
        <Button>Save</Button>
        <Button variant="destructive">Delete</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("respects the disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });
});
