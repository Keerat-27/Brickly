import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Skeleton } from "../components/ui/skeleton";
import { Loader2 } from "lucide-react";

const Spinner = ({ size = "md", color = "primary" }: { size?: "sm" | "md" | "lg" | "xl"; color?: "primary" | "white" | "muted" }) => {
  const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8", xl: "w-12 h-12" };
  const colors = { primary: "text-primary", white: "text-white", muted: "text-muted-foreground" };
  return <Loader2 className={`${sizes[size]} ${colors[color]} animate-spin`} />;
}

const SkeletonCard = () => {
  return (
    <div className="rounded-xl border border-border p-5 space-y-4 w-64">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
      <Skeleton className="h-8 w-full rounded-lg" />
    </div>
  );
}

const SkeletonTable = () => {
  return (
    <div className="w-full rounded-xl border border-border overflow-hidden">
      <div className="flex gap-4 px-4 py-3 bg-muted/50 border-b border-border">
        {[120, 80, 60, 80].map((w, i) => (
          <Skeleton key={i} className="h-3" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3 border-b border-border last:border-0">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

const Dots = () => {
  return (
    <div className="flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

const PulseLoader = () => {
  return (
    <div className="flex gap-2 items-center">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-2 h-8 rounded-full bg-primary animate-pulse"
          style={{ animationDelay: `${i * 0.1}s`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

export const LoadingPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Loading"
        description="Spinners, skeletons, and animated placeholders for loading and async states."
        badge="Component"
      />

      <ComponentSection
        title="Spinners"
        description="Simple rotating spinners in different sizes and a ring variant."
        source="custom"
        code={`{/* Icon spinner */}
import { Loader2 } from "lucide-react";
<Loader2 className="w-6 h-6 text-primary animate-spin" />

{/* Ring spinner */}
<div className="w-8 h-8 rounded-full border-4 border-muted border-t-primary animate-spin" />`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
          <div className="w-8 h-8 rounded-full border-4 border-muted border-t-primary animate-spin" />
          <div className="w-8 h-8 rounded-full border-4 border-muted border-t-blue-500 animate-spin" />
          <div className="w-8 h-8 rounded-full border-4 border-muted border-t-green-500 animate-spin" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Dot Loaders"
        description="Bouncing dot animations for inline loading states."
        source="custom"
        code={`<div className="flex gap-1.5 items-center">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="w-2 h-2 rounded-full bg-primary animate-bounce"
      style={{ animationDelay: \`\${i * 0.15}s\` }}
    />
  ))}
</div>`}
      >
        <div className="flex flex-col gap-4">
          <Dots />
          <PulseLoader />
          <div className="flex gap-1.5 items-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Skeleton Cards"
        description="Placeholder content while data is loading."
        source="shadcn"
        shadcnComponent="skeleton"
        code={`import { Skeleton } from "@/components/ui/skeleton";

<div className="rounded-xl border border-border p-5 space-y-4">
  <div className="flex items-center gap-3">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="flex-1 space-y-1.5">
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
  <Skeleton className="h-3 w-full" />
  <Skeleton className="h-3 w-5/6" />
  <Skeleton className="h-8 w-full rounded-lg" />
</div>`}
      >
        <div className="flex flex-wrap gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Skeleton Table"
        description="Table placeholder while data is being fetched."
        source="shadcn"
        shadcnComponent="skeleton"
        code={`<div className="w-full rounded-xl border border-border overflow-hidden">
  <div className="flex gap-4 px-4 py-3 bg-muted/50 border-b border-border">
    {[120, 80, 60, 80].map((w, i) => (
      <Skeleton key={i} className="h-3" style={{ width: w }} />
    ))}
  </div>
  {Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="flex gap-4 px-4 py-3 border-b border-border">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  ))}
</div>`}
      >
        <SkeletonTable />
      </ComponentSection>

      <ComponentSection
        title="Overlay Loading"
        description="Full-area loading state that blocks interaction."
        source="composition"
        code={`<div className="relative rounded-xl border border-border p-6 h-40">
  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="w-6 h-6 text-primary animate-spin" />
      <p className="text-sm text-muted-foreground">Loading data...</p>
    </div>
  </div>
</div>`}
      >
        <div className="relative rounded-xl border border-border p-8 h-40 w-full max-w-sm">
          <div className="space-y-2 opacity-30">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-5/6" />
          </div>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <p className="text-sm text-muted-foreground">Loading data…</p>
            </div>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
