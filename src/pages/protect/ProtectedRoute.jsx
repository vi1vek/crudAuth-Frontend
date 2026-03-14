import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = true;
  return user ? <Outlet /> : <Navigate to="/login" />;
};
