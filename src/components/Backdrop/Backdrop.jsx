import PropTypes from "prop-types";

const Backdrop = ({ message = "Loading" }) => {
  return <div className="auth-backdrop">{message} ... </div>;
};

export default Backdrop;

Backdrop.propTypes = {
  message: PropTypes.string,
};
