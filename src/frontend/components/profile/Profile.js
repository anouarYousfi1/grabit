import React, { useEffect, useContext } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import ProfileController from "../../js/ProfileController";
import { userContext } from "../../contexts/userContext";
import { useHistory } from "react-router-dom";
import "../../style/Profile.css";

const Profile = (props) => {
  const [User, setUser] = useContext(userContext);
  const history = useHistory();

  const fetchData = () => {
    fetch("https://reqres.in/api/users/1")
      .then((res) => res.json())
      .then((data) => {
        const user = history.location.state.user;
        setUser({
          isLoggedIn: true,
          userID: data.data.id,
          name: user.name,
          email: user.email,
          picture: data.data.avatar,
        });
      });
  };

  useEffect(() => {
    ProfileController();
    fetchData();
  }, []);

  return (
    <div className="profile__container">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default Profile;
