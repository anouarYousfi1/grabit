import React, { useState, createContext } from "react";

export const notificationContext = createContext();

export const NotificationProvider = (props) => {
  const [notification, setNotification] = useState(null);

  return (
    <notificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </notificationContext.Provider>
  );
};
