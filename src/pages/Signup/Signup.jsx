import React, { useContext, useId, useState } from "react";
import Heading from "../../components/ui/Heading/Heading";
import Button from "../../components/ui/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input/Input";
import { UserContext } from "../../context/User/UserContext";
import {
  createUserInFirestore,
  signInUser,
  signOutUser,
} from "../../queries/auth";

const Signup = () => {
  const id = useId();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user, error } = await createUserInFirestore(
      email,
      username,
      password
    );
    if (!user) {
      setError(error);
      return;
    }
    setEmail("");
    setPassword("");
    setError("");
    setUser(user);

    navigate("/myaccount");
  };

  return (
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
              id={`${id}-text`}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <Input
              label="Username"
              id={`${id}-text`}
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

            <Button isIconPresent={false}>Sign Up</Button>
          </form>

          <Link to="/login" className="lost-your-password">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
