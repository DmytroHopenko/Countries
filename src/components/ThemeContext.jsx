import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem('darkTheme');
  const [darkTheme, setDarkTheme] = useState(storedTheme ? JSON.parse(storedTheme) : false);
  const bodyClass = darkTheme ? 'darkThemeBody' : '';

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem('darkTheme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};