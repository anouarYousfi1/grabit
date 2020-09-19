import React, { useEffect, useContext, useRef } from "react";
import socketIOClient from "socket.io-client";
import { userContext } from "../contexts/userContext";
import { orderContext } from "../contexts/OrderContext";
import { locationContext } from "../contexts/LocationContext";
import L from "leaflet";

const SocketIOClient = () => {
  const [User, setUser] = useContext(userContext);
  const [Orders, setOrders] = useContext(orderContext);
  const [Location, setLocation] = useContext(locationContext);
  const locationRef = useRef(Location);

  const CONNECTED = "connected";
  const POST_LOCATION = "PostLocation";
  const DRIVER_LOCATION = "RedirectLocation";

  const socketioURL = process.env.REACT_APP_SOCKET_IO_URL;
  let socket = useRef(null);

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
      });
    }

    console.log("i run so many times");
  }, [Orders]);

  useEffect(() => {
    locationRef.current = Location;
  }, [Location]);

  return <div></div>;
};

export default SocketIOClient;
