import { Suspense, useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "./useTheme";
import { PageErrorBoundary } from "./PageErrorBoundary";

const PageFallback = () => (
  <div className="space-y-4" aria-busy="true" aria-label="Loading page">
    <Skeleton className="h-10 w-64" />
    <Skeleton className="h-4 w-full max-w-xl" />
    <Skeleton className="h-32 w-full rounded-xl" />
  </div>
);

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            sidebarOpen={sidebarOpen}
            darkMode={darkMode}
            onDarkModeToggle={toggleDarkMode}
          />
          <main className="flex-1 min-h-0">
            <ScrollArea className="h-full" type="always">
              <div className="max-w-5xl mx-auto px-6 py-10">
                <PageErrorBoundary>
                  <Suspense fallback={<PageFallback />}>
                    <Outlet />
                  </Suspense>
                </PageErrorBoundary>
              </div>
            </ScrollArea>
          </main>
        </div>
      </div>
  );
}
