import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import getOrderState from "../../js/OrderStatusController";

const SelectOptions = (props) => {
  useEffect(() => {
    console.log(props.status, props.index);
    getOrderState(props.status, props.index);
  });

  return (
    <Form>
      <Form.Group
        controlId={"select__form__" + props.index}
        className="select__form"
      >
        <Form.Control
          as="select"
          custom
          onChange={props.setOrderState.bind(this)}
          disabled={props.disabled}
        >
          <option></option>
          <option>accepted</option>
          <option>picked</option>
          <option>delivered</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default SelectOptions;
