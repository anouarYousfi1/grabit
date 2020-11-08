import React from "react";
import { shallow, render as enzymeRender } from "enzyme";
import { render as reactRender } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import Header from "../../../src/components/home/Header";
import { Link, BrowserRouter } from "react-router-dom";
import Logo from "../../../src/img/grabit.svg";

describe("Header component", () => {
  const wrapper = shallow(<Header />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders two links", () => {
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.find(Link).length).toEqual(2);
  });

  it("renders the logo", () => {
    expect(wrapper.childAt(1).find("img").prop("src")).toEqual(Logo);
  });

  it("renders the button", () => {
    expect(wrapper.childAt(0).find("div").text()).toBe("Sign in");
  });
});
