const SNIPPET_ALIAS = "@/components/ui/";
const APP_ALIAS = "@/app/components/ui/";
const RELATIVE_PATH = "../components/ui/";

export type ImportPathStyle = "alias" | "relative";

const replacePath = (code: string, from: string, to: string) =>
  code.split(from).join(to);

export const transformImportPaths = (
  code: string,
  style: ImportPathStyle,
): string => {
  const normalized = replacePath(
    replacePath(code, APP_ALIAS, SNIPPET_ALIAS),
    RELATIVE_PATH,
    SNIPPET_ALIAS,
  );

  if (style === "alias") {
    return replacePath(normalized, SNIPPET_ALIAS, APP_ALIAS);
  }

  return replacePath(normalized, SNIPPET_ALIAS, RELATIVE_PATH);
};
