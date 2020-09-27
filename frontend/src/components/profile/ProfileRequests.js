import React, { useState, useEffect, useContext } from "react";
import "../../style/ProfileContent.css";
import { userContext } from "../../contexts/userContext";
import { orderContext } from "../../contexts/OrderContext";
import { Table, Button } from "react-bootstrap";
import SelectOptions from "../common/SelectOptions";
import { Redirect, useHistory } from "react-router-dom";

const ProfileRequests = () => {
  const [User, setUser] = useContext(userContext);
  const [Orders, setOrders] = useContext(orderContext);
  const [Order, setOrder] = useState({});
  const history = useHistory();

  const customerOrdersURL = process.env.REACT_APP_GET_CUSTOMER_ORDERS_URL;
  const driverOrdersURL = process.env.REACT_APP_GET_DRIVER_ORDERS_URL;
  const driverSetOrderURL = process.env.REACT_APP_DRIVER_SET_ORDER_URL;
  const orderStatusURL = process.env.REACT_APP_GET_ORDER_STATUS;

  let trackCol = null;
  let trackRow = null;

  const Redirect = () => {
    history.push("/track");
  };

  if (User.type === 1) {
    trackCol = <th scope="col"></th>;

    trackRow = (
      <td>
        <Button onClick={Redirect} variant="primary" disabled>
          track order
        </Button>
      </td>
    );
  }

  const setOrderState = (e) => {
    setOrder({
      ...Order,
      status: e.target.value,
    });
  };

  const selectRowHandler = (e) => {
    let selectedRow = e.currentTarget;

    if (User.type === 2) {
      document.addEventListener("click", (event) => {
        let isClickInside = selectedRow.contains(event.target);

        if (isClickInside) {
          selectedRow.lastChild.firstChild[0].removeAttribute("disabled");
          setOrder({
            id: selectedRow.firstChild.textContent,
            status: undefined,
          });
        } else {
          selectedRow.lastChild.firstChild[0].setAttribute("disabled", "");
        }
      });
    } else {
      document.addEventListener("click", (event) => {
        let isClickInside = selectedRow.contains(event.target);

        if (event.target && event.target.type === "button") {
          history.push("/track");
        }

        if (isClickInside) {
          selectedRow.lastChild.firstChild.removeAttribute("disabled");
        } else {
          selectedRow.lastChild.firstChild.setAttribute("disabled", "");
        }
      });
    }
  };

  const setStatusRender = (orderStatus) => {
    if (User.type === 2) {
      return (
        <SelectOptions
          status={orderStatus}
          setOrderState={setOrderState}
        ></SelectOptions>
      );
    } else if (User.type === 1) {
      return orderStatus;
    }
  };

  const fetchData = (url, method) => {
    let options = {};

    switch (true) {
      case method === "GET":
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

      case method === "POST" &&
        (url === driverSetOrderURL || url === orderStatusURL):
        options = {
          mode: "cors",
          method: method,
          headers: {
            Accept: "application/json",
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
        if (url !== driverSetOrderURL && url !== orderStatusURL) {
          data.map((d) => {
            setOrders([
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
      fetchData(driverSetOrderURL, "POST");
  }, [Order]);

  useEffect(() => {
    console.log(Orders);
  }, [Orders]);

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
              {trackCol}
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
                  <td>{setStatusRender(order.status)}</td>
                  {trackRow}
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
