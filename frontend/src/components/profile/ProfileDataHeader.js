import React from "react";
import DropDownMenu from "../common/DropDownMenu";
const ProfileDataHeader = (props) => {
  return (
    <div className="content__container--data--header">
      <h6 className="header__data">Profile Settings</h6>
      <DropDownMenu />
    </div>
  );
};

export default ProfileDataHeader;
