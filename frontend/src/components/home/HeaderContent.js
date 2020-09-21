import React, { useContext } from "react";
import "../../style/HeaderContent.css";
import Header from "../home/Header";
import SignUpButton from "../home/SignUpButton";
import { SignupContext } from "../../contexts/SignupContext";
import { Link } from "react-router-dom";

const HeaderContent = () => {
  const [Signups, setSignups] = useContext(SignupContext);

  const toggle = () => {
    const spanMenu = document.querySelector("#menu");
    const headline = document.querySelector(".HeaderContent__headline");
    const signup = document.querySelector(".HeaderContent__signup");

    if (spanMenu.style.display === "none") {
      spanMenu.style.display = "flex";
      headline.style.display = "none";
      signup.style.display = "none";
    } else {
      spanMenu.style.display = "none";
      headline.style.display = "flex";
      signup.style.display = "flex";
    }
  };

  return (
    <div className="HeaderContent">
      <span class="menu" id="menu">
        <Link id="login__menu">Login</Link>
        <Link to="/signup/driver">Signp as a driver</Link>
        <Link to="/signup/customer">Signup as a customer</Link>
      </span>
      <Link onClick={toggle} class="menuButton">
        <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
      </Link>

      <Header />
      <div className="HeaderContent__headline">
        <h1>
          we <strong>deliver</strong> it to your <strong>door</strong> within{" "}
          <strong>one hour</strong>
        </h1>
      </div>

      <div className="HeaderContent__signup">
        {Signups.map((Button) => (
          <Link to={Button.link}>
            <SignUpButton
              key={Button.id}
              icon={Button.icon}
              text={Button.headline}
              class={Button.class}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderContent;
