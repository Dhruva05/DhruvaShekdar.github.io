import { describe, expect, it } from "vitest";

import {
  THEME_STORAGE_KEY,
  getInitialTheme,
  isTheme,
} from "./theme";

describe("theme preference", () => {
  it("uses a valid stored preference before the system preference", () => {
    expect(getInitialTheme("light", true)).toBe("light");
    expect(getInitialTheme("dark", false)).toBe("dark");
  });

  it("falls back to the system preference for missing or invalid storage", () => {
    expect(getInitialTheme(null, true)).toBe("dark");
    expect(getInitialTheme("system", false)).toBe("light");
  });

  it("exports a versioned storage key and validates theme values", () => {
    expect(THEME_STORAGE_KEY).toBe("portfolio-theme-v1");
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("system")).toBe(false);
  });
});
