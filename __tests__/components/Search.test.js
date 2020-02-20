import React from "react";
import renderer from "react-test-renderer";
import Search from "../../src/Search";

describe("<Search />", () => {
  testFunction = () => {
    return "test";
  };

  it("renders correctly", () => {
    const tree = renderer.create(<Search fetchTrain={testFunction} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
