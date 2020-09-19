import React, { useState, createContext } from "react";

export const locationContext = createContext();

export const LocationProvider = (props) => {
  const [Location, setLocation] = useState({});

  return (
    <locationContext.Provider value={[Location, setLocation]}>
      {props.children}
    </locationContext.Provider>
  );
};
