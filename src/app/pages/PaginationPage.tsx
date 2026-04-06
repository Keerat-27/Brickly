import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";

/* ─── Helpers ────────────────────────────────────── */
function getPages(current: number, total: number, delta = 2): (number | "…")[] {
  const pages: (number | "…")[] = [];
  const left  = current - delta;
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

/* ─── Default pagination ─────────────────────────── */
function Pagination({
  total,
  value,
  onChange,
  variant = "default",
}: {
  total: number;
  value: number;
  onChange: (p: number) => void;
  variant?: "default" | "outline" | "minimal";
}) {
  const pages = getPages(value, total);

  const btnBase =
    "inline-flex items-center justify-center h-8 min-w-[2rem] px-2 rounded-lg text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  const active =
    variant === "outline"
      ? `${btnBase} border border-primary text-primary bg-primary/5`
      : variant === "minimal"
      ? `${btnBase} text-primary underline underline-offset-2`
      : `${btnBase} bg-primary text-primary-foreground`;

  const inactive =
    variant === "outline"
      ? `${btnBase} border border-border text-foreground hover:bg-accent`
      : variant === "minimal"
      ? `${btnBase} text-muted-foreground hover:text-foreground`
      : `${btnBase} text-foreground hover:bg-accent`;

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      <button
        className={`${btnBase} text-muted-foreground hover:bg-accent`}
        disabled={value === 1}
        onClick={() => onChange(value - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="flex items-center justify-center w-8 h-8 text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={page === value ? active : inactive}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`${btnBase} text-muted-foreground hover:bg-accent`}
        disabled={value === total}
        onClick={() => onChange(value + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

/* ─── Full controls ───────────────────────────────── */
function FullPagination({ total }: { total: number }) {
  const [page, setPage] = useState(1);
  return (
    <nav className="flex items-center gap-1" aria-label="Full Pagination">
      <button
        className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40"
        disabled={page === 1}
        onClick={() => setPage(1)}
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="px-3 text-sm text-muted-foreground">
        Page{" "}
        <span className="text-foreground">{page}</span>
        {" "}of {total}
      </span>

      <button
        className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40"
        disabled={page === total}
        onClick={() => setPage((p) => p + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40"
        disabled={page === total}
        onClick={() => setPage(total)}
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

/* ─── Per-page selector ──────────────────────────── */
function PaginationWithSize() {
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

/* ─── Pill variant ────────────────────────────────── */
function PillPagination() {
  const [page, setPage] = useState(3);
  const total = 8;
  const pages = getPages(page, total);

  return (
    <nav className="flex items-center gap-1">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="h-8 px-3 rounded-full text-sm text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40 flex items-center gap-1"
      >
        <ChevronLeft className="w-3.5 h-3.5" /> Prev
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`h-8 min-w-[2rem] px-2.5 rounded-full text-sm transition-colors ${
              p === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => setPage((p) => Math.min(total, p + 1))}
        disabled={page === total}
        className="h-8 px-3 rounded-full text-sm text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40 flex items-center gap-1"
      >
        Next <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
}

export function PaginationPage() {
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
        code={`function getPages(current, total, delta = 2) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta))
      pages.push(i);
    else if (i === current - delta - 1 || i === current + delta + 1)
      pages.push("…");
  }
  return pages;
}

<button onClick={() => setPage(p => p - 1)}><ChevronLeft /></button>
{pages.map(p => p === "…"
  ? <MoreHorizontal />
  : <button className={p === page ? "bg-primary text-primary-foreground" : ""}>{p}</button>
)}
<button onClick={() => setPage(p => p + 1)}><ChevronRight /></button>`}
      >
        <Pagination total={12} value={page1} onChange={setPage1} />
      </ComponentSection>

      <ComponentSection
        title="Outline Style"
        description="Bordered page buttons — a softer alternative to the filled style."
        code={`<button className="border border-primary text-primary bg-primary/5 ...">5</button>
<button className="border border-border text-foreground hover:bg-accent ...">6</button>`}
      >
        <Pagination total={10} value={page2} onChange={setPage2} variant="outline" />
      </ComponentSection>

      <ComponentSection
        title="Pill Buttons"
        description="Fully rounded buttons with labeled Prev / Next arrows."
        code={`<button className="h-8 px-3 rounded-full ... flex items-center gap-1">
  <ChevronLeft /> Prev
</button>
{pages.map(p => (
  <button className={p === page ? "rounded-full bg-primary ..." : "rounded-full ..."}>
    {p}
  </button>
))}`}
      >
        <PillPagination />
      </ComponentSection>

      <ComponentSection
        title="Minimal"
        description="Lightweight text-only style for clean interfaces."
        code={`<button className="text-primary underline underline-offset-2 ...">5</button>
<button className="text-muted-foreground hover:text-foreground ...">6</button>`}
      >
        <Pagination total={8} value={page3} onChange={setPage3} variant="minimal" />
      </ComponentSection>

      <ComponentSection
        title="Full Controls"
        description="First, previous, next, and last buttons with a page indicator."
        code={`<button onClick={() => setPage(1)}><ChevronsLeft /></button>
<button onClick={() => setPage(p => p - 1)}><ChevronLeft /></button>
<span>Page {page} of {total}</span>
<button onClick={() => setPage(p => p + 1)}><ChevronRight /></button>
<button onClick={() => setPage(total)}><ChevronsRight /></button>`}
      >
        <FullPagination total={15} />
      </ComponentSection>

      <ComponentSection
        title="With Page Size Selector"
        description="Combines pagination with a rows-per-page select and a result count."
        code={`<select value={size} onChange={e => setSize(+e.target.value)}>
  {[5, 10, 20, 50].map(n => <option key={n}>{n}</option>)}
</select>
<span>Showing {(page - 1) * size + 1}–{Math.min(page * size, total)} of {total}</span>`}
      >
        <PaginationWithSize />
      </ComponentSection>
    </div>
  );
}
