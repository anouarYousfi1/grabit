import React from "react";
import "../../style/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link to="/">
        <h3>@2019 Grabit</h3>
      </Link>
      <Link to="/">
        <h3>Terms</h3>
      </Link>
      <Link to="/">
        <h3>Privacy Policy</h3>
      </Link>
    </div>
  );
};

export default Footer;
