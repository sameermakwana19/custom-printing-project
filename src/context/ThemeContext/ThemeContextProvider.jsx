import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const localData = JSON.parse(
      localStorage.getItem("custom-printing-isDarkMode")
    );
    return localData ?? true;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "custom-printing-isDarkMode",
      JSON.stringify(isDarkMode)
    );
  }, [isDarkMode]);

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
