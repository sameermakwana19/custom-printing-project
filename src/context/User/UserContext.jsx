import React, { createContext, useState } from "react";
import { getUserFromLocalStorage } from "../../queries/auth";

export const UserContext = createContext();

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
