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
  ...delegated
}) => {
  if (!VARIANTS[variant]) {
    console.error(`Variant ${variant} is not supported`);
    variant = "default";
  }

  return (
    <button className={VARIANTS[variant]} {...delegated}>
      {children}
      {isIconPresent && rightIcon}
    </button>
  );
};

Button.propTypes = {
  variant: PropsTypes.oneOf(Object.keys(VARIANTS)),
  children: PropsTypes.node.isRequired,
};

export default Button;
