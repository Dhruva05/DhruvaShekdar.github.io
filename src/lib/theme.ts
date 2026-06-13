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
