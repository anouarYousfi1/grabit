import React, { useContext } from "react";
import SignupHeader from "../common/SignupHeader";
import OrderContent from "../order/OrderContent";
import "../../style/Order.css";
import { userContext } from "../../contexts/userContext";

const Order = () => {
  const [User, setUser] = useContext(userContext);
  return (
    <div className="order__container">
      <SignupHeader>
        <div className="order__user">
          <h4 className="user__name">{User.name}</h4>
          <div className="user__picture">
            <img src={User.picture} alt="" />
          </div>
        </div>
      </SignupHeader>
      <OrderContent />
    </div>
  );
};

export default Order;
