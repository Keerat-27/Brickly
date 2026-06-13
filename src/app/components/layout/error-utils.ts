export function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return /loading dynamically imported module|Failed to fetch dynamically imported module|Importing a module script failed|error loading/i.test(
    error.message,
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong.";
}
