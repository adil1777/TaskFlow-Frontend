import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Organizations from "../pages/organizations/Organizations";
import OrganizationWorkspace from "../pages/organizations/OrganizationWorkspace";
import OrganizationMembers from "../pages/organizations/OrganizationMembers";

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
        <Route path="/organizations" element={<div>Organizations</div>} />
      </Route>

      <Route path="/" element={<Navigate to="/organizations" replace />} />

      <Route path="/organizations" element={<Organizations />} />

      <Route
        path="/organizations/:organizationId"
        element={<OrganizationWorkspace />}
      />

      <Route
        path="/organizations/:organizationId/members"
        element={<OrganizationMembers />}
      />

      <Route path="*" element={<div className="p-10">Page not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
