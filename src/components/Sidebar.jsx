import React, { useMemo, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import logoImage from "../assets/images/app_logo.png";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdWork } from "react-icons/md";
import { BsFileText } from "react-icons/bs";

const Sidebar = ({ collapsed, isDarkMode }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: "/dashBoard",
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
    },
    { 
      path: "/work", 
      icon: <MdWork />, 
      label: "Work" 
    },
    {
      path: "/blog",
      icon: <BsFileText />,
      label: "Blog",
    },
  ];

  const sidebarVariants = {
    expanded: { width: "220px" },
    collapsed: { width: "80px" }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`d-flex flex-column text-white sidebar-sticky ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-700' 
          : 'bg-gradient-to-b from-blue-600 to-blue-700 border-r border-blue-500'
      }`}
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
        boxShadow: isDarkMode ? '2px 0 10px rgba(0,0,0,0.3)' : '2px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* Logo & Brand */}
      <motion.div 
        className="p-4 text-center mb-3 border-b border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-10 h-10 bg-gradient-to-br ${
            isDarkMode ? 'from-blue-500 to-blue-600' : 'from-white to-gray-100'
          } rounded-lg flex items-center justify-center shadow-lg`}>
            <Code2 size={22} className={isDarkMode ? 'text-white' : 'text-blue-600'} />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-left"
            >
              <div className="font-bold text-sm text-white">Portfolio</div>
              <div className="text-xs text-white/70">Admin Panel</div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Menu */}
      <Nav className="flex-column px-3 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 * index }}
            >
              <Nav.Link
                as={Link}
                to={item.path}
                title={collapsed ? item.label : ""}
                className={`d-flex align-items-center mb-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? (isDarkMode 
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "bg-white text-blue-600 shadow-lg")
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={{
                  padding: "12px 16px",
                  textDecoration: "none",
                  border: "none",
                  transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                <motion.span
                  className="d-flex justify-content-center"
                  style={{ width: "24px", fontSize: "18px" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                </motion.span>

                {!collapsed && (
                  <motion.span
                    className="ms-3"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Segoe UI",
                      fontWeight: isActive ? 600 : 500,
                      whiteSpace: "nowrap",
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className={`ml-auto w-1 h-6 rounded-full ${
                      isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                    }`}
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Nav.Link>
            </motion.div>
          );
        })}
      </Nav>

      {/* Footer */}
      {!collapsed && (
        <motion.div 
          className="mt-auto p-4 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-xs text-white/60 mb-1">Portfolio Admin</div>
            <div className="text-xs text-white/40">v1.0.0</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
