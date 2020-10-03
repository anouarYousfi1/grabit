import React from "react";
import ProfileHeader from "../profile/ProfileHeader";
import "../../style/Assist.css";
import AssistInfo from "./AssistInfo";
import AssistMap from "./AssistMap";

const Assist = () => {
  return (
    <div className="assist__container">
      <ProfileHeader />
      <div className="assist__container--content">
        <div className="assist__container--content--data">
          <AssistInfo />
          <AssistMap />
        </div>
      </div>
    </div>
  );
};

export default Assist;
