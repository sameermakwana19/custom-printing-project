import PropsTypes from "prop-types";

const VARIANTS = {
  default: "btn",
  small: "btn-sm",
  large: "btn-lg",
  transparent: "btn-transparent",
};

const rightIcon = <i className="fa-solid fa-chevron-right"></i>;

const Button = ({
  variant = "default",
  isIconPresent = true,
  children,
  toolTip,
  ...delegated
}) => {
  if (!VARIANTS[variant]) {
    console.error(`Variant ${variant} is not supported`);
    variant = "default";
  }

  return (
    <>
      <button className={VARIANTS[variant]} {...delegated}>
        {children}
        {isIconPresent && rightIcon}
        {toolTip && <p className="tooltip">{toolTip}</p>}
      </button>
    </>
  );
};

Button.propTypes = {
  variant: PropsTypes.oneOf(Object.keys(VARIANTS)),
  isIconPresent: PropsTypes.bool,
  toolTip: PropsTypes.string,
  children: PropsTypes.node.isRequired,
};

export default Button;
