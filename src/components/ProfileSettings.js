import React, { useContext } from "react";
import "../style/ProfileContent.css";
import { userContext } from "../contexts/userContext";
import ProfileDataHeader from "../components/ProfileDataHeader";

const ProfileSettings = () => {
  const [User, setUser] = useContext(userContext);

  return (
    <div className="content__container--data">
      <div className="content__container--data--content">
        <div className="content__container--data--content--form">
          <form action="">
            <label htmlFor="">First & Last Name</label>
            <input type="text" name="name" defaultValue={User.name} />
            <label htmlFor="">Email</label>
            <input type="text" name="name" defaultValue={User.email} />
            <label htmlFor="">Phone</label>
            <input type="text" name="name" defaultValue={User.email} />
            <input type="submit" value="Update" />
          </form>
        </div>
        <div className="content__container--data--content--picture">
          <div className="photo">
            <img src={User.picture} alt="" />
          </div>
          <div className="buttons">
            <button className="upload">Upload</button>
            <button className="remove">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
