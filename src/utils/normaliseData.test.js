import { describe, test, expect } from "vitest";
import normaliseData from "./normaliseData";

describe("normaliseData", () => {
  const seriesNames = ["Series A", "Series B"];
  const periods = [2020, 2025, 2030];

  test("returns zeroed data when data is null and scenarioName is provided", () => {
    const result = normaliseData(null, "Scenario 1", seriesNames, periods);
    expect(result.name).toBe("Scenario 1");
    expect(result.data).toHaveLength(2);
    result.data.forEach((series) => {
      series.seriesValues.forEach(([, value]) => {
        expect(value).toBe(0);
      });
    });
  });

  test("zero-fill uses correct period values as x-axis keys", () => {
    const result = normaliseData(null, "Scenario 1", seriesNames, periods);
    const xValues = result.data[0].seriesValues.map(([x]) => x);
    expect(xValues).toEqual(periods);
  });

  test("returns normalised data when data and scenarioName are provided", () => {
    const rawData = {
      data: [
        {
          seriesName: "Series A",
          seriesValues: [
            [2020, 5],
            [2025, 10],
            [2030, 15]
          ]
        },
        {
          seriesName: "Series B",
          seriesValues: [
            [2020, 1],
            [2025, 2],
            [2030, 3]
          ]
        }
      ]
    };
    const result = normaliseData(rawData, "Scenario 1", seriesNames, periods);
    expect(result.name).toBe("Scenario 1");
    expect(result.data[0].seriesName).toBe("Series A");
    expect(result.data[0].seriesValues).toEqual([
      [2020, 5],
      [2025, 10],
      [2030, 15]
    ]);
    expect(result.data[1].seriesValues).toEqual([
      [2020, 1],
      [2025, 2],
      [2030, 3]
    ]);
  });

  test("fills missing series with zeros when series is absent in data", () => {
    const rawData = {
      data: [
        {
          seriesName: "Series A",
          seriesValues: [
            [2020, 7],
            [2025, 8],
            [2030, 9]
          ]
        }
        // Series B is missing
      ]
    };
    const result = normaliseData(rawData, "Scenario 1", seriesNames, periods);
    const seriesB = result.data.find((d) => d.seriesName === "Series B");
    seriesB.seriesValues.forEach(([, value]) => {
      expect(value).toBe(0);
    });
  });

  test("fills missing periods with zeros when period is absent in series", () => {
    const rawData = {
      data: [
        {
          seriesName: "Series A",
          seriesValues: [
            [2020, 3]
            // 2025 and 2030 are missing
          ]
        }
      ]
    };
    const result = normaliseData(rawData, "Scenario 1", ["Series A"], periods);
    const seriesA = result.data[0];
    const value2025 = seriesA.seriesValues.find(([x]) => x === 2025)[1];
    const value2030 = seriesA.seriesValues.find(([x]) => x === 2030)[1];
    expect(value2025).toBe(0);
    expect(value2030).toBe(0);
  });

  test("returns data unchanged when scenarioName is falsy", () => {
    const rawData = { data: [] };
    const result = normaliseData(rawData, null, seriesNames, periods);
    expect(result).toBe(rawData);
  });

  test("includes correct seriesNames in output", () => {
    const result = normaliseData(null, "Scenario 1", seriesNames, periods);
    const names = result.data.map((d) => d.seriesName);
    expect(names).toEqual(seriesNames);
  });
});
