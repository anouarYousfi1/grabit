import React, { useState, createContext } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
  const [User, setUser] = useState({
    isLoggedIn: false,
    userID: "1",
    name: "yassine yousfi",
    email: "yassine19265@gmail.com",
    picture: "",
  });

  return (
    <userContext.Provider value={[User, setUser]}>
      {props.children}
    </userContext.Provider>
  );
};
