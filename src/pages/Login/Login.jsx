import React, { useId } from "react";
import Heading from "../../components/ui/Heading/Heading";
import Button from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const id = useId();

  return (
    <div className="login">
      <Heading>Login</Heading>
      <div className="form-container">
        <form action="#">
          <div className="input-grp">
            <label htmlFor={`${id}-text`}>
              Username or email address <span className="asterisk">*</span>
            </label>
            <input type="text" name="" id={`${id}-text`} />
          </div>
          <div className="input-grp">
            <label htmlFor={`${id}-password`}>
              Password <span className="asterisk">*</span>
            </label>
            <input type="password" name="" id={`${id}-password`} />
          </div>
          <div className="checkbox-input-grp">
            <input type="checkbox" name="" id={`${id}-remember-me`} />
            <label htmlFor={`${id}-remember-me`}>Remember</label>
          </div>
          <Button isIconPresent={false}> Log In</Button>
        </form>
        <Link to="#" className="lost-your-password">
          Lost your Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
