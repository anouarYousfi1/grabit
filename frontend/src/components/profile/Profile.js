import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import ProfileController from "../../js/ProfileController";
import { userContext } from "../../contexts/userContext";
import axios from "axios";

import "../../style/Profile.css";
import Axios from "axios";

const Profile = (props) => {
  const [User, setUser] = useContext(userContext);
  const url = "http://localhost:8080/grabit/api/users/";
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
          picture: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
    ProfileController();
  }, []);

  return (
    <div className="profile__container">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default Profile;
