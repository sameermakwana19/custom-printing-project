import React, { useContext, useId, useState } from "react";
import Heading from "../../components/ui/Heading/Heading";
import Button from "../../components/ui/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input/Input";
import { UserContext } from "../../context/User/UserContext";
import { saveUserToLocalStorage, signInUser } from "../../queries/auth";
import Backdrop from "../../components/Backdrop/Backdrop";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Login = () => {
  const id = useId();
  const {
    register,
    handleSubmit: handleSubmitHook,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await signInUser(email, password);

    setLoading(false);
    if (!user) {
      setError(error);
      return;
    }

    setEmail("");
    setPassword("");
    setError("");
    setUser(user);
    saveUserToLocalStorage(user);
    navigate("/");
  };

  return (
    <>
      {loading && <Backdrop message="Logging in" />}
      <div className="login-container">
        <div className="login">
          <Heading>Login</Heading>
          {error && (
            <Heading variant={"h1"} className="error">
              {error}
            </Heading>
          )}
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <Input
                label="Username or email address"
                id={`${id}-text`}
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                // {...register("email", { required: "Email is required" })}
              />
              <Input
                label="Password"
                id={`${id}-password`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
              {/* <Input
                label={"remember me"}
                id={`${id}-remember-me`}
                type="checkbox"
                isMandatory={false}
              /> */}
              <Button isIconPresent={false}> Log In</Button>
            </form>

            <Link to="/signup" className="lost-your-password">
              Don't have an account?
            </Link>
          </div>
        </div>
        <DevTool control={control} />
      </div>
    </>
  );
};

export default Login;
