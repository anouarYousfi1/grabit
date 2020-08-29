import React, { useState, useEffect } from "react";
import "../../style/OrderContent.css";
import OrderItem from "../order/OrderItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Map from "./Map";

const OrderContent = () => {
  const [Orders, setOrders] = useState([
    {
      orderName: "Skinless white meat",
      state: "Remove",
    },
    {
      orderName: "Lean cuts of red meat",
      state: "Remove",
    },
  ]);

  Orders.sort((a, b) => {
    return a.state == "Add" ? -1 : b.state == "Add" ? 1 : 0;
  });

  useEffect(() => {
    const form = document.querySelector("#order__items--textinput--form");
    const minusus = document.getElementsByClassName("Remove");
    const plus = document.querySelector(".Add");

    const minususArray = [...minusus];

    const addItem = (e) => {
      if (e.preventDefault) e.preventDefault();

      let orderName = form.elements["order__items--textinput--input"].value;

      let order = {
        orderName: orderName,
        state: "Remove",
      };

      console.log("added", Orders);

      setOrders((prevState) => [...prevState, order]);

      console.log("after added", Orders);
    };

    console.log("i run only once");

    const removeItem = (e) => {
      const order = {
        orderName: e.currentTarget.parentNode.children[1].innerHTML,
        state: "Remove",
      };

      setOrders(
        Orders.filter((element) => element.orderName !== order.orderName)
      );

      console.log("remove ", Orders);
    };

    minususArray.forEach((minus) => {
      minus.addEventListener("click", removeItem);
    });

    plus.addEventListener("click", addItem);
    form.addEventListener("submit", addItem);
  }, [Orders]);

  console.log(Orders);

  return (
    <div className="order__content">
      <div className="order__content__main">
        <div className="order__content__main--header">
          <h1>Request</h1>
        </div>
        <div className="order__content__main--content">
          <div className="order__content__main--content--order">
            <form
              action=""
              className="order__content__main--content--order--form"
            >
              <label htmlFor="orderDescription">Describe your Order</label>
              <textarea
                name="orderDescription"
                id="orderDescription"
                cols="30"
                rows="10"
                placeholder="Text goes here"
              ></textarea>
              <div className="order__items">
                <label htmlFor="order__items">Order items list</label>

                <div className="order__items--textinput">
                  <form action="" id="order__items--textinput--form">
                    <FontAwesomeIcon className="Add" icon={faPlusCircle} />
                    <input
                      type="text"
                      id="order__items--textinput--input"
                      name="order__items--textinput--input"
                    />
                    <label htmlFor="order__items--textinput--input">Add</label>
                  </form>
                </div>

                {Orders.map((Order) => (
                  <div>
                    <OrderItem
                      state={Order.state}
                      orderName={Order.orderName}
                      name="order"
                    />
                    <input type="hidden" name="order" value={Order.orderName} />
                  </div>
                ))}
              </div>
              <div className="content__order__time">
                <div className="content__order__date">
                  <label htmlFor="ASAP">Date</label>

                  <input
                    type="text"
                    defaultValue="ASAP"
                    name="Date"
                    id="ASAP"
                  />
                </div>

                <div className="content__order__schedule">
                  <label htmlFor="ASAP">Schedule</label>
                  <input
                    type="date"
                    defaultValue=""
                    id="content__order__schedule"
                    name="Schedule"
                  />
                </div>
              </div>

              <div className="content__order__cost">
                <label htmlFor="content__order__cost">Cost</label>
                <input type="text" name="cost" />
              </div>

              <input type="submit" className="order__request--button" />
            </form>
          </div>
          <div className="order__content__main--content--tracker">
            <form className="tracker__form" action="">
              <label htmlFor="source">source</label>
              <input type="text" name="source" className="tracker__input" />
              <label htmlFor="destination">destination</label>
              <input
                type="text"
                name="destination"
                className="tracker__input"
              />
              <input
                type="submit"
                value="submit"
                className="order__track--button"
              />
            </form>

            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderContent;
