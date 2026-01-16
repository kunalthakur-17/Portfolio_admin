import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/auth/Login/Login";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import Layout from "./components/Layout";
import Dashboard from "./pages/protectedPage/Dashbord/Dashbord";
import NotFound from "./pages/NotFound";
import Blog from "./pages/protectedPage/Blog/Blog";
import Work from "./pages/protectedPage/Work/Work";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    let cancelled = false;

    const tryScroll = (attempt = 0) => {
      if (cancelled) return;

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attempt >= 30) return;
      window.setTimeout(() => tryScroll(attempt + 1), 50);
    };

    tryScroll();

    return () => {
      cancelled = true;
    };
  }, [location.hash, location.pathname]);

  return null;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", newValue);
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newValue;
    });
  };

  return (
    <ThemeProvider>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
         
           <Route
            path="dashBoard"
            element={
              <ProtectedRoute>
                <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>

          <Route
            path="work"
            element={
              <ProtectedRoute>
                <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Work />} />
          </Route>
           <Route
            path="blog"
            element={
              <ProtectedRoute>
                <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Blog />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
