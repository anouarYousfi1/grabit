import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ordersContext } from "../../contexts/OrdersContext";
import { userContext } from "../../contexts/userContext";

const AssistOrdersMenu = (props) => {
  const [User, setUser] = useContext(userContext);
  const [Orders, setOrders] = useContext(ordersContext);
  const url =
    process.env.REACT_APP_DRIVER_GET_FILTERED_ORDERS_URL + "/accepted";
  const Userurl = process.env.REACT_APP_GET_USER_URL;
  let options = null;
  const history = useHistory();

  const fetchData = (url, method) => {
    options = {
      mode: "cors",
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: User.userID,
      }),
      credentials: "include",
    };

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map((d) => {
          setOrders((Orders) => [
            ...Orders,
            {
              id: d.id,
              time: d.time,
              date: d.date,
              source: d.source,
              destination: d.destination,
              status: d.status,
            },
          ]);
        });
      });
  };

  const fetchDataUser = () => {
    fetch(Userurl, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 400) {
          setUser({
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: "",
            type: "",
            actif: "",
          });
          history.push("/");
          console.log("you already have an account , sign in ");
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
          phone: data.telephone,
          actif: data.actif,
          type: data.user_type,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchDataUser();
    setOrders([]);
    console.log(User);
  }, []);

  useEffect(() => {
    if (User.isLoggedIn) {
      fetchData(url, "POST");
      console.log("running");
    }
  }, [User.isLoggedIn]);

  return (
    <Form className="select__order__form">
      <Form.Group controlId="select__order__form">
        <Form.Control
          as="select"
          custom
          onChange={props.orderSelectHandler.bind(this)}
        >
          <option></option>
          {Orders.map((order, i) => {
            return <option>Order {i}</option>;
          })}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default AssistOrdersMenu;
