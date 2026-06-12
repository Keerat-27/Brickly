import { vi } from "vitest";

export const clipboardWriteTextMock = vi
  .fn()
  .mockResolvedValue(undefined);

Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: {
    writeText: clipboardWriteTextMock,
  },
});
