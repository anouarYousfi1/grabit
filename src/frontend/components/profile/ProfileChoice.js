import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../style/ProfileChoice.css";
import { Link } from "react-router-dom";

const ProfileChoice = (props) => {
  return (
    <Link>
      <div className={"profile_choice" + " " + props.active}>
        <FontAwesomeIcon icon={props.icon} />
        <h3 className="profile_choice_headline">{props.headline}</h3>
      </div>
    </Link>
  );
};

export default ProfileChoice;
