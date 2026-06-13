import { useRouteError } from "react-router";
import { ErrorFallback } from "./ErrorFallback";
import { getErrorMessage, isChunkLoadError } from "./error-utils";
import { useTheme } from "./useTheme";

export function RouteErrorPage() {
  const error = useRouteError();
  useTheme();

  const chunkError = isChunkLoadError(error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-foreground">
      <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Brickly
      </p>
      <ErrorFallback
        className="w-full max-w-lg"
        title={chunkError ? "Update available" : "Something went wrong"}
        description={
          chunkError
            ? "This page could not load, usually because a newer version was deployed. Refresh to load the latest files."
            : "We hit an unexpected error while loading this page. You can try again or head back to the overview."
        }
        details={getErrorMessage(error)}
        onRetry={() => window.location.reload()}
        retryLabel={chunkError ? "Refresh page" : "Try again"}
        showHomeLink
      />
    </div>
  );
}
