export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

export const themeStorage = {
  getTheme(): Theme {
    const storedTheme = localStorage.getItem(
      THEME_STORAGE_KEY
    );

    return storedTheme === "dark"
      ? "dark"
      : "light";
  },

  setTheme(theme: Theme): void {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      theme
    );
  },

  clearTheme(): void {
    localStorage.removeItem(
      THEME_STORAGE_KEY
    );
  },
};