import { Menu, Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { User } from "../../utils/types/auth";
import type { OrgRole } from "../../utils/types/role";
import { toggleSidebar, toggleTheme } from "../../redux/slices/uiSlice";
import OrganizationSwitcher from "../../pages/organizations/OrganizationSwitcher";
interface WorkspaceHeaderProps {
  user: User | null;
  role: OrgRole | null;
  onLogout: () => void;
}

const WorkspaceHeader = ({ user, role, onLogout }: WorkspaceHeaderProps) => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleSidebar())}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              T
            </div>

            <span className="hidden text-lg font-bold text-slate-900 sm:block">
              TaskFlow
            </span>
          </div>

          <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 lg:px-6">
              {/* top row */}
            </div>

            <div className="border-t border-slate-100 px-4 py-2 sm:hidden">
              <OrganizationSwitcher />
            </div>
          </header>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name ?? "User"}
            </p>

            <p className="text-xs text-slate-500">
              {role === "org_admin" ? "Organization Admin" : "Member"}
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
