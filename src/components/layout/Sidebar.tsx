import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";

import { setSidebarOpen } from "../../redux/slices/uiSlice";

import type { OrgRole } from "../../utils/types/role";
import { ORG_ROLES } from "../../utils/types/role";

interface SidebarProps {
  role?: OrgRole | null;
  onLogout: () => void;
}

const Sidebar = ({
  role,
  onLogout,
}: SidebarProps) => {
  const dispatch = useAppDispatch();

  const sidebarOpen = useAppSelector(
    (state) => state.ui.sidebarOpen
  );

  const isOrgAdmin =
    role === ORG_ROLES.ORG_ADMIN;

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    ...(isOrgAdmin
      ? [
          {
            name: "Members",
            path: "/members",
            icon: Users,
          },
        ]
      : []),
  ];

  const closeSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeSidebar}
          className="
            fixed inset-0 z-40
            bg-black/30
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen w-64",
          "border-r border-slate-200 bg-white",
          "dark:border-slate-800 dark:bg-slate-900",
          "transform transition-transform duration-200",
          "lg:translate-x-0",
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div
          className="
            flex h-16 items-center
            border-b border-slate-200
            px-6
            dark:border-slate-800
          "
        >
          <h1
            className="
              text-xl font-bold
              text-slate-900
              dark:text-white
            "
          >
            TaskFlow
          </h1>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Workspace navigation"
          className="p-4"
        >
          <p
            className="
              mb-3 px-3
              text-xs font-semibold
              uppercase tracking-wider
              text-slate-400
            "
          >
            Workspace
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2.5",
                      "text-sm font-medium transition",
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div
          className="
            absolute inset-x-0 bottom-0
            border-t border-slate-200
            p-4
            dark:border-slate-800
          "
        >
          <button
            type="button"
            onClick={onLogout}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-2.5
              text-sm font-medium
              text-red-600
              transition
              hover:bg-red-50
              dark:text-red-400
              dark:hover:bg-red-950/30
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;