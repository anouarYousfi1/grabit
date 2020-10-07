import React, { useContext, useState, useEffect } from "react";
import SignupHeader from "../common/SignupHeader";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../style/ProfileHeader.css";
import { Link } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import Logout from "../common/Logout";
import Toggle from "react-bootstrap-toggle";
import { Form } from "react-bootstrap";

const ProfileHeader = () => {
  const [User, setUser] = useContext(userContext);
  const [Active, setActive] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const url = process.env.REACT_APP_LOGOUT_URL;
  const setStateUrl = process.env.REACT_APP_DRIVER_SET_STATE_URL;
  const getStateUrl = process.env.REACT_APP_DRIVER_GET_STATE_URL;
  let orderButton = null;
  let toggleButton = null;
  let assistButton = null;

  if (User.type == 2 && User.actif === true) {
    assistButton = (
      <Link to="/assist">
        <div className="orderButton">
          <h4>Start Delivering</h4>
        </div>
      </Link>
    );
  }

  if (User.type == 1) {
    orderButton = (
      <Link to="/order">
        <div className="orderButton">
          <FontAwesomeIcon icon={faPen} />
          <h4>Request an Order</h4>
        </div>
      </Link>
    );
  }

  const toggleState = () => {
    setActive(!Active);
  };

  if (User.type == 2 && Active != null) {
    toggleButton = (
      // <Toggle
      //   onClick={toggleState}
      //   on={<h2>actif</h2>}
      //   off={<h2>inactif</h2>}
      //   size="xs"
      //   offstyle="danger"
      //   active={Active}
      // />

      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Take Control"
          onClick={toggleState}
          size="lg"
          checked={Active}
        />
      </Form>
    );
  }

  const setState = (stateUrl, method) => {
    fetch(stateUrl, {
      method: method,
      mode: "cors",
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
        actif: Active,
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

  const getState = (stateUrl, method) => {
    fetch(stateUrl, {
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
        telephone: "087654323",
        email: User.email,
        password: "yas1995",
        picture: User.picture,
      }),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setActive(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (User.isLoggedIn) getState(getStateUrl, "POST");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setUser({
        ...User,
        actif: Active,
      });
      if (User) setState(setStateUrl, "POST");
    }
  }, [Active]);

  return (
    <SignupHeader>
      {orderButton}
      {assistButton}

      <div className="user">
        <h4 className="user__name">{User.name}</h4>
        <div className="user__picture">
          <img src={User.picture} alt="" />
        </div>
      </div>

      {toggleButton}
      <Logout url={url} />
    </SignupHeader>
  );
};

export default ProfileHeader;
