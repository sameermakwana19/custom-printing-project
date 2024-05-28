import logo from "../../../assets/print-1-logo.svg";

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} className="navbar__logo" alt="Logo Image" />
    </div>
  );
};

export default Logo;
