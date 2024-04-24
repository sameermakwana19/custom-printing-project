import React, { useContext, useId, useState } from "react";
import Heading from "../../components/ui/Heading/Heading";
import Button from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input/Input";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { UserContext } from "../../context/User/UserContext";
import { auth } from "../../firebase";

const Login = () => {
  const id = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  return (
    <div className="login-container">
      <div className="login">
        <Heading>Login</Heading>
        <div className="form-container">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.target.reset();

              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  setUser(userCredential.user);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <Input
              label="Username or email address"
              id={`${id}-text`}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <Input
              label="Password"
              id={`${id}-password`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <Input
              label={"remember me"}
              id={`${id}-remember-me`}
              type="checkbox"
              isMandatory={false}
            />
            <Button isIconPresent={false}> Log In</Button>
          </form>
          <Button
            isIconPresent={false}
            onClick={async (e) => {
              signOut(auth).then(() => {
                console.log("sign out");
              });
              setUser(null);
            }}
          >
            {" "}
            Log out
          </Button>
          <Link to="#" className="lost-your-password">
            Lost your Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
