import React, { useEffect, useContext } from "react";

import { locationContext } from "../../contexts/LocationContext";
import { userContext } from "../../contexts/userContext";
import L from "leaflet";
import "../../style/LocateUser.css";

const LocateUser = () => {
  const [Location, setLocation] = useContext(locationContext);
  const [User, setUser] = useContext(userContext);

  const LocateUser = () => {
    if (User.type === 2) {
      let map = L.map("hidden__map", {
        center: [49.47748, 8.4],
        zoom: 12,
      });

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map
        .locate({
          setView: true,
          watch: true,
          enableHighAccuracy: true,
        }) /* This will return map so you can do chaining */
        .on("locationfound", function (e) {
          let marker = L.marker([e.latitude, e.longitude]).bindPopup(
            "Your are here "
          );

          setLocation({
            ...Location,
            longitude: e.longitude,
            latitude: e.latitude,
          });

          map.addLayer(marker);
        })
        .on("locationerror", function (e) {
          console.log(e);
          alert("Location access denied.");
        });
    }
  };

  useEffect(() => {
    LocateUser();
  }, []);

  useEffect(() => {
    console.log(Location);
  }, [Location]);

  return <div id="hidden__map"></div>;
};

export default LocateUser;
