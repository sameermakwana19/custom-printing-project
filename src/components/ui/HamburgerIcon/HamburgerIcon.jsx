import PropTypes from "prop-types";

const HamburgerIcon = ({
  isHamburgerMenuExpanded,
  toggleIsHamburgerMenuExpanded,
}) => {
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

HamburgerIcon.propTypes = {
  isHamburgerMenuExpanded: PropTypes.bool,
  toggleIsHamburgerMenuExpanded: PropTypes.func,
};
