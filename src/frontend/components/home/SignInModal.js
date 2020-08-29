import React, { useState, useEffect } from "react";
import FacebookButton from "../common/FacebookButton";
import "../../style/SignInModal.css";
import ModalController from "../../js/ModalController";

const SignUpModal = () => {
  const [Buttons, setButtons] = useState([
    {
      id: 1,
      headline: "Sign in as a Customer",
      link: "/",
    },
    {
      id: 2,
      headline: "Sign in as a Driver",
      link: "/",
    },
  ]);

  useEffect(() => {
    window.addEventListener("load", ModalController);
    if (document.readyState === "complete") {
      ModalController();
    }
  });

  return (
    <div className="container">
      <div className="modal">
        <h1 className="modal__heading">Welcome Back</h1>
        {Buttons.map((Button) => (
          <FacebookButton
            key={Button.id}
            headline={Button.headline}
            link={Button.link}
          />
        ))}
      </div>
    </div>
  );
};

export default SignUpModal;
