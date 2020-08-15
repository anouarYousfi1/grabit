import React from "react";
import "../style/ProfileContent.css";

const ProfileRequests = () => {
  return (
    <div className="profile__requests">
      <div className="profile__requests--content">
        <form action="">
          <label htmlFor="">Adress</label>
          <input type="text" defaultValue="address" />
          <label htmlFor="">Postal Code</label>
          <input type="text" defaultValue="60000" />
        </form>
      </div>
    </div>
  );
};

export default ProfileRequests;
