import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "../pages/NotFound/NotFound";
import { useThemeContext } from "../context/ThemeContext/ThemeContextProvider";
import DarkModeToggle from "../components/ui/DarkModeToggle/DarkModeToggle";

const RootLayout = () => {
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--background-color", isDarkMode ? "black" : "white");
    rootStyle.setProperty("--color-primary", isDarkMode ? "#fff" : "#415161");
    rootStyle.setProperty(
      "--color-secondary",
      isDarkMode ? "#f4f4f4" : "#415161"
    );

    rootStyle.setProperty(
      "--background-secondary-color",
      isDarkMode ? "#333" : "#415161"
    );
    rootStyle.setProperty("--color-tertiary", "#ff5151");
    rootStyle.setProperty("--button-color", "#ff5151");
    rootStyle.setProperty(
      "--footer-background-color",
      isDarkMode ? "gray" : "#415161"
    );
    rootStyle.setProperty("--border-color", isDarkMode ? "gray" : "#dddddd");

    // console.log(document.documentElement.style);
  }, [isDarkMode]);

  return (
    <div
      className="custom-printing"
      id={isDarkMode ? "dark-mode" : "light-mode"}
    >
      <header>
        <Navbar />
      </header>
      <main>
        <ErrorBoundary FallbackComponent={NotFound}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer>
        <Footer />
      </footer>
      <DarkModeToggle />
    </div>
  );
};

export default RootLayout;
