import React, { useState, createContext } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
  const [User, setUser] = useState({
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    phone: "",
    picture: "",
    type: "",
    actif: "",
  });

  return (
    <userContext.Provider value={[User, setUser]}>
      {props.children}
    </userContext.Provider>
  );
};
