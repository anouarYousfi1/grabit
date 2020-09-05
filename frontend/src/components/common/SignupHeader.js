import React from "react";
import GrabitRed from "../../img/grabit_red.svg";
import "../../style/SignupHeader.css";
import { Link } from "react-router-dom";
import Logout from "../common/Logout";

const SignupHeader = (props) => {
  const url = "http://localhost:8080/grabit/api/users/logout";

  return (
    <div className="signup__header">
      <Link to="/">
        <img src={GrabitRed} alt="" />
      </Link>

      <div className="children">{props.children}</div>

      <Logout url={url} />
    </div>
  );
};

export default SignupHeader;
