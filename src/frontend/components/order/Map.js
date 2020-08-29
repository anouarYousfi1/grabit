import React, { useEffect } from "react";
import L from "leaflet";
import "../../style/Map.css";
import "leaflet-routing-machine";
import Geocode from "react-geocode";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const Map = () => {
  const getResults = async (source, destination) => {
    const provider = new OpenStreetMapProvider();

    const firstResults = await provider.search({ query: source });
    const secondResults = await provider.search({ query: destination });

    const results = {
      firstResults: firstResults,
      secondResults: secondResults,
    };

    return results;
  };

  useEffect(() => {
    let lat, lng;
    let firstResults = null,
      secondResults = null;

    let removeControl = null;
    // create map
    let map = L.map("map", {
      center: [49.47748, 8.4],
      zoom: 12,
    });

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const tracker_form = document.querySelector(".tracker__form");

    const addTrack = (e) => {
      e.preventDefault();

      const source = tracker_form.elements["source"].value;
      const destination = tracker_form.elements["destination"].value;

      getResults(source, destination).then((results) => {
        if (removeControl !== null) map.removeControl(removeControl);

        firstResults = results.firstResults[0];
        secondResults = results.secondResults[0];

        console.log(firstResults, secondResults);

        removeControl = L.Routing.control({
          waypoints: [
            L.latLng(firstResults.y, firstResults.x),
            L.latLng(secondResults.y, secondResults.x),
          ],
          addWaypoints: true,
          routeWhileDragging: false,
        }).addTo(map);
      });
      console.log("added");
    };

    tracker_form.addEventListener("submit", addTrack);
  }, []);

  return <div id="map"></div>;
};

export default Map;
