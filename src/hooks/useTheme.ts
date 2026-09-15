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

    console.log("THEME:", theme);
    console.log(
      "HTML:",
      root.className
    );
    console.log(
      "STORAGE:",
      themeStorage.getTheme()
    );
  }, [theme]);

  return {
    theme,
    isDarkMode: theme === "dark",

    toggleTheme: () => {
      dispatch(toggleThemeAction());
    },
  };
};