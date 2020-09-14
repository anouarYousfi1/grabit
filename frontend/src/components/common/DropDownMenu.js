import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { orderContext } from "../../contexts/OrderContext";
import { userContext } from "../../contexts/userContext";

const DropDownMenu = () => {
  const [Orders, setOrders] = useContext(orderContext);
  const [User, setUser] = useContext(userContext);
  const [url, setUrl] = useState();
  const [updated, setUpdated] = useState(false);

  const options = {
    mode: "cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: User.userID,
    }),
    credentials: "include",
  };

  const setURL = (eventKey, event) => {
    if (User.type === 1) {
      switch (eventKey) {
        case "1":
          setUrl(process.env.REACT_APP_GET_CUSTOMER_ORDERS_URL);
          break;
        case "2":
          setUrl(
            process.env.REACT_APP_CUSTOMER_GET_FILTERED_ORDERS_URL +
              "/delivered"
          );

          break;
        case "3":
          setUrl(
            process.env.REACT_APP_CUSTOMER_GET_FILTERED_ORDERS_URL + "/picked"
          );
          break;
        case "4":
          setUrl(
            process.env.REACT_APP_CUSTOMER_GET_FILTERED_ORDERS_URL + "/null"
          );
          break;
      }
    } else if (User.type === 2) {
      switch (eventKey) {
        case "1":
          setUrl(process.env.REACT_APP_GET_DRIVER_ORDERS_URL);
          break;
        case "2":
          setUrl(
            process.env.REACT_APP_DRIVER_GET_FILTERED_ORDERS_URL + "/delivered"
          );
          break;
        case "3":
          setUrl(
            process.env.REACT_APP_DRIVER_GET_FILTERED_ORDERS_URL + "/picked"
          );
          break;
        case "4":
          setUrl(
            process.env.REACT_APP_DRIVER_GET_FILTERED_ORDERS_URL + "/null"
          );
          break;
      }
    }
    setUpdated(!updated);
    setOrders([]);
  };

  const fetchData = (url, options) => {
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData(url, options);
  }, [url, updated]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic" hidden>
        Filter Orders
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="1" onSelect={setURL}>
          All
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onSelect={setURL}>
          delivered
        </Dropdown.Item>

        <Dropdown.Item eventKey="3" onSelect={setURL}>
          picked
        </Dropdown.Item>

        <Dropdown.Item eventKey="4" onSelect={setURL}>
          with no status
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownMenu;
