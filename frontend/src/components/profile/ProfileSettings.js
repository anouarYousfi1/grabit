import React, { useContext, useEffect, useState } from "react";
import "../../style/ProfileContent.css";
import { userContext } from "../../contexts/userContext";

const ProfileSettings = () => {
  const [User, setUser] = useContext(userContext);
  const [updated, setUpadated] = useState(false);
  let name;
  let email;
  let phone;
  let picture;

  let updateUrl = process.env.REACT_APP_SET_USER_URL;

  const updateHandler = (e) => {
    const profileForm = document.querySelector(".profileForm");
    const profilePicture = document.querySelector(".picture");

    if (e.preventDefault) e.preventDefault();

    name = profileForm.elements["name"].value;
    email = profileForm.elements["email"].value;
    phone = profileForm.elements["phone"].value;
    picture = profilePicture.getAttribute("src");

    setUser({
      ...User,
      name: name,
      email: email,
      phone: phone,
      picture: picture,
    });

    setUpadated(true);
  };

  const fetchData = (url, method) => {
    fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: User.userID,
        fullName: User.name,
        address: "33 rue demnat",
        city: "oujda",
        telephone: User.phone,
        email: User.email,
        picture: User.picture,
        actif: User.actif,
      }),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(updated);
    console.log(User);
    if (updated) {
      fetchData(updateUrl, "POST");
      setUpadated(false);
    }
  }, [updated, User]);

  return (
    <div className="content__container--data">
      <div className="content__container--data--content">
        <div className="content__container--data--content--form">
          <form className="profileForm" onSubmit={updateHandler}>
            <label htmlFor="">First & Last Name</label>
            <input type="text" name="name" placeholder={User.name} />
            <label htmlFor="">Email</label>
            <input type="text" name="email" placeholder={User.email} readOnly />
            <label htmlFor="">Phone</label>
            <input type="text" name="phone" placeholder={User.phone} />
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
