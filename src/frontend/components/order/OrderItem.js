import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../../style/OrderItem.css";
import OrderController from "../../js/OrderController";

const OrderItem = (props) => {
  let icon;

  switch (props.state) {
    case "Add":
      icon = <FontAwesomeIcon icon={faPlusCircle} />;
      break;

    case "Remove":
      icon = <FontAwesomeIcon icon={faMinusCircle} />;
      break;
  }

  return (
    <div className="order__item">
      <h4 className={props.state}>{icon}</h4>
      <h6 className="order__item--name">{props.orderName}</h6>
      <label className="label" htmlFor="order__item--name">
        {props.state}
      </label>
    </div>
  );
};

export default OrderItem;
