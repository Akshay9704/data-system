import React from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const [auth, setAuth] = React.useState(false);
   
  return (
    <UserContext.Provider value={{ user, setUser, auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;