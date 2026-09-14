import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";
import { useAuth } from "../hooks/useAuth";

import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const role = useAppSelector(
    (state) => state.organization.role
  );

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >
      <DashboardHeader
        userName={user?.name}
        role={role}
      />

      <Sidebar
        role={role}
        onLogout={handleLogout}
      />

      <div className="lg:pl-64">
        <main className="pt-16 lg:pt-0">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;