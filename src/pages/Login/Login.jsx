import React, { useId } from "react";
import Heading from "../../components/ui/Heading/Heading";
import Button from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input/Input";

const Login = () => {
  const id = useId();

  return (
    <div className="login">
      <Heading>Login</Heading>
      <div className="form-container">
        <form action="#">
          <Input label="Username or email address" id={`${id}-text`} />
          <Input label="Password" id={`${id}-password`} type="password" />
          <Input
            label={"remember me"}
            id={`${id}-remember-me`}
            type="checkbox"
          />
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
