import { Outlet, useNavigate } from "react-router-dom";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceSidebar from "./WorkspaceSidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../features/auth/auth.selectors";
import { selectCurrentOrganizationRole } from "../../hooks/organization/organization.selectors";
import { useLogout } from "../../hooks/auth/useLogout";
import { setSidebarOpen } from "../../redux/slices/uiSlice";

const WorkspaceLayout = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);

  const role = useAppSelector(selectCurrentOrganizationRole);

  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  const logout = useLogout();

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  const closeMobileSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <WorkspaceHeader user={user} role={role} onLogout={handleLogout} />

      <WorkspaceSidebar
        role={role}
        open={sidebarOpen}
        onClose={closeMobileSidebar}
      />

      <main
        className={[
          "min-h-screen pt-16",
          "sm:pt-16",
          "lg:ml-64",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20",
        ].join(" ")}
      >
        <div className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
