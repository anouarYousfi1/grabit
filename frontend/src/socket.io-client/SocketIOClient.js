import React, { useEffect, useContext, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { userContext } from "../contexts/userContext";
import { orderContext } from "../contexts/OrderContext";
import { locationContext } from "../contexts/LocationContext";
import { notificationContext } from "../contexts/NotificationContext";

const SocketIOClient = () => {
  const [User, setUser] = useContext(userContext);
  const [Orders, setOrders] = useContext(orderContext);
  const [Location, setLocation] = useContext(locationContext);
  const [Notification, setNotification] = useContext(notificationContext);

  const locationRef = useRef(Location);

  const CONNECTED = "connected";
  const POST_LOCATION = "PostLocation";
  const DRIVER_LOCATION = "RedirectLocation";
  const NEW_ORDER = "NEW_ORDER";

  const socketioURL = process.env.REACT_APP_SOCKET_IO_URL;
  let socket = useRef(null);
  let notification = null;

  useEffect(() => {
    if (Orders.length !== 0) {
      socket.current = socketIOClient(socketioURL);

      socket.current.on(CONNECTED, (data) => {
        console.log(data);

        if (User.type === 2) {
          let interval;

          interval = setInterval(() => {
            console.log("driver sending location ...");

            socket.current.emit(POST_LOCATION, {
              user: User.userID,
              order: Orders[0].id,
              longitude: locationRef.current.longitude,
              latitude: locationRef.current.latitude,
              type: User.type,
            });

            if (!User.isLoggedIn) clearInterval(interval);
          }, 5000);
        } else {
          console.log("customer sending location ...");
          socket.current.emit(POST_LOCATION, {
            user: User.userID,
            order: Orders[0].id,
            longitude: Location.longitude,
            latitude: Location.latitude,
            type: User.type,
          });
        }

        socket.current.on(DRIVER_LOCATION, (locationdata) => {
          console.log(locationdata);
          setLocation({
            user: locationdata.user,
            order: locationdata.order,
            longitude: locationdata.longitude,
            latitude: locationdata.latitude,
            type: locationdata.type,
          });
        });

        socket.current.on(NEW_ORDER, (message) => {
          setNotification(message);
        });
      });
    }
  }, [Orders]);

  useEffect(() => {
    locationRef.current = Location;
  }, [Location]);

  useEffect(() => {
    console.log("i'm rendering again");
  });

  return <div></div>;
};

export default SocketIOClient;
