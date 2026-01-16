import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setIsAuthenticated(true);
      setUser(parsedUser);
    }
    
    // Listen for auth updates (from Redux)
    const handleAuthUpdate = () => {
      const newToken = localStorage.getItem("accessToken");
      const newUserData = localStorage.getItem("userData");
      
      if (newToken && newUserData) {
        const parsedUser = JSON.parse(newUserData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    window.addEventListener('storage', handleAuthUpdate);
    window.addEventListener('authUpdate', handleAuthUpdate);
    
    setLoading(false);
    
    return () => {
      window.removeEventListener('storage', handleAuthUpdate);
      window.removeEventListener('authUpdate', handleAuthUpdate);
    };
  }, []);

  const login = async (username, password, role) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // For company admin login
        if (role === 'company_admin') {
          const token = data.token;
          const userId = data.user?.id;
          
          const userData = { 
            username, 
            role, 
            id: userId
          };
          
          
          setIsAuthenticated(true);
          setUser(userData);
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          // For other roles (vendor, staff, client)
          const token = data.response?.accessToken || data.accessToken || data.token;
          const userId = data.response?.user?.id || data.response?.vendor?._id || data.response?.staff?._id || data.userId;
          
          const userData = { 
            username, 
            role, 
            id: userId,
            companyId: data.response?.user?.companyId || data.response?.vendor?.companyId || data.response?.staff?.companyId
          };
          
          
          setIsAuthenticated(true);
          setUser(userData);
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || "Login failed" };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Clear all auth-related data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    // Disconnect socket
    socketService.disconnect();
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
