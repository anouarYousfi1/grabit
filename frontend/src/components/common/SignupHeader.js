import React from "react";
import GrabitRed from "../../img/grabit_red.svg";
import "../../style/SignupHeader.css";
import { Link } from "react-router-dom";

const SignupHeader = (props) => {
  return (
    <div className="signup__header">
      <Link to="/">
        <img src={GrabitRed} alt="" />
      </Link>

      <div className="children">{props.children}</div>
    </div>
  );
};

export default SignupHeader;
