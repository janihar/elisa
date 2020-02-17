import React from "react";
import renderer from "react-test-renderer";

import TrainItem from "../../src/TrainItem";

describe("<Trainitem {props}/>", () => {
    const trainNumber = 211
  it("renders correctly", () => {
    const tree = renderer.create(<TrainItem trainNumber={trainNumber} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
