import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Theme } from "../../services/themeStorage";

interface UIState {
  sidebarOpen: boolean;
  theme: Theme;
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setSidebarOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.sidebarOpen = action.payload;
    },

    setTheme: (
      state,
      action: PayloadAction<Theme>
    ) => {
      state.theme = action.payload;
    },

    toggleTheme: (state) => {
      state.theme =
        state.theme === "light"
          ? "dark"
          : "light";
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;