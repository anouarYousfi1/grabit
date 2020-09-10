import React, { useContext, useEffect, useState } from "react";
import SignupHeader from "../common/SignupHeader";
import OrderContent from "../order/OrderContent";
import "../../style/Order.css";
import { userContext } from "../../contexts/userContext";
import Logout from "../common/Logout";
import { Alert } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";

const Order = () => {
  const [User, setUser] = useContext(userContext);
  const [state, setState] = useState();
  const [Order, setOrder] = useState();
  const url = process.env.REACT_APP_LOGOUT_URL;
  const orderUrl = process.env.REACT_APP_ORDER_CUSTOMER_SAVE_URL;
  const loginUrl = process.env.REACT_APP_GET_USER_URL;
  const history = useHistory();

  const saveOrder = () => {
    const descriptionInput = document.querySelector("#orderDescription");
    const orderItems = document.getElementsByClassName("order_items");
    const orderDate = document.querySelector("#ASAP");
    const orderSchedule = document.querySelector("#content__order__schedule");
    const orderCost = document.querySelector("#cost");

    const source = document.querySelector(".tracker__input--source");
    const destination = document.querySelector(".tracker__input--destination");

    let order = {};
    const items = [...orderItems];

    console.log(descriptionInput);
    items.forEach((element) => {
      console.log(element);
    });

    console.log(orderDate);
    console.log(orderSchedule);
    console.log(orderCost);

    console.log(source);
    console.log(destination);

    order = {
      description: descriptionInput.value,
      customerId: User,
      courierId: null,
      time: orderDate.value,
      date: orderSchedule.value,
      cost: orderCost.value,
      source: source.value,
      destination: destination.value,
      items: [],
    };

    items.forEach((element, i) => {
      order["items"] = [...order["items"], { id: i, name: element.value }];
    });

    setOrder(order);
  };

  const fetchData = (url, method) => {
    fetch(url, {
      mode: "cors",
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Order),
      credentials: "include",
    })
      .then((res) => {
        if (method == "POST") {
          if (res.ok) {
            setState(
              <div className="order__alert">
                <Alert variant="success">
                  Thank you for your order, Order in it's way
                </Alert>
              </div>
            );
          } else {
            setState(
              <div className="order__alert">
                <Alert variant="warning">Error while saving your Order</Alert>
              </div>
            );
          }
        } else if (method == "GET") {
          if (res.status === 400) {
            setUser({
              isLoggedIn: false,
              userID: "",
              name: "",
              email: "",
              picture: "",
            });
            history.push("/");
            console.log("you already have an account , sign in ");
          }
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser({
          isLoggedIn: true,
          userID: data.id,
          name: data.fullName,
          email: data.email,
          picture: data.picture,
        });
      });
  };

  useEffect(() => {
    const tracker_form = document.querySelector(
      ".order__content__main--content--order--form"
    );

    fetchData(loginUrl, "GET");

    if (Order !== null && Order !== undefined) fetchData(orderUrl, "POST");
    if (tracker_form != null)
      tracker_form.addEventListener("submit", saveOrder);
  }, [Order]);

  console.log(state);

  if (User.isLoggedIn) {
    return (
      <div className="order__container">
        <SignupHeader>
          <div className="order__user">
            <h4 className="user__name">{User.name}</h4>
            <div className="user__picture">
              <img src={User.picture} alt="" />
            </div>
          </div>
          <Logout url={url} />
        </SignupHeader>
        {state}
        <OrderContent />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Order;
