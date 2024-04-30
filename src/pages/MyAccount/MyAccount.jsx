import React, { useContext } from "react";
import withAuth from "../../hoc/withAuth";
import Button from "../../components/ui/Button/Button";
import { deleteUserFromLocalStorage, signOutUser } from "../../queries/auth";
import { UserContext } from "../../context/User/UserContext";
import photo from "../../assets/userprofilepic.webp";

const MyAccount = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="my-account">
      <div className="profile-photo">
        <img src={photo} alt="" />
      </div>
      <div className="label-group">
        <span className="label">Email :</span>
        <span className="value">{user.email}</span>
      </div>
      <div className="label-group">
        <span className="label">User Name :</span>
        <span className="value">{user.displayName}</span>
      </div>
      <Button
        isIconPresent={false}
        onClick={async (e) => {
          const res = await signOutUser();

          setUser(null);
          deleteUserFromLocalStorage();
        }}
      >
        {" "}
        Log out
      </Button>
    </div>
  );
};

export default withAuth(MyAccount);
