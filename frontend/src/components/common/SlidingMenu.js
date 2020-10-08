import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logout from "../common/Logout";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../../contexts/userContext";

const SlidingMenu = () => {
  const location = useLocation();
  const [User, setUser] = useContext(userContext);
  const logouturl = process.env.REACT_APP_LOGOUT_URL;

  let orderButton = null;
  let profileLink = null;

  if (User.type == 1) {
    orderButton = (
      <Link to="/order">
        <h4>Request an Order</h4>
      </Link>
    );
  }
  if (location.pathname != "/profile") {
    profileLink = (
      <Link to="/profile">
        <h4 className="profile__menu--item">Profile</h4>
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

  useEffect(() => {
    console.log(location);
  }, []);

  return (
    <div>
      <div className="profile__menu" id="profile__menu">
        <h4 className="profile__menu--item active">Profile Settings</h4>
        <h4 className="profile__menu--item">Requests</h4>
        <h4 className="profile__menu--item">Address</h4>
        <h4 className="profile__menu--item">FAQ</h4>
        {orderButton}
        {profileLink}
        <Logout url={logouturl} className="logout__menu__item" />
      </div>
      <Link onClick={toggle} class="profile__menuButton">
        <FontAwesomeIcon icon={faBars} focusable />
      </Link>
    </div>
  );
};

export default SlidingMenu;
