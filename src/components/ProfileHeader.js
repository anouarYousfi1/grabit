import React from "react";
import SignupHeader from "../components/SignupHeader";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/ProfileHeader.css";
import { Link } from "react-router-dom";

const ProfileHeader = (props) => {
  return (
    <SignupHeader>
      <Link to="/">
        <div className="orderButton">
          <FontAwesomeIcon icon={faPen} />
          <h4>Request an Order</h4>
        </div>
      </Link>

      <div className="user">
        <h4 className="user__name">yassine yousfi</h4>
        <div className="user__picture"></div>
      </div>
    </SignupHeader>
  );
};

export default ProfileHeader;
