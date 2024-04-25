import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "../pages/NotFound/NotFound";

const RootLayout = () => {
  return (
    <div className="custom-printing">
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
    </div>
  );
};

export default RootLayout;
