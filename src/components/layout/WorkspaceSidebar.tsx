import { NavLink } from "react-router-dom";

import { X } from "lucide-react";

import { getWorkspaceNavigation } from "./workspaceNavigation";
import type { OrgRole } from "../utils/types/role";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentOrganizationId } from "../hooks/organization/organization.selectors";
import { setSidebarOpen } from "../redux/slices/uiSlice";

interface WorkspaceSidebarProps {
  role: OrgRole | null;
  open: boolean;
  onClose: () => void;
}

const WorkspaceSidebar = ({ role, open, onClose }: WorkspaceSidebarProps) => {
  const dispatch = useAppDispatch();

  const organizationId = useAppSelector(selectCurrentOrganizationId);

  const navigation = getWorkspaceNavigation(role);

  if (!organizationId) {
    return null;
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen",
          "w-64 border-r border-slate-200 bg-white",
          "pt-16 transition-transform duration-200",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b border-slate-100 px-4 lg:hidden">
            <span className="text-sm font-semibold text-slate-800">
              Navigation
            </span>

            <button
              type="button"
              onClick={() => dispatch(setSidebarOpen(false))}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {navigation.map((item) => {
              const Icon = item.icon;

              const path = item.getPath(organizationId);

              return (
                <NavLink
                  key={item.label}
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2.5",
                      "text-sm font-medium transition",
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <p className="text-xs leading-5 text-slate-400">
              TaskFlow workspace
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default WorkspaceSidebar;
