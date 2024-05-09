import PropTypes from "prop-types";

const IconList = ({ label = "label", icon }) => {
  return (
    <div className="icon-list-item">
      <div className="icon-container">
        {icon || <i className="fab fa-gratipay"></i>}
      </div>
      <p className="label">{label}</p>
    </div>
  );
};

export default IconList;

IconList.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
};
