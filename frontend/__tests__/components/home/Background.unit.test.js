import React from "react";
import { shallow, render } from "enzyme";
import { render as reactRender } from "@testing-library/react";
import renderer from "react-test-renderer";
import Background from "../../../src/components/home/Background";
import "@testing-library/jest-dom/extend-expect";
import background from "../../img/grabit.jpg";

describe("Home Background component", () => {
  const wrapper = shallow(<Background />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("Background image", () => {
    it("is loaded", () => {
      expect(wrapper.find("img").prop("src")).toBe(background);
    });
  });
});
