import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { UIState } from "../../utils/types/auth";

const initialState: UIState = {
  sidebarOpen: true,
  theme: "light",
  globalLoading: false,
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

    toggleTheme: (state) => {
      state.theme =
        state.theme === "light"
          ? "dark"
          : "light";
    },

    setTheme: (
      state,
      action: PayloadAction<"light" | "dark">
    ) => {
      state.theme = action.payload;
    },

    setGlobalLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.globalLoading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;