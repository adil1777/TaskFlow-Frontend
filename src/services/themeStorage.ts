export type Theme = "light" | "dark";

const THEME_KEY = "taskflow_theme";

export const themeStorage = {
  getTheme(): Theme {
    const theme = localStorage.getItem(THEME_KEY);

    return theme === "dark" ? "dark" : "light";
  },

  setTheme(theme: Theme) {
    localStorage.setItem(THEME_KEY, theme);
  },
};