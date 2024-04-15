import React from "react";

const HamburgerIcon = ({
  isHamburgerMenuExpanded,
  toggleIsHamburgerMenuExpanded,
}) => {
  // alert(isHamburgerMenuExpanded);
  return (
    <div
      className="hamburger-icon"
      onClick={() => toggleIsHamburgerMenuExpanded()}
    >
      {!isHamburgerMenuExpanded ? (
        <i className="fa-solid fa-bars"></i>
      ) : (
        <i className="fa-solid fa-xmark"></i>
      )}
    </div>
  );
};

export default HamburgerIcon;
