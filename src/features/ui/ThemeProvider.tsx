import {
  useEffect,
  type ReactNode,
} from "react";

import {
  useAppSelector,
} from "../../redux/hooks";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  const theme =
    useAppSelector(
      (state) => state.ui.theme
    );

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.toggle(
      "dark",
      theme === "dark"
    );

    root.style.colorScheme =
      theme;
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;