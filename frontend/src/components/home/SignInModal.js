import React, { useState, useEffect } from "react";
import FacebookButton from "../common/FacebookButton";
import "../../style/SignInModal.css";
import ModalController from "../../js/ModalController";

const SignUpModal = () => {
  const [Button, setButtons] = useState({
    id: 1,
    headline: "Sign in ",
    link: "/",
  });

  const mode = "signin";

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

        <FacebookButton
          key={Button.id}
          headline={Button.headline}
          link={Button.link}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default SignUpModal;
