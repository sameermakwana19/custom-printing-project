import React, { forwardRef } from "react";

const Input = (
  { label, id, type = "text", isMandatory = false, ...delegated },
  ref
) => {
  return (
    <div
      className={`${type === "checkbox" ? "checkbox-input-grp" : "input-grp"}`}
    >
      {label && (
        <label htmlFor={id}>
          {label} {isMandatory && <span className="asterisk">*</span>}
        </label>
      )}
      <input ref={ref} type={type} name="" id={id} {...delegated} />
    </div>
  );
};

export default forwardRef(Input);
