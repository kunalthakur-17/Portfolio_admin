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
import BlogDetail from "./pages/protectedPage/Blog/BlogDetail/BlogDetail";
import Work from "./pages/protectedPage/Work/Work";
import WorkDetail from "./pages/protectedPage/Work/WorkDetail/WorkDetail";

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
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
         
           <Route
            path="dashBoard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>

          <Route
            path="work"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Work />} />
            <Route path=":id" element={<WorkDetail />} />
          </Route>
           <Route
            path="blog"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Blog />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
