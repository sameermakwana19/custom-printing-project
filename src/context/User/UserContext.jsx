import PropTypes from "prop-types";

import { createContext, useContext, useState } from "react";
import { getUserFromLocalStorage } from "../../queries/auth";

export const UserContext = createContext();

// eslint-disable-next-line
export const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getUserFromLocalStorage() || null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
