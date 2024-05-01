import React, { useContext, useEffect, useState } from "react";
import Logo from "../ui/Logo/Logo";
import { NavLink } from "react-router-dom";
import HamburgerIcon from "../ui/HamburgerIcon/HamburgerIcon";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import CartSideModal from "../../pages/Cart/CartSideModal/CartSideModal";

import { twoDigitAfterDecimal } from "../../utlis/helper";
import { useQuery } from "@tanstack/react-query";
import { getCartTotalAndNoOfItems } from "../../queries/CartQueries";
import { TotalAmountContext } from "../../context/TotalAmount/TotalAmountProvider";
import { UserContext, useUserContext } from "../../context/User/UserContext";

// import { getCartTotalAndNoOfItems } from "../../queries/CartQueries";

// const BACKGROUND_WHITE_NOT_IN = ["home", "about", "contact"];

const Navbar = () => {
  // const { total } = useContext(TotalAmountContext);
  const { user } = useContext(UserContext);

  const [isHamburgerMenuExpanded, setIsHamburgerMenuExpanded] = useState(false);

  const [mobileAccountDropdown, setMobileAccountDropdown] = useState(false);

  const pathname = useCurrentLocation() || "home";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (pathname === "cart") {
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

  return (
    <>
      {/* <div className="navbar" style={{ background: "white" }}> */}
      <div className="navbar">
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
              {user ? (
                <li className="accounts-dropdown">
                  <div className="accounts-dropdown-header navbar__link">
                    Account <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="accounts-dropdown-body">
                    <NavLink to="/myaccount" className="navbar__link">
                      My Account
                    </NavLink>
                    <NavLink to="/cart" className="navbar__link">
                      Cart
                    </NavLink>
                  </div>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" className="navbar__link">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
            <div
              to="/"
              className={"navbar__link"}
              onClick={() => {
                toggleModal();
              }}
            >
              {user && <CartIcon />}
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

            {user ? (
              <li className="accounts-dropdown">
                <div
                  className="accounts-dropdown-header navbar__link"
                  onClick={() => setMobileAccountDropdown((prev) => !prev)}
                >
                  <span>Account</span>{" "}
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                <div
                  className={`${
                    mobileAccountDropdown
                      ? "accounts-dropdown-body--expanded"
                      : "accounts-dropdown-body"
                  }`}
                >
                  <div>
                    <NavLink to="/myaccount" className="navbar__link">
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
            ) : (
              <li>
                <NavLink to="/login" className="navbar__link">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      {user && (
        <CartSideModal toggleModal={toggleModal} isModalOpen={isModalOpen} />
      )}
    </>
  );
};

export default Navbar;

function CartIcon() {
  const {
    user: { uid },
  } = useUserContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", "details"],
    queryFn: () => getCartTotalAndNoOfItems(uid),
  });

  const { total } = useContext(TotalAmountContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  const { noOfItems } = data;

  return (
    <div className={"cart-icon-container"}>
      <p className={"cart-total"}>
        {/* ${twoDigitAfterDecimal(data.total)} */} $
        {twoDigitAfterDecimal(total)}
      </p>
      <span className={"cart-icon"}>
        <i className="fa-solid fa-cart-shopping"></i>
        <p className={"cart-item-count"}>{noOfItems}</p>
      </span>
    </div>
  );
}
