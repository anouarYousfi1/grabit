import React from "react";
import { render as reactRender } from "@testing-library/react";
import { render, mount } from "enzyme";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import Content from "../../../src/components/home/Content";
import ContentBrick from "../../../src/components/home/ContentBrick";

describe("Content component", () => {
  const wrapper = mount(<Content />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a header", () => {
    expect(wrapper.find(".content__headline").text()).toBe("How it works");
  });

  it("renders 3 ContentBrick child components", () => {
    expect(wrapper.find(ContentBrick)).toHaveLength(3);
  });

  it("renders the headline `we do more then delivery` in the begining ", () => {
    expect(wrapper.find(ContentBrick).at(0).prop("headline")).toEqual(
      "We do more than delivery."
    );
  });
});
