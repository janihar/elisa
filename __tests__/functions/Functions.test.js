import React from "react";
import renderer from "react-test-renderer";
import { dateFormat } from "../../src/Functions/MapFunctions";
import { isNumber, checkURL } from "../../src/Functions/Functions";

describe("Function testing", () => {
  //JavaScript counts months from 0 to 11.
  //January is 0. December is 11
  it("Right date format", () => {
    expect(dateFormat(new Date(2020, 1, 19))).toBe("2020-02-19");
  });
  it("Is really number", () => {
    expect(isNumber(2)).toBe(true);
    expect(isNumber("test")).toBe(false);
  });
  it("Is valid URL", () => {
    let validURL = "https://rata.digitraffic.fi/api/";
    let invalidURL = "https://ratas.digitrsdavbic.fi/api/";
    expect(checkURL(validURL)).toBe(validURL);
    expect(checkURL(invalidURL)).toBe(false);
  });
});
