"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import {
  applyTheme,
  DARK_MODE_QUERY,
  getInitialTheme,
  isTheme,
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
      if (isTheme(readStoredTheme())) {
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
    } catch {
      // Theme switching still works when storage is unavailable.
    }

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
