import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    return {
      isDarkMode,
      toggleDarkMode,
    };
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
