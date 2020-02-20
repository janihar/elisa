import React from "react";
import renderer from "react-test-renderer";
import TrainScreen from "../../src/TrainScreen";

describe("<TrainScreen /> ", () => {

  it("renders correctly", () => {
    const tree = renderer.create(<TrainScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});