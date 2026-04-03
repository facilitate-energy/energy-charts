import { describe, test, expect } from "vitest";
import calculateDifference from "./calculateDifference";

describe("calculateDifference", () => {
  const makeScenario = (name, seriesValues1, seriesValues2) => ({
    name,
    data: [
      { seriesName: "Series A", seriesValues: seriesValues1 },
      { seriesName: "Series B", seriesValues: seriesValues2 }
    ]
  });

  test("returns combined name from both scenarios", () => {
    const data = [
      makeScenario("Scenario 1", [[2020, 5]], [[2020, 1]]),
      makeScenario("Scenario 2", [[2020, 3]], [[2020, 1]])
    ];
    const result = calculateDifference(data);
    expect(result.name).toEqual(["Scenario 1", "Scenario 2"]);
  });

  test("computes element-wise difference for each series", () => {
    const data = [
      makeScenario(
        "Scenario 1",
        [
          [2020, 10],
          [2025, 20]
        ],
        [
          [2020, 4],
          [2025, 8]
        ]
      ),
      makeScenario(
        "Scenario 2",
        [
          [2020, 3],
          [2025, 5]
        ],
        [
          [2020, 1],
          [2025, 2]
        ]
      )
    ];
    const result = calculateDifference(data);

    expect(result.data[0].seriesName).toBe("Series A");
    expect(result.data[0].seriesValues).toEqual([
      [2020, 7],
      [2025, 15]
    ]);

    expect(result.data[1].seriesName).toBe("Series B");
    expect(result.data[1].seriesValues).toEqual([
      [2020, 3],
      [2025, 6]
    ]);
  });

  test("returns zero difference when both scenarios are identical", () => {
    const values = [
      [2020, 5],
      [2030, 10]
    ];
    const data = [
      makeScenario("Scenario 1", values, values),
      makeScenario("Scenario 2", values, values)
    ];
    const result = calculateDifference(data);
    result.data.forEach((series) => {
      series.seriesValues.forEach(([, v]) => expect(v).toBe(0));
    });
  });

  test("handles negative differences correctly", () => {
    const data = [
      makeScenario("Scenario 1", [[2020, 2]], [[2020, 1]]),
      makeScenario("Scenario 2", [[2020, 5]], [[2020, 1]])
    ];
    const result = calculateDifference(data);
    expect(result.data[0].seriesValues[0][1]).toBe(-3);
  });

  test("preserves x-axis (period) values unchanged", () => {
    const data = [
      makeScenario("A", [[2020, 10]], [[2020, 5]]),
      makeScenario("B", [[2020, 3]], [[2020, 2]])
    ];
    const result = calculateDifference(data);
    expect(result.data[0].seriesValues[0][0]).toBe(2020);
  });
});
