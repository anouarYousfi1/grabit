import React, { useContext } from "react";
import Map from "../common/Map";
import { orderContext } from "../../contexts/OrderContext";

const AssestMap = () => {
  const [Order, setOrder] = useContext(orderContext);

  return (
    <div className="assist__container--content--data--map">
      <Map
        key={Order.id}
        source={Order.source}
        destination={Order.destination}
      />
    </div>
  );
};

export default AssestMap;
