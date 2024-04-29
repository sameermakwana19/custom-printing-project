import React, { createContext, useContext, useState } from "react";
import { getUserFromLocalStorage } from "../../queries/auth";

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getUserFromLocalStorage() || null;
  });

  // console.log({ user, userLocal: getUserFromLocalStorage() });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
