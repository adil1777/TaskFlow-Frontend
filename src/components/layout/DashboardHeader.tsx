import {
  Menu,
  X,
} from "lucide-react";

import type { OrgRole } from "../../utils/types/role";

interface DashboardHeaderProps {
  userName?: string | null;
  role?: OrgRole | null;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const DashboardHeader = ({
  userName,
  role,
  sidebarOpen,
  onToggleSidebar,
}: DashboardHeaderProps) => {
  const displayName =
    userName?.trim() || "User";

  const displayRole =
    role?.replaceAll("_", " ") || "member";

  const userInitial =
    displayName.charAt(0).toUpperCase();

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={
            sidebarOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={sidebarOpen}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          {sidebarOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        <h1 className="text-lg font-bold text-slate-900">
          TaskFlow
        </h1>

        <div
          aria-label={`Logged in as ${displayName}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white"
        >
          {userInitial || "U"}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden h-16 items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Workspace
          </h2>

          <p className="text-xs text-slate-500">
            TaskFlow
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">
              {displayName}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {displayRole}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {userInitial || "U"}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;