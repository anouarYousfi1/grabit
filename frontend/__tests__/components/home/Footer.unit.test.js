import React from "react";
import { render as reactRender } from "@testing-library/react";
import { shallow, render } from "enzyme";

import "@testing-library/jest-dom/extend-expect";
import Footer from "../../../src/components/home/Footer";
import { Link } from "react-router-dom";

describe("Footer component", () => {
  const wrapper = shallow(<Footer />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("has 3 links", () => {
    expect(wrapper.find(Link).length).toEqual(3);
  });
});
