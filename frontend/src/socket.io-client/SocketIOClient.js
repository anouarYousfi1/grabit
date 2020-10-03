import React, { useEffect, useContext, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { userContext } from "../contexts/userContext";
import { ordersContext } from "../contexts/OrdersContext";
import { locationContext } from "../contexts/LocationContext";
import { notificationContext } from "../contexts/NotificationContext";

const SocketIOClient = () => {
  const [User, setUser] = useContext(userContext);
  const [Orders, setOrders] = useContext(ordersContext);
  const [Location, setLocation] = useContext(locationContext);
  const [Notification, setNotification] = useContext(notificationContext);
  const [updated, setUpdated] = useState(false);
  const locationRef = useRef(Location);

  const CONNECTED = "connected";
  const POST_LOCATION = "PostLocation";
  const DRIVER_LOCATION = "RedirectLocation";
  const NEW_ORDER = "NEW_ORDER";
  const ORDER_REJECTED = "REJECTED_ORDER";
  const driverOrdersURL = process.env.REACT_APP_GET_DRIVER_ORDERS_URL;

  const socketioURL = process.env.REACT_APP_SOCKET_IO_URL;
  let socket = useRef(null);

  const fetchData = (url, method) => {
    let options = {};

    if (method === "POST" && url === driverOrdersURL)
      options = {
        mode: "cors",
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: User.userID,
        }),
        credentials: "include",
      };

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map((d) => {
          setOrders([
            ...Orders,
            {
              id: d.id,
              time: d.time,
              date: d.date,
              source: d.source,
              destination: d.destination,
              status: d.status,
            },
          ]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (Orders.length !== 0 && !updated) {
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
          setOrders([]);
          setUpdated(true);
        });

        socket.current.on(ORDER_REJECTED, (message) => {
          setNotification(message);
          setOrders([]);
          setUpdated(true);
        });
      });
    }
  }, [Orders]);

  useEffect(() => {
    locationRef.current = Location;
  }, [Location]);

  useEffect(() => {
    if (updated === true) fetchData(driverOrdersURL, "POST");
  }, [updated]);

  return <div></div>;
};

export default SocketIOClient;
