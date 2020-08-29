import React, { useState, useEffect, useContext } from "react";
import { faUser, faBell, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../style/ProfileContent.css";
import ProfileChoice from "./ProfileChoice";
import ProfileSettings from "./ProfileSettings";
import ProfileAdresse from "./ProfileAdresse";
import ProfileController from "../../js/ProfileController";
import ProfileDataHeader from "./ProfileDataHeader";
import ProfileRequests from "./ProfileRequests";
import { userContext } from "../../contexts/userContext";

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
  });

  return (
    <div className="content__container">
      <div className="content__container--choices">
        <div className="content__container--header">
          <div className="content__container--header--picture">
            <img src={User.picture} alt="" />
          </div>

          {User.name}
        </div>
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
