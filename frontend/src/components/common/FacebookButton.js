import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../style/FacebookButton.css";
import FacebookLogin from "react-facebook-login";
import { userContext } from "../../contexts/userContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

const FacebookButton = (props) => {
  const [User, setUser] = useContext(userContext);
  const history = useHistory();
  const appId = "583956515621470";
  let url = "";
  let name = "";

  if (props.mode === "signup") {
    if (props.number == 0) {
      url = "http://localhost:8080/grabit/api/drivers/save";
    } else if (props.number == 1) {
      url = "http://localhost:8080/grabit/api/customers/save";
    }
  } else if (props.mode === "signin") {
    url = "http://localhost:8080/grabit/api/users/login";
  }

  let fbContent;

  console.log(url);

  const fetchData = () => {
    fetch(url, {
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
        picture: User.picture,
      }),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          console.log("here");
          history.push("/profile");
        }
        if (res.status == 400) {
          setUser({
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: "",
          });
          history.push("/");
          console.log("you already have an account , sign in ");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    if (User.email != "") {
      fetchData();
      console.log("running ...  : ", User);
    }
  }, [User]);

  const responseFacebook = (response) => {
    setUser({
      isLoggedIn: false,
      userID: response.id,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
    console.log("setting user");
  };

  const componentClicked = () => {
    console.log("clicked");
  };

  if (User.isLoggedIn) {
    history.push("/profile");
  } else {
    fbContent = (
      <FacebookLogin
        appId={appId}
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
