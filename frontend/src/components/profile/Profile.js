import React, { useEffect, useContext } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import ProfileController from "../../js/ProfileController";
import ProfileMenuController from "../../js/ProfileMenuController";
import { userContext } from "../../contexts/userContext";
import LocateUser from "../common/LocateUser";
import SlidingMenu from "../common/SlidingMenu";
import "../../style/Profile.css";

const Profile = () => {
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
    ProfileController();
    ProfileMenuController();
  }, []);

  if (User.isLoggedIn) {
    return (
      <div className="profile__container">
        <SlidingMenu />
        <ProfileHeader />
        <ProfileContent />

        <LocateUser />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Profile;
