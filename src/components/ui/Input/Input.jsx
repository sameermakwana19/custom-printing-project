import { forwardRef } from "react";
import PropTypes from "prop-types";

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

const exportInput = forwardRef(Input);

export default exportInput;

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email", "checkbox", "textarea"]),
  isMandatory: PropTypes.bool,
};
