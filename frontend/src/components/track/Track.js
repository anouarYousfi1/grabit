import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Map from "../common/Map";
import ProfileHeader from "../profile/ProfileHeader";
import { userContext } from "../../contexts/userContext";
import "../../style/Track.css";

const Track = () => {
  const [User, setUser] = useContext(userContext);
  const url = process.env.REACT_APP_GET_USER_URL;
  const history = useHistory();

  const fetchData = () => {
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 400) {
          setUser({
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: "",
            type: "",
            actif: "",
          });
          history.push("/");
          console.log("you already have an account , sign in ");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser({
          isLoggedIn: true,
          userID: data.id,
          name: data.fullName,
          email: data.email,
          picture: data.picture,
          phone: data.telephone,
          actif: data.actif,
          type: data.user_type,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="trackmap__container">
      <ProfileHeader />
      <div className="flex__track__map">
        <div className="track__map">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Track;
