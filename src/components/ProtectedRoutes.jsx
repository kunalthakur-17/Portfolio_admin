import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("accessToken");
  const location = useLocation();

  // Check if token exists
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired
  try {
    const payload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      sessionStorage.clear();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    sessionStorage.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
