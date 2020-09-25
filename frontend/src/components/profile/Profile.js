import React, { useEffect, useContext } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import ProfileController from "../../js/ProfileController";
import ProfileMenuController from "../../js/ProfileMenuController";
import { userContext } from "../../contexts/userContext";
import LocateUser from "../common/LocateUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logout from "../common/Logout";
import "../../style/Profile.css";

const Profile = (props) => {
  const [User, setUser] = useContext(userContext);
  const logouturl = process.env.REACT_APP_LOGOUT_URL;
  const url = process.env.REACT_APP_GET_USER_URL;
  const history = useHistory();
  let orderButton = null;

  if (User.type == 1) {
    orderButton = (
      <Link to="/order">
        <h4>Request an Order</h4>
      </Link>
    );
  }

  const toggle = () => {
    const spanMenu = document.querySelector(".profile__menu");

    if (spanMenu.style.display === "none") {
      spanMenu.style.display = "flex";
      spanMenu.classList.add("toggled");
    } else {
      spanMenu.style.display = "none";
      spanMenu.classList.remove("toggled");
    }
  };

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
        <div className="profile__menu" id="profile__menu">
          <h4 className="profile__menu--item active">Profile Settings</h4>
          <h4 className="profile__menu--item">Requests</h4>
          <h4 className="profile__menu--item">Address</h4>
          <h4 className="profile__menu--item">FAQ</h4>
          {orderButton}
          <Logout url={logouturl} className="logout__menu__item" />
        </div>
        <Link onClick={toggle} class="profile__menuButton">
          <FontAwesomeIcon icon={faBars} focusable />
        </Link>
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
