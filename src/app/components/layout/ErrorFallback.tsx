import { Link } from "react-router";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "../ui/utils";

interface ErrorFallbackProps {
  title: string;
  description: string;
  details?: string;
  onRetry?: () => void;
  retryLabel?: string;
  showHomeLink?: boolean;
  className?: string;
}

export function ErrorFallback({
  title,
  description,
  details,
  onRetry,
  retryLabel = "Try again",
  showHomeLink = false,
  className,
}: ErrorFallbackProps) {
  return (
    <Card className={cn("shadow-sm", className)} role="alert">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {details && import.meta.env.DEV ? (
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            {details}
          </pre>
        </CardContent>
      ) : null}

      {(onRetry || showHomeLink) && (
        <CardFooter className="flex flex-wrap gap-2">
          {onRetry ? (
            <Button type="button" onClick={onRetry}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              {retryLabel}
            </Button>
          ) : null}
          {showHomeLink ? (
            <Button type="button" variant="outline" asChild>
              <Link to="/">
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to overview
              </Link>
            </Button>
          ) : null}
        </CardFooter>
      )}
    </Card>
  );
}
