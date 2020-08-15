import React, { useState, useEffect, useContext } from "react";
import { faUser, faBell, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../style/ProfileContent.css";
import ProfileChoice from "../components/ProfileChoice";
import ProfileSettings from "../components/ProfileSettings";
import ProfileAdresse from "../components/ProfileAdresse";
import ProfileController from "../js/ProfileController";
import ProfileDataHeader from "../components/ProfileDataHeader";
import ProfileRequests from "../components/ProfileRequests";
import { userContext } from "../contexts/userContext";

const ProfileContent = () => {
  const [User, setUser] = useContext(userContext);

  const [Choices, setChoices] = useState([
    {
      id: 1,
      headline: "Profile Settings",
      icon: faUser,
      active: "active",
    },
    {
      id: 2,
      headline: "Requests",
      icon: faBell,
      active: "",
    },

    {
      id: 3,
      headline: "Adresse",
      icon: faHome,
      active: "",
    },

    {
      id: 4,
      headline: "FAQ",
      icon: faHome,
      active: "",
    },
  ]);

  useEffect(() => {
    window.addEventListener("load", ProfileController);

    console.log(User);
  });

  return (
    <div className="content__container">
      <div className="content__container--choices">
        <div className="content__container--header">{User.name}</div>
        <div className="content__container--content">
          {Choices.map((Choice) => (
            <ProfileChoice
              key={Choice.id}
              icon={Choice.icon}
              headline={Choice.headline}
              active={Choice.active}
            />
          ))}
        </div>
      </div>

      <div className="profile__data__container">
        <ProfileDataHeader />
        <ProfileSettings />
        <ProfileAdresse />
        <ProfileRequests />
      </div>
    </div>
  );
};

export default ProfileContent;
