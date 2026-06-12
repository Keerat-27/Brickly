import {
  transformImportPaths,
  type ImportPathStyle,
} from "./transformImportPaths";

export const buildFullExample = (
  code: string,
  importPathStyle: ImportPathStyle,
  installCommand?: string,
): string => {
  const snippet = transformImportPaths(code, importPathStyle);

  if (!installCommand) {
    return snippet;
  }

  return `${installCommand}\n\n${snippet}`;
};
