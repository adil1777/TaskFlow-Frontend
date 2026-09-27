export const APP_NAME = "TaskFlow";

export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ??
    // "https://taskflow-backend-nqwe.onrender.com/api/v1",
    "http://localhost:5000/api/v1",

  TIMEOUT: 15_000,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "taskflow_access_token",
  REFRESH_TOKEN: "taskflow_refresh_token",
  USER: "taskflow_user",
  ORGANIZATION: "taskflow_organization",
  THEME: "taskflow_theme",
} as const;
