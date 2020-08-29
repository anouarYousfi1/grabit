import React from "react";
import background from "../../img/grabit.jpg";
import "../../style/Background.css";

const Background = () => {
  return (
    <div className="background">
      <img src={background} alt="" />
      <div className="background__layout"></div>
    </div>
  );
};

export default Background;
