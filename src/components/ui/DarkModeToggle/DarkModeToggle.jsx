import { useThemeContext } from "../../../context/ThemeContext/ThemeContextProvider";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <div className="dark-mode-toggle" onClick={() => toggleDarkMode()}>
      {isDarkMode ? (
        <i className="fa-solid fa-sun"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </div>
  );
};

export default DarkModeToggle;
