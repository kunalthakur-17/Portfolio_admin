import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ isDarkMode, toggleDarkMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`d-flex ${isDarkMode ? "dark" : ""}`}>
      <Sidebar collapsed={collapsed} isDarkMode={isDarkMode} />
      <div className="flex-grow-1">
        <Header 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
