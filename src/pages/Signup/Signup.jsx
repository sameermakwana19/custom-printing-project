import React, { useContext, useId, useState } from "react";
import Heading from "../../components/ui/Heading/Heading";
import Button from "../../components/ui/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input/Input";
import { UserContext } from "../../context/User/UserContext";
import {
  createUserInFirestore,
  saveUserToLocalStorage,
  signInUser,
  signOutUser,
} from "../../queries/auth";
import Backdrop from "../../components/Backdrop/Backdrop";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

const Signup = () => {
  const id = useId();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [creatingUser, setCreatingUser] = useState(false);

  const { setUser } = useContext(UserContext);

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   setCreatingUser(true);

  //   const { user, error } = await createUserInFirestore(
  //     email,
  //     username,
  //     password
  //   );

  //   setCreatingUser(false);

  //   if (!user) {
  //     setError(error);
  //     return;
  //   }
  //   setEmail("");
  //   setPassword("");
  //   setError("");
  //   setUser(user);
  //   saveUserToLocalStorage(user);

  //   navigate("/myaccount");
  // };

  const signUpUser = async (data) => {
    setCreatingUser(true);

    const { user, error } = await createUserInFirestore(
      data.email,
      data.username,
      data.password
    );

    setCreatingUser(false);

    if (!user) {
      setError(error);
      return;
    }
    reset();
    setUser(user);
    saveUserToLocalStorage(user);
    navigate("/myaccount");
  };
  console.log({ errors });

  return (
    <>
      {creatingUser && <Backdrop message="Signing in " />}
      <div className="login-container">
        <div className="login">
          <Heading>Signup</Heading>
          {error && (
            <Heading variant={"h1"} className="error">
              {error}
            </Heading>
          )}
          <div className="form-container">
            <form onSubmit={handleSubmit(signUpUser)}>
              <Input
                label="email address"
                id={`${id}-email`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email",
                  },
                })}
              />
              <p className="error">{errors.email?.message}</p>

              <Input
                label="Username"
                id={`${id}-username`}
                {...register("username", {
                  required: "username is required",
                  minLength: { value: 2, message: "username is too short" },
                })}
              />
              <p className="error">{errors.username?.message}</p>
              <Input
                label="Password"
                id={`${id}-password`}
                type="text"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum length should be 6",
                  },
                })}
              />
              <p className="error">{errors.password?.message}</p>

              <Button isIconPresent={false} disabled={creatingUser && true}>
                Sign Up
              </Button>
            </form>

            <Link to="/login" className="lost-your-password">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <DevTool control={control} placement={"top-right"} />
    </>
  );
};

export default Signup;
