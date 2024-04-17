import React from "react";

const Input = ({
  label,
  id,
  type = "text",
  isMandatory = true,
  ...delegated
}) => {
  return (
    <div
      className={`${type === "checkbox" ? "checkbox-input-grp" : "input-grp"}`}
    >
      {label && (
        <label htmlFor={id}>
          {label} {isMandatory && <span className="asterisk">*</span>}
        </label>
      )}
      <input type={type} name="" id={id} {...delegated} />
    </div>
  );
};

export default Input;
