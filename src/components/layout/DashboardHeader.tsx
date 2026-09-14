import {
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

import { useTheme } from "../../hooks/useTheme";

import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";

import { toggleSidebar } from "../../redux/slices/uiSlice";

import type { OrgRole } from "../../utils/types/role";

interface DashboardHeaderProps {
  userName?: string | null;
  role?: OrgRole | null;
}

const DashboardHeader = ({
  userName,
  role,
}: DashboardHeaderProps) => {
  const dispatch = useAppDispatch();

  const {
    isDarkMode,
    toggleTheme,
  } = useTheme();

  const sidebarOpen = useAppSelector(
    (state) => state.ui.sidebarOpen
  );

  const displayName =
    userName?.trim() || "User";

  const displayRole =
    role?.replaceAll("_", " ") || "member";

  const userInitial =
    displayName.charAt(0).toUpperCase() || "U";

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      {/* Mobile Header */}
      <header
        className="
          fixed inset-x-0 top-0 z-40
          flex h-16 items-center justify-between
          border-b border-slate-200
          bg-white px-4
          dark:border-slate-800
          dark:bg-slate-900
          lg:hidden
        "
      >
        <button
          type="button"
          onClick={handleToggleSidebar}
          aria-label={
            sidebarOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={sidebarOpen}
          className="
            rounded-lg p-2
            text-slate-600
            transition
            hover:bg-slate-100
            hover:text-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          {sidebarOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        <h1
          className="
            text-lg font-bold
            text-slate-900
            dark:text-white
          "
        >
          TaskFlow
        </h1>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            isDarkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="
            rounded-lg p-2
            text-slate-600
            transition
            hover:bg-slate-100
            hover:text-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          {isDarkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </header>

      {/* Desktop Header */}
      <header
        className="
          hidden h-16
          items-center justify-between
          border-b border-slate-200
          bg-white px-8
          dark:border-slate-800
          dark:bg-slate-900
          lg:flex
        "
      >
        <div>
          <h2
            className="
              text-lg font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Workspace
          </h2>

          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            TaskFlow
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="
              rounded-lg p-2
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            {isDarkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <div className="text-right">
            <p
              className="
                text-sm font-medium
                text-slate-900
                dark:text-white
              "
            >
              {displayName}
            </p>

            <p
              className="
                text-xs capitalize
                text-slate-500
                dark:text-slate-400
              "
            >
              {displayRole}
            </p>
          </div>

          <div
            aria-label={`Logged in as ${displayName}`}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              bg-slate-900
              text-sm font-semibold text-white
              dark:bg-slate-700
            "
          >
            {userInitial}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;