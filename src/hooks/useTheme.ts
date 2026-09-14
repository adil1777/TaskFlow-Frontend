import { useCallback, useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../redux/hooks";

import { setTheme } from "../redux/slices/uiSlice";

import {
  themeStorage,
  type Theme,
} from "../services/themeStorage";

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state) => state.ui.theme
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    themeStorage.setTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme =
      theme === "light"
        ? "dark"
        : "light";

    dispatch(setTheme(nextTheme));
  }, [dispatch, theme]);

  return {
    theme,
    isDarkMode: theme === "dark",
    toggleTheme,
  };
};