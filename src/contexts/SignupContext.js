import React, { useState, createContext } from "react";
import { faBiking, faUser } from "@fortawesome/free-solid-svg-icons";

export const SignupContext = createContext();

export const SignupProvider = (props) => {
  const [Signups, setSignups] = useState([
    {
      id: 1,
      icon: faBiking,
      headline: "Sign up as a Driver",
      class: "HeaderContent__signup--driver",
      link: "/signup/driver",
      strong: true,
    },
    {
      id: 2,
      icon: faUser,
      headline: "Sign up as a Customer",
      class: "HeaderContent__signup--customer",
      link: "/signup/customer",
      strong: true,
    },
  ]);

  return (
    <SignupContext.Provider value={[Signups, setSignups]}>
      {props.children}
    </SignupContext.Provider>
  );
};
