import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import Field from "../Field";
import { StoreProvider } from "../../lib";

configure({ adapter: new Adapter() });

describe("Field/Boolean", () => {
  // {name: 'boolean', type: 'boolean', label: 'boolean', placeholder: 'boolean', required: true},
  it("snapshot testing", () => {
    const component = shallow(<Field name="boolean" type="boolean" />);
    const tree = shallowToJson(component);
    expect(tree).toMatchSnapshot();
  });

  // eslint-disable-next-line no-undef
  it("renders without crashing", () => {
    const wrapper = document.createElement("div");
    ReactDOM.render(
      <StoreProvider>
        <Field name="boolean" type="boolean" />
      </StoreProvider>,
      wrapper
    );
    ReactDOM.unmountComponentAtNode(wrapper);
  });

  it("boolean field should render without throwing an error", function () {
    const wrapper = mount(
      <StoreProvider>
        <Field name="boolean" type="boolean" />
      </StoreProvider>
    );
    expect(wrapper.find("input").length).toBe(1);
  });
});
