import React, { useContext } from "react";
import SignupHeader from "../common/SignupHeader";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../style/ProfileHeader.css";
import { Link } from "react-router-dom";
import { userContext } from "../../contexts/userContext";

const ProfileHeader = () => {
  const [User, setUser] = useContext(userContext);

  return (
    <SignupHeader>
      <Link to="/">
        <div className="orderButton">
          <FontAwesomeIcon icon={faPen} />
          <h4>Request an Order</h4>
        </div>
      </Link>

      <div className="user">
        <h4 className="user__name">{User.name}</h4>
        <div className="user__picture">
          <img src={User.picture} alt="" />
        </div>
      </div>
    </SignupHeader>
  );
};

export default ProfileHeader;
