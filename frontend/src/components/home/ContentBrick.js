import React from "react";

const ContentBrick = (props) => {
  if (!props.left) {
    return (
      <div className="content__brick">
        <div className="content__brick--paragraph">
          <h1>{props.headline}</h1>
          <p>{props.paragraph}</p>
        </div>
        <img src={props.image} alt="" />
      </div>
    );
  } else {
    return (
      <div className="content__brick">
        <img src={props.image} alt="" />
        <div className="content__brick--paragraph">
          <h1>{props.headline}</h1>
          <p>{props.paragraph}</p>
        </div>
      </div>
    );
  }
};

export default ContentBrick;
