import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

import { useAuth } from "../hooks/useAuth";
import { useSidebar } from "../hooks/useSidebar";

import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const {
    isOpen: sidebarOpen,
    toggleSidebar,
    closeSidebar,
  } = useSidebar();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const role = useAppSelector(
    (state) => state.organization.role
  );

  const handleLogout = () => {
    logout();
    closeSidebar();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader
        userName={user?.name}
        role={role}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      <Sidebar
        open={sidebarOpen}
        role={role}
        onClose={closeSidebar}
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