import React, { useEffect, useState } from "react";
import Logo from "../ui/Logo/Logo";
import { NavLink } from "react-router-dom";
import HamburgerIcon from "../ui/HamburgerIcon/HamburgerIcon";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import CartSideModal from "../../pages/Cart/CartSideModal/CartSideModal";

// const BACKGROUND_WHITE_NOT_IN = ["home", "about", "contact"];

const Navbar = () => {
  const [isHamburgerMenuExpanded, setIsHamburgerMenuExpanded] = useState(false);

  const pathname = useCurrentLocation() || "home";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (pathname === "cart") {
      // setIsModalOpen(false);
      return;
    }

    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsHamburgerMenuExpanded(false);

    return () => {};
  }, [pathname]);

  function toggleIsHamburgerMenuExpanded() {
    setIsHamburgerMenuExpanded((prev) => !prev);
  }

  // const style =
  //   BACKGROUND_WHITE_NOT_IN.indexOf(pathname) !== -1
  //     ? { background: "none" }
  //     : { background: "white" };

  // console.log({ style }, { pathname });

  return (
    <>
      <div className="navbar" style={{ background: "white" }}>
        <div className="navbar__header">
          <div className="logo-container">
            <Logo />
          </div>
          <div id="desktop-navbar" className="navbar__header__content">
            <ul className="navbar__links">
              <li>
                <NavLink to="/" className="navbar__link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/allproducts" className="navbar__link">
                  ALl products
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="navbar__link">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="navbar__link">
                  Contact
                </NavLink>
              </li>
              <li className="accounts-dropdown">
                <div className="accounts-dropdown-header navbar__link">
                  Accounts <i className="fa-solid fa-chevron-down"></i>
                </div>
                <div className="accounts-dropdown-body">
                  <NavLink to="/login" className="navbar__link">
                    My Account
                  </NavLink>
                  <NavLink to="/cart" className="navbar__link">
                    Cart
                  </NavLink>
                </div>
              </li>
            </ul>
            <div
              to="/"
              className={"navbar__link"}
              onClick={() => {
                toggleModal();
              }}
            >
              <div className={"cart-icon-container"}>
                <p className={"cart-total"}>$0.00</p>
                <span className={"cart-icon"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p className={"cart-item-count"}>2</p>
                </span>
              </div>
            </div>

            <div className="mobile-hamburger-icon-container">
              <HamburgerIcon
                isHamburgerMenuExpanded={isHamburgerMenuExpanded}
                toggleIsHamburgerMenuExpanded={toggleIsHamburgerMenuExpanded}
              />
            </div>
          </div>
        </div>

        <div
          className={`mobile-hamburger-menu ${
            isHamburgerMenuExpanded ? "navbar__body--active" : "navbar__body"
          }`}
        >
          <ul className="navbar__links">
            <li>
              <NavLink to="/" className="navbar__link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allproducts" className="navbar__link">
                ALl products
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navbar__link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="navbar__link">
                Contact
              </NavLink>
            </li>
            <li className="account-dropdown">
              <div className="accounts-dropdown-header navbar__link">
                Accounts <i className="fa-solid fa-chevron-down"></i>
              </div>
              <div className="accounts-dropdown-body">
                <div>
                  <NavLink to="/login" className="navbar__link">
                    <i className="fa-solid fa-chevron-right"></i>My Account
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/cart" className="navbar__link">
                    <i className="fa-solid fa-chevron-right"></i>Cart
                  </NavLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <CartSideModal toggleModal={toggleModal} isModalOpen={isModalOpen} />
    </>
  );
};

export default Navbar;
