import React from "react";

const IconList = ({ label = "label", icon }) => {
  return (
    <div className="icon-list-item">
      <div className="icon-container">
        {icon ? icon : <i className="fab fa-gratipay"></i>}
      </div>
      <p className="label">{label}</p>
    </div>
  );
};

export default IconList;
