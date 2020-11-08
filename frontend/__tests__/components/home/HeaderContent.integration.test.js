import React from "react";
import { render as reacRender } from "@testing-library/react";
import { mount } from "enzyme";
import "@testing-library/jest-dom/extend-expect";

import HeaderContent from "../../../src/components/home/HeaderContent";
import Header from "../../../src/components/home/Header";
import { BrowserRouter } from "react-router-dom";
import SignUpButton from "../../../src/components/home/SignUpButton";

import { SignupContext } from "../../../src/contexts/SignupContext";
import { faBiking, faUser } from "@fortawesome/free-solid-svg-icons";

describe("HeaderContent component", () => {
  const Signups = [
    {
      id: 1,
      icon: faBiking,
      headline: "Sign up as a Driver",
      class: "HeaderContent__signup--driver",
      link: "/signup/driver",
      strong: true,
    },
    {
      id: 2,
      icon: faUser,
      headline: "Sign up as a Customer",
      class: "HeaderContent__signup--customer",
      link: "/signup/customer",
      strong: true,
    },
  ];

  const wrapper = mount(
    <SignupContext.Provider value={[Signups]}>
      <BrowserRouter>
        <HeaderContent />
      </BrowserRouter>
    </SignupContext.Provider>
  );

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("has Header component as a child", () => {
    expect(wrapper.find(Header)).toBeTruthy();
  });

  it("renders the headline", () => {
    expect(wrapper.find(".HeaderContent__headline").text()).toBe(
      "we deliver it to your door within one hour"
    );
  });

  it("renders 2 SignUpButton child components", () => {
    expect(wrapper.find(SignUpButton).length).toEqual(2);
  });
});
