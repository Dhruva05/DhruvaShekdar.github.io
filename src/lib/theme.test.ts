import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  THEME_STORAGE_KEY,
  getInitialTheme,
  isTheme,
  themeInitializationScript,
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

  it("builds a defensive pre-paint initialization script", () => {
    expect(themeInitializationScript).toContain(THEME_STORAGE_KEY);
    expect(themeInitializationScript).toContain("localStorage.getItem");
    expect(themeInitializationScript).toContain("matchMedia");
    expect(themeInitializationScript).toContain("dataset.theme");
    expect(themeInitializationScript).toContain("colorScheme");
    expect(themeInitializationScript).toContain("catch");
  });

  it("runs the theme initialization script in the root layout", () => {
    const layout = readFileSync(
      path.join(process.cwd(), "src/app/layout.tsx"),
      "utf8",
    );

    expect(layout).toContain("themeInitializationScript");
    expect(layout).toContain("suppressHydrationWarning");
  });

  it("defines an accessible persistent theme toggle in navigation", () => {
    const toggle = readFileSync(
      path.join(
        process.cwd(),
        "src/components/layout/theme-toggle.tsx",
      ),
      "utf8",
    );
    const navigation = readFileSync(
      path.join(
        process.cwd(),
        "src/components/layout/navigation.tsx",
      ),
      "utf8",
    );

    expect(toggle).toContain('"use client"');
    expect(toggle).toContain("<button");
    expect(toggle).toContain('type="button"');
    expect(toggle).toContain("aria-pressed");
    expect(toggle).toContain("Switch to dark mode");
    expect(toggle).toContain("Switch to light mode");
    expect(toggle).toContain("localStorage.setItem");
    expect(toggle).toContain("matchMedia");
    expect(toggle).toContain("addEventListener");
    expect(toggle).toContain("removeEventListener");
    expect(navigation).toContain("<ThemeToggle />");
  });
});
