import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import getOrderState from "../../js/OrderStatusController";

const SelectOptions = (props) => {
  useEffect(() => {
    getOrderState(props.status);
  });

  return (
    <Form>
      <Form.Group controlId="select__form">
        <Form.Control
          as="select"
          custom
          onChange={props.setOrderState.bind(this)}
          disabled
        >
          <option></option>
          <option>picked</option>
          <option>delivered</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default SelectOptions;
