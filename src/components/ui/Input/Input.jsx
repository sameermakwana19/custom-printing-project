import React from "react";

const Input = ({ label, id, type = "text", ...delegated }) => {
  return (
    <div
      className={`${type === "checkbox" ? "checkbox-input-grp" : "input-grp"}`}
    >
      <label htmlFor={id}>
        {label} <span className="asterisk">*</span>
      </label>
      <input type={type} name="" id={id} {...delegated} />
    </div>
  );
};

export default Input;
