import React from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const Notification = (props) => {
  const notification = NotificationManager.info(props.message);
  return <div>{notification}</div>;
};

export default Notification;
