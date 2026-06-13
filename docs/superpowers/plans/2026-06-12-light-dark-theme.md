# Light and Dark Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent, accessible light and dark theme switch that follows the system preference on first visit and avoids a wrong-theme flash.

**Architecture:** Keep theme state on the root `data-theme` attribute and use CSS variables as the visual source of truth. A small shared theme module provides pure preference helpers and the pre-paint script, while one focused client component handles user interaction and live system changes without introducing an application-wide provider.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, CSS custom properties, Vitest, browser local storage, `matchMedia`.

---

### Task 1: Define Theme Preference Primitives

**Files:**
- Create: `src/lib/theme.test.ts`
- Create: `src/lib/theme.ts`

- [ ] **Step 1: Write failing unit tests for stored and system preference**

Create `src/lib/theme.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: FAIL because `src/lib/theme.ts` does not exist.

- [ ] **Step 3: Implement the pure theme helpers**

Create `src/lib/theme.ts`:

```ts
export const THEME_STORAGE_KEY = "portfolio-theme-v1";
export const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

export type Theme = "light" | "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getInitialTheme(
  storedTheme: unknown,
  prefersDark: boolean,
): Theme {
  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  return prefersDark ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
```

- [ ] **Step 4: Run the test and verify GREEN**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: 3 tests pass.

### Task 2: Add Pre-Paint Theme Initialization

**Files:**
- Modify: `src/lib/theme.test.ts`
- Modify: `src/lib/theme.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add a failing pre-paint script test**

Extend `src/lib/theme.test.ts`:

```ts
import { themeInitializationScript } from "./theme";

it("builds a defensive pre-paint initialization script", () => {
  expect(themeInitializationScript).toContain(THEME_STORAGE_KEY);
  expect(themeInitializationScript).toContain("localStorage.getItem");
  expect(themeInitializationScript).toContain("matchMedia");
  expect(themeInitializationScript).toContain("dataset.theme");
  expect(themeInitializationScript).toContain("colorScheme");
  expect(themeInitializationScript).toContain("catch");
});
```

Add a source assertion:

```ts
import { readFileSync } from "node:fs";
import path from "node:path";

it("runs the theme initialization script in the root layout", () => {
  const layout = readFileSync(
    path.join(process.cwd(), "src/app/layout.tsx"),
    "utf8",
  );

  expect(layout).toContain("themeInitializationScript");
  expect(layout).toContain("suppressHydrationWarning");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: FAIL because `themeInitializationScript` is not exported and the
layout does not use it.

- [ ] **Step 3: Export the initialization script**

Append to `src/lib/theme.ts`:

```ts
export const themeInitializationScript = `(() => {
  const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  const query = ${JSON.stringify(DARK_MODE_QUERY)};
  let storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(storageKey);
  } catch {}

  const theme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia(query).matches
        ? "dark"
        : "light";

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();`;
```

- [ ] **Step 4: Run the script before visible layout content**

Import the script in `src/app/layout.tsx`:

```ts
import { themeInitializationScript } from "@/lib/theme";
```

Update the root element and insert the script as its first child:

```tsx
<html lang="en" suppressHydrationWarning>
  <body className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
    <script
      dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
    />
    {/* existing structured data, navigation, content, and footer */}
  </body>
</html>
```

- [ ] **Step 5: Run the tests and verify GREEN**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: all theme tests pass.

### Task 3: Build the Accessible Theme Toggle

**Files:**
- Create: `src/components/layout/theme-toggle.tsx`
- Modify: `src/lib/theme.test.ts`
- Modify: `src/components/layout/navigation.tsx`

- [ ] **Step 1: Add failing component contract tests**

Extend `src/lib/theme.test.ts`:

```ts
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
  expect(toggle).toContain('<button');
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
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the client toggle**

Create `src/components/layout/theme-toggle.tsx`:

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import {
  applyTheme,
  DARK_MODE_QUERY,
  getInitialTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

function readStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
    const storedTheme = readStoredTheme();
    const initialTheme = getInitialTheme(storedTheme, mediaQuery.matches);

    setTheme(initialTheme);
    applyTheme(initialTheme);

    const handleSystemChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() !== null) {
        return;
      }

      const nextTheme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}

    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      aria-pressed={isDark}
      onClick={handleToggle}
    >
      <Sun aria-hidden="true" className="theme-toggle__icon" />
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      <Moon aria-hidden="true" className="theme-toggle__icon" />
    </button>
  );
}
```

- [ ] **Step 4: Render the control in navigation**

Import and render in `src/components/layout/navigation.tsx`:

```tsx
import { ThemeToggle } from "@/components/layout/theme-toggle";
```

Place it after the GitHub link and before Resume:

```tsx
<ThemeToggle />
```

- [ ] **Step 5: Run the test and verify GREEN**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: all theme tests pass.

### Task 4: Add Graphite Theme Tokens and Toggle Styling

**Files:**
- Modify: `src/lib/theme.test.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add failing CSS contract tests**

Extend `src/lib/theme.test.ts`:

```ts
it("defines graphite theme tokens and responsive toggle styles", () => {
  const styles = readFileSync(
    path.join(process.cwd(), "src/app/globals.css"),
    "utf8",
  );

  expect(styles).toContain(':root[data-theme="dark"]');
  expect(styles).toContain("--header-background:");
  expect(styles).toContain("--grid-line:");
  expect(styles).toContain("--panel-translucent:");
  expect(styles).toContain("--footer-muted:");
  expect(styles).toContain(".theme-toggle");
  expect(styles).toContain(".theme-toggle__track");
  expect(styles).toContain(".theme-toggle__thumb");
  expect(styles).toContain(
    ':root[data-theme="dark"] .theme-toggle__thumb',
  );
  expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: FAIL because dark theme and toggle styles are absent.

- [ ] **Step 3: Add semantic light and dark tokens**

Expand the current `:root` token block:

```css
:root {
  --canvas: #f7f7f5;
  --surface: #ffffff;
  --ink: #111318;
  --ink-soft: #3f4650;
  --muted: #626a75;
  --line: #d9dde1;
  --line-strong: #b9c0c8;
  --blue: #2457d6;
  --teal: #147a70;
  --selection: #dce5ff;
  --grid-line: rgb(17 19 24 / 0.025);
  --header-border: rgb(17 19 24 / 0.1);
  --header-background: rgb(247 247 245 / 0.92);
  --panel-translucent: rgb(255 255 255 / 0.55);
  --footer-muted: #aeb3bb;
  --footer-link: #c8ccd2;
}

:root[data-theme="dark"] {
  --canvas: #0e1014;
  --surface: #171a20;
  --ink: #f1f3f5;
  --ink-soft: #c3c9d1;
  --muted: #9aa3ae;
  --line: #30343b;
  --line-strong: #454b55;
  --blue: #7f9fff;
  --teal: #57b8ad;
  --selection: #202d52;
  --grid-line: rgb(255 255 255 / 0.035);
  --header-border: rgb(255 255 255 / 0.1);
  --header-background: rgb(14 16 20 / 0.92);
  --panel-translucent: rgb(23 26 32 / 0.72);
  --footer-muted: #9aa3ae;
  --footer-link: #c3c9d1;
}
```

Replace explicit theme-dependent values:

```css
body {
  background:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px)
      top center / 6rem 100%,
    var(--canvas);
}

.site-header {
  border-bottom-color: var(--header-border);
  background: var(--header-background);
}

.process-flow__stage {
  background: var(--panel-translucent);
}

.site-footer__meta {
  color: var(--footer-muted);
}

.site-footer__links a {
  color: var(--footer-link);
}
```

- [ ] **Step 4: Add toggle interaction styles**

Add:

```css
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-width: 4.75rem;
  min-height: 2.5rem;
  padding: 0.35rem 0.45rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
  font: inherit;
}

.theme-toggle:hover {
  border-color: var(--line-strong);
  color: var(--ink);
}

.theme-toggle__icon {
  width: 0.85rem;
  height: 0.85rem;
  stroke-width: 1.8;
}

.theme-toggle__track {
  position: relative;
  width: 1.65rem;
  height: 0.95rem;
  border-radius: 999px;
  background: var(--line-strong);
}

.theme-toggle__thumb {
  position: absolute;
  top: 0.15rem;
  left: 0.15rem;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background: var(--surface);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.22);
  transition: transform 140ms ease;
}

:root[data-theme="dark"] .theme-toggle__thumb {
  transform: translateX(0.7rem);
}

html,
body,
.site-header,
.button,
.theme-toggle,
.theme-toggle__track,
.process-flow__stage,
.results-table__highlight,
.site-footer {
  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease;
}
```

In the existing mobile media query, reduce action spacing if needed:

```css
.site-nav__actions {
  gap: 0.55rem;
}

.theme-toggle {
  min-width: 4.25rem;
  padding-inline: 0.35rem;
}
```

In reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  html,
  body,
  .site-header,
  .button,
  .theme-toggle,
  .theme-toggle__track,
  .theme-toggle__thumb,
  .process-flow__stage,
  .results-table__highlight,
  .site-footer {
    transition: none;
  }
}
```

- [ ] **Step 5: Run theme tests and verify GREEN**

Run:

```bash
npm test -- src/lib/theme.test.ts
```

Expected: all theme tests pass.

### Task 5: Verify the Complete Theme Experience

**Files:**
- Modify only if verification reveals a defect.

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
npm run lint
GITHUB_ACTIONS=true npm run build
git diff --check
```

Expected: all tests pass, ESLint exits cleanly, static export succeeds, and
the diff has no whitespace errors.

- [ ] **Step 2: Verify the production export**

Run:

```bash
test -f out/index.html
test -f out/projects/mini-dlss/index.html
rg -n "portfolio-theme-v1|data-theme|theme-toggle" out/index.html
```

Expected: homepage and case-study exports exist and the homepage contains theme
initialization and toggle markup.

- [ ] **Step 3: Run browser verification**

Start the production-like site and verify at desktop and 390 CSS pixels:

- No stored preference plus dark system preference starts dark before content
  paints.
- No stored preference plus light system preference starts light.
- The toggle switches immediately in both directions.
- Reload and navigation to `/projects/mini-dlss/` retain the manual choice.
- Keyboard focus is visible and Enter/Space activate the native button.
- Navigation has no horizontal overflow.
- Homepage and case-study text, borders, cards, tables, media, selection rows,
  header, and footer remain readable in both themes.
- Reduced-motion mode removes theme transitions.

- [ ] **Step 4: Capture screenshots and inspect**

Capture:

- Homepage first viewport in light desktop.
- Homepage first viewport in dark desktop.
- Navigation and hero in dark mobile.
- Mini-DLSS metrics and results table in dark mode.

Inspect palette fidelity against the approved neutral graphite concept, control
placement, icon weight, track state, header density, contrast, and responsive
fit.

- [ ] **Step 5: Review the final repository state**

Run:

```bash
git status --short
git diff --stat
git diff -- src/lib/theme.ts src/lib/theme.test.ts \
  src/components/layout/theme-toggle.tsx \
  src/components/layout/navigation.tsx \
  src/app/layout.tsx src/app/globals.css
```

Confirm the pre-existing root `.DS_Store` modification remains unstaged and no
unrelated files changed.
