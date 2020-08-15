import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileContent from "../components/ProfileContent";
import "../style/Profile.css";

const Profile = () => {
  return (
    <div className="profile__container">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default Profile;
