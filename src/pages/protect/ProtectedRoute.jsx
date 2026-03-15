import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export const ProtectedRoute = () => {
  const { isLogout,setIslogout } = useContext(AuthContext);
  const user = true;
  return isLogout ? <Outlet /> : <Navigate to="/login" />;
};
