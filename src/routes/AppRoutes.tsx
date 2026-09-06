import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
