import React from "react";
import { shallow, render } from "enzyme";
import { render as reactRender } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import ContentBrick from "../../../src/components/home/ContentBrick";

describe("Content Brick component", () => {
  const wrapper = shallow(<ContentBrick left={false} />);
  const leftwrapper = shallow(<ContentBrick left={true} />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the image to the right when left prop is false", () => {
    expect(
      wrapper
        .children()
        .last()
        .matchesElement(<img />)
    ).toBe(true);
  });

  it("renders the image to the left when left prop is true", () => {
    expect(
      leftwrapper
        .children()
        .first()
        .matchesElement(<img />)
    ).toBe(true);
  });
});
