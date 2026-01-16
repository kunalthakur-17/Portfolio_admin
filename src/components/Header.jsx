import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/auth/action";
import { useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdWork } from "react-icons/md";
import { BsFileText } from "react-icons/bs";
import { HiMenuAlt2 } from "react-icons/hi";
import { Moon, Sun, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import "./Header.css";

const Header = ({ collapsed, setCollapsed, isDarkMode, toggleDarkMode }) => {
  const user = useSelector((state) => state.loginReducer?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Listen for notifications via custom event from useSocketAuth
  useEffect(() => {
    const handleNotification = (event) => {
      const data = event.detail;

      setNotifications((prev) => {

        // Check if this notification already exists to prevent duplicates
        const isDuplicate = prev.some(notif =>
          notif.title === data.title &&
          notif.message === data.message &&
          Math.abs(new Date(notif.timestamp) - new Date()) < 5000 // Within 5 seconds
        );

        if (isDuplicate) {
          return prev;
        }

        const newNotification = {
          ...data,
          timestamp: new Date(),
          read: false,
        };

        const updated = [newNotification, ...prev];
        return updated;
      });

      setUnreadCount((prev) => {
        const newCount = prev + 1;
        return newCount;
      });

      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
          icon: "/vite.svg",
        });
      }
    };

    window.addEventListener('socketNotification', handleNotification);

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      window.removeEventListener('socketNotification', handleNotification);
    };
  }, []); // Empty dependency array

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const { pathname } = useLocation();

  const getPageTitle = (path) => {
    const pathMappings = {
      "/dashBoard": {
        title: "Dashboard",
        icon: <LuLayoutDashboard />,
      },
      "/work": { 
        title: "Work", 
        icon: <MdWork /> 
      },
      "/blog": {
        title: "Blog",
        icon: <BsFileText />,
      },
    };

    return pathMappings[path] || "Dashboard";
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <motion.nav 
      className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm transition-colors duration-300`}
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu toggle and page title */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}
              onClick={() => setCollapsed(!collapsed)}
            >
              <HiMenuAlt2 size={24} />
            </button>

            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg`}>
                <Code2 size={22} className="text-white" />
              </div>
              <div>
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <span className="text-blue-600">{pageTitle?.icon}</span>
                  <span className="font-bold text-lg">{pageTitle?.title}</span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Portfolio Admin</span>
              </div>
            </div>
          </div>

          {/* Right side - Dark mode toggle, notifications, and user menu */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notification Bell */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="white"
                className={`position-relative border-0 shadow-none p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}
                style={{ background: "transparent" }}
              >
                <i className="bi bi-bell fs-5"></i>
                {unreadCount > 0 && (
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      background: "#e25c6f",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      fontSize: "10px",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className={`notification-dropdown ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{
                  minWidth: "360px",
                  maxHeight: "460px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  padding: 0,
                }}
              >
                {/* Header */}
                <div
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    padding: "14px 16px",
                    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#f0f0f0'}`,
                    borderRadius: "12px 12px 0 0",
                  }}
                  className={`d-flex justify-content-between align-items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <strong className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: "15px" }}>
                    Notifications
                  </strong>

                  {unreadCount > 0 && (
                    <span
                      style={{
                        background: "#e25c6f",
                        color: "#fff",
                        padding: "1px 7px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>

                {/* Notification List */}
                <div style={{ maxHeight: "330px", overflowY: "auto" }}>
                  {notifications.length === 0 ? (
                    <div className={`text-center py-5 ${isDarkMode ? 'text-gray-400' : 'text-muted'}`}>
                      <i
                        className="bi bi-bell-slash"
                        style={{ fontSize: "32px", opacity: 0.4 }}
                      />
                      <div style={{ marginTop: "8px", fontSize: "14px" }}>
                        No notifications
                      </div>
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notif, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((n, i) =>
                              i === index ? { ...n, read: true } : n
                            )
                          );
                          setUnreadCount((prev) => Math.max(0, prev - 1));
                        }}
                        style={{
                          padding: "14px 16px",
                          background: notif.read ? (isDarkMode ? '#1f2937' : '#fff') : (isDarkMode ? '#1e3a8a' : '#f5f9ff'),
                          borderBottom: `1px solid ${isDarkMode ? '#374151' : '#f1f1f1'}`,
                          transition: "all 0.2s ease",
                        }}
                        className="notification-item"
                      >
                        <div className="d-flex gap-3">
                          {/* Indicator */}
                          {!notif.read && (
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                background: "#e25c6f",
                                borderRadius: "50%",
                                marginTop: 6,
                                flexShrink: 0,
                              }}
                            />
                          )}

                          <div className="flex-grow-1">
                            <div className={`mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                              style={{
                                fontSize: "13px",
                                fontWeight: 600,
                              }}
                            >
                              {notif.title}
                            </div>

                            <div  className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                              style={{
                                fontSize: "12px",
                                marginTop: "2px",
                                lineHeight: 1.4,
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {notif.message}
                            </div>

                            <div
                              className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                              style={{
                                fontSize: "11px",
                                marginTop: "4px",
                              }}
                            >
                              {new Date(notif.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <>
                    <Dropdown.Divider style={{ margin: 0 }} />
                    <Dropdown.Item
                      className="text-center"
                      style={{
                        padding: "12px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#e25c6f",
                        background: isDarkMode ? '#1f2937' : '#fff',
                      }}
                      onClick={() => {
                        setNotifications([]);
                        setUnreadCount(0);
                      }}
                    >
                      Clear all notifications
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* User Info + Avatar + Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="white"
                className={`d-flex align-items-center border-0 shadow-none p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}
                style={{ background: "transparent" }}
              >
                <div className="text-end me-2">
                  <div className={`fw-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: "16px" }}>
                    {user?.displayName ||
                      user?.name ||
                      user?.username ||
                      user?.firstName ||
                      "Admin"}
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontSize: "14px" }}>
                    Administrator
                  </div>
                </div>

                {/* Avatar */}
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="rounded-circle"
                  width="40"
                  height="40"
                />

                <i className={`bi bi-chevron-down ms-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}></i>
              </Dropdown.Toggle>

              <Dropdown.Menu className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                <Dropdown.Divider className="red-dropdown-divider" />

                <Dropdown.Item
                  onClick={handleLogout}
                  className={`red-dropdown-item logout-item ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'}`}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
