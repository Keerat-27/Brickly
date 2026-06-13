import { useCallback, useEffect, useState } from "react";

export const THEME_STORAGE_KEY = "brickly-theme";

const readStoredDarkMode = (): boolean => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
};

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(readStoredDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
    } catch {
      // ignore quota / private browsing errors
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return { darkMode, setDarkMode, toggleDarkMode };
};
