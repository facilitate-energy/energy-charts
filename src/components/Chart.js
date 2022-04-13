import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryPortal,
  VictoryStack,
  VictoryTooltip
} from "victory";
import useFetch from "../hooks/useFetch";
import calculateDifference from "../utils/calculateDifference";
import normaliseData from "../utils/normaliseData";

function Chart(props) {
  const {
    selectedScenarios,
    scenarioTitles,
    chartName,
    showDifference,
    colorScale,
    seriesNames,
    seriesTitles,
    unit,
    maxY,
    minY,
    xGridMarks,
    basePath,
    cache
  } = props;

  const chartDomain = showDifference ? null : { y: [minY, maxY] };

  const urls = selectedScenarios.map(
    (scenario) => scenario && `${basePath}/${scenario}/${chartName}.json`
  );

  let [mainScenarioDataLoading, mainScenarioData] = useFetch(urls[0], cache);
  let [compareScenarioDataLoading, compareScenarioData] = useFetch(
    urls[1],
    cache
  );

  if (!mainScenarioDataLoading) {
    mainScenarioData = normaliseData(
      mainScenarioData,
      selectedScenarios[0],
      seriesNames,
      xGridMarks
    );
  }

  if (!compareScenarioDataLoading) {
    compareScenarioData = normaliseData(
      compareScenarioData,
      selectedScenarios[1],
      seriesNames,
      xGridMarks
    );
  }

  const chartData =
    !mainScenarioDataLoading && !compareScenarioDataLoading
      ? showDifference && selectedScenarios[1]
        ? [calculateDifference([mainScenarioData, compareScenarioData])]
        : [mainScenarioData, compareScenarioData]
      : [];

  const getTotal = (data, period) => {
    return data.reduce((total, currentSeries) => {
      return (
        total +
        currentSeries.seriesValues.find((values) => values[0] === period)[1]
      );
    }, 0);
  };

  return (
    <>
      <VictoryChart
        domainPadding={{ x: 20 }}
        domain={chartDomain}
        containerComponent={
          <VictoryContainer
            style={{
              touchAction: "auto"
            }}
          />
        }
      >
        <VictoryPortal>
          <VictoryAxis
            tickFormat={(t) => t.toString()}
            tickValues={xGridMarks}
          />
        </VictoryPortal>
        <VictoryAxis
          dependentAxis
          label={unit}
          axisLabelComponent={<VictoryLabel y={35} x={30} angle={0} />}
        />
        {!mainScenarioDataLoading && !compareScenarioDataLoading && (
          <VictoryGroup offset={20}>
            {chartData.map(
              (scenario, idx) =>
                scenario && (
                  <VictoryStack key={idx}>
                    {scenario.data.map((series, idx) => (
                      <VictoryBar
                        key={idx}
                        data={series.seriesValues}
                        labels={({ datum }) =>
                          `${
                            showDifference
                              ? (scenarioTitles[scenario.name[0]] ||
                                  scenario.name[0]) +
                                  " - " +
                                  scenarioTitles[scenario.name[1]] ||
                                scenario.name[1]
                              : scenarioTitles[scenario.name] || scenario.name
                          }
                        ${datum[0]}
                        ${
                          seriesTitles[series.seriesName] || series.seriesName
                        }: ${datum[1]} ${unit}
                        Total: ${getTotal(scenario.data, datum[0])} ${unit}`
                        }
                        x={0}
                        y={1}
                        labelComponent={<VictoryTooltip />}
                        style={{
                          data: {
                            fill: colorScale[
                              seriesNames.indexOf(series.seriesName)
                            ]
                          }
                        }}
                      />
                    ))}
                  </VictoryStack>
                )
            )}
          </VictoryGroup>
        )}
      </VictoryChart>
    </>
  );
}

export default Chart;
