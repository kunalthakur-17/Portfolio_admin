import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../contexts/ThemeContext";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();

  return (
    <div className={`d-flex ${theme.isDark ? "dark" : ""}`}>
      <Sidebar collapsed={collapsed} />
      <div className="flex-grow-1">
        <Header 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
        />
        <div className={`${theme.colors.surfaceSecondary} transition-colors duration-300`}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
