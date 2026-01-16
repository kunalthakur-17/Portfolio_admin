import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? 'bg-gray-950' : 'bg-white',
      surface: isDark ? 'bg-gray-900' : 'bg-white',
      surfaceSecondary: isDark ? 'bg-gray-800' : 'bg-gray-50',
      text: isDark ? 'text-white' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      border: isDark ? 'border-gray-800' : 'border-gray-200',
      primary: isDark ? 'text-blue-400' : 'text-blue-600',
      primaryHover: isDark ? 'hover:text-blue-300' : 'hover:text-blue-700',
      accent: isDark ? 'bg-blue-600' : 'bg-blue-600',
      accentHover: isDark ? 'hover:bg-blue-700' : 'hover:bg-blue-700',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
