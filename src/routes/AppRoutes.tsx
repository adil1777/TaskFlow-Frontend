import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Organizations from "../pages/organizations/Organizations";
import OrganizationWorkspace from "../pages/organizations/OrganizationWorkspace";
import OrganizationMembers from "../pages/organizations/OrganizationMembers";
import OrganizationRoute from "./OrganizationRoute";
import WorkspaceLayout from "../components/layout/WorkspaceLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/organizations" element={<Organizations />} />

        <Route element={<OrganizationRoute />}>
          <Route
            path="/organizations/:organizationId"
            element={<WorkspaceLayout />}
          >
            <Route index element={<OrganizationWorkspace />} />

            <Route path="members" element={<OrganizationMembers />} />

            <Route path="projects" element={<div>Projects</div>} />

            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<div className="p-10">Page not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
