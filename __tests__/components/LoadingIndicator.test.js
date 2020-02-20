import React from "react";
import renderer from "react-test-renderer";
import LoadingIndicator from "../../src/LoadingIndicator";

describe("<LoadingIndicator text={test}/>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LoadingIndicator test={"test"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
