import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../redux/hooks";

import {
  toggleTheme as toggleThemeAction,
} from "../redux/slices/uiSlice";

import { themeStorage } from "../services/themeStorage";

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state) => state.ui.theme
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle(
      "dark",
      theme === "dark"
    );

    themeStorage.setTheme(theme);

  }, [theme]);

  return {
    theme,
    isDarkMode: theme === "dark",

    toggleTheme: () => {
      dispatch(toggleThemeAction());
    },
  };
};