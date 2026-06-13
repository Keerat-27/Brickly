import { lazy, type ComponentType } from "react";

const CHUNK_RELOAD_KEY = "brickly-chunk-reload";

const isChunkLoadFailure = (error: unknown): boolean =>
  error instanceof Error &&
  /loading dynamically imported module|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
    error.message,
  );

const loadWithChunkRetry = async <T>(loader: () => Promise<T>): Promise<T> => {
  try {
    const result = await loader();
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    return result;
  } catch (error) {
    if (isChunkLoadFailure(error) && !sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
      sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
      window.location.reload();
      return new Promise(() => {});
    }

    throw error;
  }
};

export const lazyPage = <T extends Record<string, ComponentType<unknown>>>(
  loader: () => Promise<T>,
  exportName: keyof T,
) =>
  lazy(() =>
    loadWithChunkRetry(loader).then((module) => ({
      default: module[exportName] as ComponentType<unknown>,
    })),
  );
