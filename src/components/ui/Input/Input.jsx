import React, { forwardRef } from "react";

const Input = (
  { label, id, type = "text", isMandatory = false, ...delegated },
  ref
) => {
  const Tag = type === "textarea" ? "textarea" : "input";
  return (
    <div
      className={`${type === "checkbox" ? "checkbox-input-grp" : "input-grp"}`}
    >
      {label && (
        <label htmlFor={id}>
          {label} {isMandatory && <span className="asterisk">*</span>}
        </label>
      )}
      <Tag ref={ref} type={type} name="" id={id} {...delegated} />
    </div>
  );
};

export default forwardRef(Input);
