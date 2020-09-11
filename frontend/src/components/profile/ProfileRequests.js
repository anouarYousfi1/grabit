import React, { useState, useEffect, useContext } from "react";
import "../../style/ProfileContent.css";
import { userContext } from "../../contexts/userContext";
import { Table, Form } from "react-bootstrap";

const ProfileRequests = () => {
  const [User, setUser] = useContext(userContext);
  const [Orders, setOrders] = useState([]);
  const [Order, setOrder] = useState({});

  const customerOrdersURL = process.env.REACT_APP_GET_CUSTOMER_ORDERS_URL;
  const driverOrdersURL = process.env.REACT_APP_GET_DRIVER_ORDERS_URL;
  const driverSetOrder = process.env.REACT_APP_DRIVER_SET_ORDER_URL;

  let status = null;

  const setOrderState = (e) => {
    console.log(e.target.value);
    setOrder({
      ...Order,
      status: e.target.value,
    });
  };

  const selectRowHandler = (e) => {
    let selectedRow = e.currentTarget;
    let nextClick;
    let currentClick;

    document.addEventListener("click", (event) => {
      let isClickInside = selectedRow.contains(event.target);

      if (isClickInside) {
        selectedRow.lastChild.firstChild[0].removeAttribute("disabled");
        console.log("inside");
        setOrder({
          id: selectedRow.firstChild.textContent,
          status: undefined,
        });
      } else {
        selectedRow.lastChild.firstChild[0].setAttribute("disabled", "");
        console.log("outside");
      }
    });
  };

  const unselectRowHandler = (e) => {};

  if (User.type === 2) {
    status = (
      <Form>
        <Form.Group controlId="select__form">
          <Form.Control
            as="select"
            custom
            onChange={setOrderState.bind(this)}
            disabled
          >
            <option></option>
            <option>picked</option>
            <option>delivered</option>
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }

  const fetchData = (url, method) => {
    let options = {};

    switch (true) {
      case "GET":
        options = {
          mode: "cors",
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        break;

      case method === "POST" &&
        (url === customerOrdersURL || url === driverOrdersURL):
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
        break;

      case method === "POST" && url === driverSetOrder:
        options = {
          mode: "cors",
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Order),
          credentials: "include",
        };
        break;
    }

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (url !== process.env.REACT_APP_DRIVER_SET_ORDER_URL) {
          data.map((d) => {
            setOrders(...Orders, [
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
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    switch (User.type) {
      case 1:
        fetchData(customerOrdersURL, "POST");
        break;
      case 2:
        fetchData(driverOrdersURL, "POST");
    }
  }, []);

  useEffect(() => {
    if (Order && Order !== {} && Order.id && Order.status !== undefined)
      fetchData(driverSetOrder, "POST");
  }, [Order]);

  return (
    <div className="profile__requests">
      <div className="profile__requests--content">
        <Table className="table" responsive="true" hover>
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">time</th>
              <th scope="col">date</th>
              <th scope="col">source</th>
              <th scope="col">destination</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            {Orders.map((order, i) => {
              return (
                <tr key={i} onClick={selectRowHandler.bind(this)}>
                  <th scope="row">{order.id}</th>
                  <td>{order.time}</td>
                  <td>{order.date}</td>
                  <td>{order.source}</td>
                  <td>{order.destination}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProfileRequests;
