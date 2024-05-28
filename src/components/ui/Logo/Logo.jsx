import { Link } from "react-router-dom";
import logo from "../../../assets/print-1-logo.svg";

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to="/">
        <img src={logo} className="navbar__logo" alt="Logo Image" />
      </Link>
    </div>
  );
};

export default Logo;
