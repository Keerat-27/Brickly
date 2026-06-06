import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";

const getPages =(current: number, total: number, delta = 2): (number | "…")[]  => {
  const pages: (number | "…")[] = [];
  const left = current - delta;
  const right = current + delta;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i <= right)) {
      pages.push(i);
    } else if (
      (i === left - 1 && left > 2) ||
      (i === right + 1 && right < total - 1)
    ) {
      pages.push("…");
    }
  }
  return pages;
}

const Pagination = ({
  total,
  value,
  onChange,
  variant = "default",
}: {
  total: number;
  value: number;
  onChange: (p: number) => void;
  variant?: "default" | "outline" | "minimal";
}) => {
  const pages = getPages(value, total);

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={value === 1}
        onClick={() => onChange(value - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="flex items-center justify-center w-8 h-8 text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </span>
        ) : (
          <Button
            key={page}
            size="sm"
            onClick={() => onChange(page as number)}
            variant={
              page === value
                ? variant === "outline"
                  ? "outline"
                  : variant === "minimal"
                  ? "link"
                  : "default"
                : "ghost"
            }
            className={`h-8 min-w-[2rem] px-2 ${
              page === value && variant === "outline"
                ? "border-primary text-primary bg-primary/5"
                : page === value && variant === "minimal"
                ? "underline underline-offset-2 h-8 text-primary"
                : page !== value
                ? "text-foreground"
                : ""
            }`}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={value === total}
        onClick={() => onChange(value + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}

const FullPagination = ({ total }: { total: number }) => {
  const [page, setPage] = useState(1);
  return (
    <nav className="flex items-center gap-1" aria-label="Full Pagination">
      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(1)}>
        <ChevronsLeft className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <span className="px-3 text-sm text-muted-foreground">
        Page <span className="text-foreground">{page}</span> of {total}
      </span>

      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === total} onClick={() => setPage((p) => p + 1)}>
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === total} onClick={() => setPage(total)}>
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}

const PaginationWithSize = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const total = Math.ceil(100 / size);
  const safeP = Math.min(page, total);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Pagination total={total} value={safeP} onChange={setPage} />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Rows per page</span>
        <select
          value={size}
          onChange={(e) => { setSize(Number(e.target.value)); setPage(1); }}
          className="rounded-lg border border-border bg-background text-foreground px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <span className="text-sm text-muted-foreground">
        Showing {(safeP - 1) * size + 1}–{Math.min(safeP * size, 100)} of 100
      </span>
    </div>
  );
}

const PillPagination = () => {
  const [page, setPage] = useState(3);
  const total = 8;
  const pages = getPages(page, total);

  return (
    <nav className="flex items-center gap-1">
      <Button
        variant="ghost"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="h-8 px-3 rounded-full text-sm flex items-center gap-1"
      >
        <ChevronLeft className="w-3.5 h-3.5" /> Prev
      </Button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </span>
        ) : (
          <Button
            key={p}
            onClick={() => setPage(p as number)}
            variant={p === page ? "default" : "ghost"}
            className="h-8 min-w-[2rem] px-2.5 rounded-full text-sm"
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        onClick={() => setPage((p) => Math.min(total, p + 1))}
        disabled={page === total}
        className="h-8 px-3 rounded-full text-sm flex items-center gap-1"
      >
        Next <ChevronRight className="w-3.5 h-3.5" />
      </Button>
    </nav>
  );
}

export const PaginationPage = () => {
  const [page1, setPage1] = useState(5);
  const [page2, setPage2] = useState(3);
  const [page3, setPage3] = useState(4);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Pagination"
        description="Controls for navigating multi-page datasets with multiple visual styles."
        badge="Component"
      />

      <ComponentSection
        title="Default"
        description="Filled active page indicator with ellipsis for large page counts."
        code={`import { Button } from "@/components/ui/button";

<Button variant="default" size="sm">5</Button>  {/* active */}
<Button variant="ghost" size="sm">6</Button>     {/* inactive */}
<Button variant="ghost" size="icon" className="h-8 w-8">
  <ChevronLeft className="w-4 h-4" />
</Button>`}
      >
        <Pagination total={12} value={page1} onChange={setPage1} />
      </ComponentSection>

      <ComponentSection
        title="Outline Style"
        description="Bordered page buttons — a softer alternative to the filled style."
        code={`<Button variant="outline" size="sm" className="border-primary text-primary bg-primary/5">5</Button>
<Button variant="ghost" size="sm">6</Button>`}
      >
        <Pagination total={10} value={page2} onChange={setPage2} variant="outline" />
      </ComponentSection>

      <ComponentSection
        title="Pill Buttons"
        description="Fully rounded buttons with labeled Prev / Next arrows."
        code={`<Button variant="ghost" className="rounded-full h-8 px-3 flex items-center gap-1">
  <ChevronLeft /> Prev
</Button>
<Button variant="default" className="rounded-full h-8 min-w-[2rem] px-2.5">5</Button>
<Button variant="ghost" className="rounded-full h-8 px-3 flex items-center gap-1">
  Next <ChevronRight />
</Button>`}
      >
        <PillPagination />
      </ComponentSection>

      <ComponentSection
        title="Minimal"
        description="Lightweight text-only style for clean interfaces."
        code={`<Button variant="link" size="sm" className="underline underline-offset-2 text-primary">5</Button>
<Button variant="ghost" size="sm" className="text-foreground">6</Button>`}
      >
        <Pagination total={8} value={page3} onChange={setPage3} variant="minimal" />
      </ComponentSection>

      <ComponentSection
        title="Full Controls"
        description="First, previous, next, and last buttons with a page indicator."
        code={`<Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPage(1)}>
  <ChevronsLeft />
</Button>
<span>Page {page} of {total}</span>
<Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPage(total)}>
  <ChevronsRight />
</Button>`}
      >
        <FullPagination total={15} />
      </ComponentSection>

      <ComponentSection
        title="With Page Size Selector"
        description="Combines pagination with a rows-per-page select and a result count."
        code={`<select value={size} onChange={e => setSize(+e.target.value)}
  className="rounded-lg border border-border bg-background text-foreground px-2 py-1 text-sm">
  {[5, 10, 20, 50].map(n => <option key={n}>{n}</option>)}
</select>
<span className="text-sm text-muted-foreground">
  Showing {(page - 1) * size + 1}–{Math.min(page * size, total)} of {total}
</span>`}
      >
        <PaginationWithSize />
      </ComponentSection>
    </div>
  );
}
