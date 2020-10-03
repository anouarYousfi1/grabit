import React, { useEffect, useContext, useState } from "react";
import SelectOptions from "../common/SelectOptions";
import AssistController from "../../js/AssistController";
import AssistOrderMenu from "./AssistOrdersMenu";
import OrderItems from "../common/OrderItems";
import { ordersContext } from "../../contexts/OrdersContext";
import { orderContext } from "../../contexts/OrderContext";

const AssistInfo = () => {
  const [Orders, setOrders] = useContext(ordersContext);
  const [Order, setOrder] = useContext(orderContext);

  const driverSetOrderURL = process.env.REACT_APP_DRIVER_SET_ORDER_URL;
  const options = {
    mode: "cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Order),
    credentials: "include",
  };

  const orderSelectHandler = (e) => {
    let orderName = e.target.value;
    let OrderNumber = orderName.slice(6);
    console.log(Orders);
    if (OrderNumber !== "") setOrder(Orders[OrderNumber]);
  };

  const setOrderState = (e) => {
    setOrder({
      ...Order,
      status: e.target.value,
    });
  };

  const fetchData = (url) => {
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    window.addEventListener("load", AssistController);
  }, []);

  useEffect(() => {
    if (Order && Order !== {} && Order.id && Order.status !== undefined)
      fetchData(driverSetOrderURL);
  }, [Order]);

  return (
    <div className="assist__container--content--data--info">
      <form action="" id="orderDetails"></form>

      <AssistOrderMenu orderSelectHandler={orderSelectHandler} />

      <label htmlFor="">Items</label>
      <OrderItems key={Order.id} order={Order} />

      <label htmlFor="">Source</label>
      <input
        type="text"
        value={Order.source}
        form="orderDetails"
        className="order__details__input"
        readOnly
      />

      <label htmlFor="">Destination</label>
      <input
        type="text"
        value={Order.destination}
        form="orderDetails"
        className="order__details__input"
        readOnly
      />

      <SelectOptions
        status={Order.status}
        setOrderState={setOrderState}
        disabled={0}
      />
    </div>
  );
};

export default AssistInfo;
