import React, { useState } from "react";
import "../../style/Content.css";
import FirstContent from "../../img/FirstContent.png";
import SecondContent from "../../img/SecondContent.png";
import ThirdContent from "../../img/ThirdContent.png";
import ContentBrick from "../home/ContentBrick";

const Content = () => {
  const [Bricks, setBrick] = useState([
    {
      id: 1,
      headline: "We do more than delivery.",
      paragraph:
        "Stocking Your Restaurant Kitchen Finding Reliable Sellers Of Cookware In The Brick And Mortard World",
      image: FirstContent,
      left: false,
    },
    {
      id: 2,
      headline: "Fast Delivery with tracking.",
      paragraph:
        "Breast Augmentation Breast Enlargement Medical Tourism In The Philippine",
      image: SecondContent,
      left: true,
    },

    {
      id: 3,
      headline: "Stay at home we do it for you.",
      paragraph:
        "Planning Helps Make A Party Perfect Keep Dinner Simple Heat Frozen Vegetables And Precooked Smoked Sausage Together For A Complete Meal",
      image: ThirdContent,
      left: false,
    },
  ]);

  return (
    <div className="content">
      <h1 className="content__headline">How it works</h1>

      {Bricks.map((Brick) => (
        <ContentBrick
          key={Brick.id}
          headline={Brick.headline}
          paragraph={Brick.paragraph}
          image={Brick.image}
          left={Brick.left}
        />
      ))}
    </div>
  );
};

export default Content;
