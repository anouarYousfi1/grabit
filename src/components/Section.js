import React from "react";
import ThirdBackground from "../img/ThirdBackground.svg";
import "../style/Section.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Section = () => {
  return (
    <div className="section">
      <img src={ThirdBackground} alt="" />
      <div className="section__overlay"></div>

      <div className="section__text">
        <h1 className="section__text--heading">Ready to order?</h1>
        <p className="section__text--paragraph">
          Browse Local Restaurants and businesses available in your area for
          delivery by entering your address below.
        </p>

        <div className="order">
          <input
            type="text"
            name="order__input"
            id="order__input"
            placeholder="mail@example.com"
          />
          <Link to="login">
            <div className="order__button">
              <h4>Send</h4>
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section;
