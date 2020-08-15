import React, { useContext } from "react";
import "../style/HeaderContent.css";
import Header from "../components/Header";
import SignUpButton from "../components/SignUpButton";
import { SignupContext } from "../contexts/SignupContext";
import { Link } from "react-router-dom";

const HeaderContent = () => {
  const [Signups, setSignups] = useContext(SignupContext);

  return (
    <div className="HeaderContent">
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
