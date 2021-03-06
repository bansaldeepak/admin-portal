import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import Field from "../Field";
import { StoreProvider } from "../../lib";

configure({ adapter: new Adapter() });

describe("Field/Autocomplete", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });
  // {
  //   name: 'autocomplete', type: 'autocomplete', label: 'Autocomplete with dynamic list', required: true, options: (async (brandData) => {
  //     if (brandData) {
  //       const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
  //       await sleep(1e3); // For demo purposes.
  //       const countries = await response.json();
  //       const formattedResponse = Object.keys(countries).map((key) => countries[key].item[0]);
  //       const results = formattedResponse.filter((obj) => {
  //         return Object.keys(obj).reduce((acc, curr) => {
  //           return acc || obj[curr].toLowerCase().includes(brandData);
  //         }, false);
  //       });
  //       return results;
  //     }

  //     return [];
  //   }), optionKey: 'country', optionValue: 'name'
  // },
  it("snapshot testing", () => {
    const component = shallow(
      <Field name="autocomplete" type="autocomplete" />
    );
    const tree = shallowToJson(component);
    expect(tree).toMatchSnapshot();
  });

  // eslint-disable-next-line no-undef
  it("renders without crashing", () => {
    const wrapper = document.createElement("div");
    ReactDOM.render(
      <StoreProvider>
        <Field name="autocomplete" type="autocomplete" />
      </StoreProvider>,
      wrapper
    );
    ReactDOM.unmountComponentAtNode(wrapper);
  });

  it("autocomplete field should render without throwing an error", function () {
    const wrapper = mount(
      <StoreProvider>
        <Field name="autocomplete" type="autocomplete" />
      </StoreProvider>
    );
    expect(wrapper.find("input").length).toBe(1);
  });

  it("autocomplete onchange", function () {
    const wrapper = mount(
      <StoreProvider>
        <Field
          name="autocomplete"
          type="autocomplete"
          options={["Opt1", "Opt2", "Opt3", "Opt4", "Opt5"]}
        />
      </StoreProvider>,
      { attachTo: document.body }
    );

    expect(wrapper.find("input").length).toBe(1);
    const autocomplete = wrapper.find("input").at(0);
    autocomplete.simulate("change", { target: { value: "opt" } });

    console.log(
      "MuiAutocomplete-popper",
      wrapper.find(".MuiAutocomplete-popper").length
    );
    console.log(
      "MuiAutocomplete-option",
      wrapper.find(".MuiAutocomplete-option").length
    );
    console.log(
      "MuiAutocomplete-option",
      document.getElementsByClassName("MuiAutocomplete-option").length
    );
    // expect(setState).toHaveBeenCalledWith("Checkbox 1");
    // expect(setState).toHaveBeenCalledTimes(2);
  });
});
