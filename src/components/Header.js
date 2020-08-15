import React from "react";
import Logo from "../img/grabit.svg";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link id="login">
        <div className="header__button">Sign in</div>
      </Link>

      <Link>
        <div className="header__logo">
          <img src={Logo} alt="logo" />
        </div>
      </Link>
    </div>
  );
};

export default Header;
