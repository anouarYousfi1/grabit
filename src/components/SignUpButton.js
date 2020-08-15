import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../style/HeaderContent.css";

const SignUpButton = (props) => {
  return (
    <div className={"HeaderContent__signup--user " + props.class}>
      <FontAwesomeIcon
        className="HeaderContent__signup--fa"
        icon={props.icon}
      />

      <div className="HeaderContent__signup--group">
        <h4 className="HeaderContent__signup--heading">{props.text}</h4>
        <FontAwesomeIcon
          className="HeaderContent__signup--faArrow"
          icon={faArrowRight}
        />
      </div>
    </div>
  );
};

export default SignUpButton;
