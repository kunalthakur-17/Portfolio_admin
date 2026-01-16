import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  // Check if token exists
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      sessionStorage.clear();
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
