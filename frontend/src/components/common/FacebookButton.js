import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../style/FacebookButton.css";
import FacebookLogin from "react-facebook-login";
import { userContext } from "../../contexts/userContext";
import { Redirect } from "react-router-dom";

const FacebookButton = (props) => {
  const [User, setUser] = useContext(userContext);
  const history = useHistory();

  let fbContent;

  const fetchData = () => {
    fetch("http://localhost:8080/grabit/api/customers/save", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: User.name,
        address: "33 rue demnat",
        city: "oujda",
        telephone: "087654323",
        email: User.email,
        password: "yas1995",
      }),
    })
      .then((res) => {
        if (res.ok) history.push("/profile", { user: User });
      })
      .then((data) => {
        console.log(data);
      });
  };

  const setSession = () => {};

  useEffect(() => {
    if (User.name != "") {
      fetchData();
    }
  }, [User]);

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
