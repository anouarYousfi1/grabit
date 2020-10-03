import React, { useState, useEffect } from "react";
import "../../style/OrderItems.css";

const OrderItems = (props) => {
  const [Items, setItems] = useState([]);

  const url = process.env.REACT_APP_GET_ORDER_ITEMS_URL;
  const options = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([props.order]),
    credentials: "include",
  };

  const fetchData = (url) => {
    fetch(url, options)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
        data.map((d, i) => {
          setItems((Items) => [
            ...Items,
            {
              name: d.name,
            },
          ]);
        });
      });
  };

  useEffect(() => {
    console.log(props.order);
    if (props.order && props.order.id) fetchData(url);
  }, [props.order]);

  return (
    <div className="items__container">
      {Items.map((Item) => {
        return <label>{Item.name}</label>;
      })}
    </div>
  );
};

export default OrderItems;
