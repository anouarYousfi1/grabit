import React, { useContext, useEffect } from "react";
import "../../style/ProfileContent.css";
import { userContext } from "../../contexts/userContext";

const ProfileSettings = () => {
  const [User, setUser] = useContext(userContext);
  let name;
  let email;
  let phone;
  let picture;

  const setContext = (e) => {
    const profileForm = document.querySelector(".profileForm");
    const profilePicture = document.querySelector(".picture");

    if (e.preventDefault) e.preventDefault();

    name = profileForm.elements["name"].value;
    email = profileForm.elements["email"].value;
    phone = profileForm.elements["phone"].value;
    picture = profilePicture.getAttribute("src");

    setUser({
      name: name,
      email: email,
      phone: phone,
      picture: picture,
    });
  };

  return (
    <div className="content__container--data">
      <div className="content__container--data--content">
        <div className="content__container--data--content--form">
          <form className="profileForm" onSubmit={setContext}>
            <label htmlFor="">First & Last Name</label>
            <input type="text" name="name" placeholder={User.name} />
            <label htmlFor="">Email</label>
            <input type="text" name="email" placeholder={User.email} />
            <label htmlFor="">Phone</label>
            <input type="text" name="phone" />
            <input
              type="submit"
              value="Update"
              className="profileForm__update"
            />
          </form>
        </div>
        <div className="content__container--data--content--picture">
          <div className="photo">
            <img src={User.picture} name="picture" alt="" className="picture" />
          </div>
          <div className="buttons">
            <label htmlFor="image" id="labelImage">
              Upload
            </label>
            <input type="file" id="image" />
            <button className="remove">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
