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
import { set } from "firebase/database";
import Backdrop from "../../components/Backdrop/Backdrop";

const Signup = () => {
  const id = useId();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [creatingUser, setCreatingUser] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreatingUser(true);

    const { user, error } = await createUserInFirestore(
      email,
      username,
      password
    );

    setCreatingUser(false);

    if (!user) {
      setError(error);
      return;
    }
    setEmail("");
    setPassword("");
    setError("");
    setUser(user);
    saveUserToLocalStorage(user);

    navigate("/myaccount");
  };

  return (
    <>
      {creatingUser && <Backdrop />}
      <div className="login-container">
        <div className="login">
          <Heading>Signup</Heading>
          {error && (
            <Heading variant={"h1"} className="error">
              {error}
            </Heading>
          )}
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <Input
                label="email address"
                id={`${id}-email`}
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
              <Input
                label="Username"
                id={`${id}-username`}
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
              />
              <Input
                label="Password"
                id={`${id}-password`}
                type="text"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />

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
    </>
  );
};

export default Signup;
