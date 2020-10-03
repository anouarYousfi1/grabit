import React, { useState, createContext } from "react";

export const ordersContext = createContext();

export const OrdersProvider = (props) => {
  const [Orders, setOrders] = useState([]);

  return (
    <ordersContext.Provider value={[Orders, setOrders]}>
      {props.children}
    </ordersContext.Provider>
  );
};
