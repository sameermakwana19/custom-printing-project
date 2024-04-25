import React from "react";
import { useThemeContext } from "../../../context/ThemeContext/ThemeContextProvider";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <div className="dark-mode-toggle" onClick={() => toggleDarkMode()}>
      {isDarkMode ? (
        <i class="fa-solid fa-sun"></i>
      ) : (
        <i class="fa-solid fa-moon"></i>
      )}
    </div>
  );
};

export default DarkModeToggle;
