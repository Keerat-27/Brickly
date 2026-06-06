import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const getPages = (current: number, total: number, delta = 1): (number | "ellipsis")[] => {
  const pages: (number | "ellipsis")[] = [];

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return pages;
};

const ShadcnPaginationDemo = ({ totalPages = 12 }: { totalPages?: number }) => {
  const [page, setPage] = useState(5);
  const pages = getPages(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.max(1, p - 1));
            }}
          />
        </PaginationItem>
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={page === p}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.min(totalPages, p + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const FullPaginationDemo = ({ total = 15 }: { total?: number }) => {
  const [page, setPage] = useState(1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            aria-label="Go to first page"
            onClick={(e) => {
              e.preventDefault();
              setPage(1);
            }}
          >
            <ChevronsLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.max(1, p - 1));
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-3 text-sm text-muted-foreground">
            Page <span className="text-foreground">{page}</span> of {total}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.min(total, p + 1));
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            aria-label="Go to last page"
            onClick={(e) => {
              e.preventDefault();
              setPage(total);
            }}
          >
            <ChevronsRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const PaginationWithSize = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("10");
  const pageSize = Number(size);
  const total = Math.ceil(100 / pageSize);
  const safePage = Math.min(page, total);
  const pages = getPages(safePage, total);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
            />
          </PaginationItem>
          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={safePage === p}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(total, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Rows per page</span>
        <Select
          value={size}
          onValueChange={(value) => {
            setSize(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["5", "10", "20", "50"].map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className="text-sm text-muted-foreground">
        Showing {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, 100)} of 100
      </span>
    </div>
  );
};

export const PaginationPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Pagination"
        description="Navigate multi-page datasets with the shadcn Pagination primitive."
        badge="Component"
      />

      <ComponentSection
        title="Default"
        description="Composable pagination with Previous, Next, page links, and ellipsis."
        source="shadcn"
        code={`import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>5</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <ShadcnPaginationDemo />
      </ComponentSection>

      <ComponentSection
        title="Full Controls"
        description="First, previous, next, and last buttons with a page indicator."
        source="shadcn"
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" size="icon"><ChevronsLeft /></PaginationLink>
    </PaginationItem>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><span>Page 1 of 15</span></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon"><ChevronsRight /></PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <FullPaginationDemo />
      </ComponentSection>

      <ComponentSection
        title="With Page Size Selector"
        description="Combines pagination with a shadcn Select for rows-per-page."
        source="composition"
        code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<Select value={size} onValueChange={setSize}>
  <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="10">10</SelectItem>
    <SelectItem value="20">20</SelectItem>
  </SelectContent>
</Select>`}
      >
        <PaginationWithSize />
      </ComponentSection>
    </div>
  );
}
