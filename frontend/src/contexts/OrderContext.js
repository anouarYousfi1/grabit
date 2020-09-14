import React, { useState, createContext } from "react";

export const orderContext = createContext();

export const OrderProvider = (props) => {
  const [Orders, setOrder] = useState([]);

  return (
    <orderContext.Provider value={[Orders, setOrder]}>
      {props.children}
    </orderContext.Provider>
  );
};
