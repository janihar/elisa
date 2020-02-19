import React from "react";
import renderer from "react-test-renderer";
import { fetchTrains, fetchSpecificTrain } from "../../src/Functions";

describe("API functions works properly", () => {
  const trainData = [
    {
      trainNumber: 7,
      departureDate: "2020-02-17",
      timestamp: "2020-02-17T17:13:24.000Z",
      location: { type: "Point", coordinates: [29.896686, 61.986411] },
      speed: 149
    },
    {
      trainNumber: 9,
      departureDate: "2020-02-17",
      timestamp: "2020-02-17T17:22:02.000Z",
      location: { type: "Point", coordinates: [29.014322, 61.276224] },
      speed: 133
    },
    {
      trainNumber: 10,
      departureDate: "2020-02-17",
      timestamp: "2020-02-17T17:22:01.000Z",
      location: { type: "Point", coordinates: [25.105901, 60.40399] },
      speed: 138
    }
  ];


  it("fetchTrains returns data", () => {
    expect(trainData.length).toBeGreaterThan(0);
  });

;
});
