import React, { useContext, useEffect } from "react";
import "../style/FacebookButton.css";
import FacebookLogin from "react-facebook-login";
import { userContext } from "../contexts/userContext";

const FacebookButton = (props) => {
  const [User, setUser] = useContext(userContext);

  let fbContent;

  const responseFacebook = (response) => {
    setUser({
      isLoggedIn: false,
      userID: response.id,
      name: response.name,
      email: response.email,
      picture: response.picture,
    });
  };

  const componentClicked = () => {
    console.log("clicked");
  };

  if (User.isLoggedIn) {
  } else {
    fbContent = (
      <FacebookLogin
        appId="583956515621470"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        cssClass="facebook__button"
        callback={responseFacebook}
        icon="fa-facebook"
        textButton="Continue with Facebook"
      />
    );
  }

  let h4;

  console.log(User);

  if (!props.strong) {
    h4 = <h4 className="facebook__headline">{props.headline}</h4>;
  } else {
    h4 = (
      <h4 className="facebook__headline">
        <strong>{props.headline}</strong>
      </h4>
    );
  }

  return (
    <div className="facebook">
      {h4}
      {fbContent}
    </div>
  );
};

export default FacebookButton;
