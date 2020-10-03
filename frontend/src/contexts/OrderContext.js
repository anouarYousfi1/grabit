import React, { useState, createContext } from "react";

export const orderContext = createContext();

export const OrderProvider = (props) => {
  const [Order, setOrder] = useState({});

  return (
    <orderContext.Provider value={[Order, setOrder]}>
      {props.children}
    </orderContext.Provider>
  );
};
