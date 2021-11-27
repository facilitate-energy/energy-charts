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
    chartName,
    showDifference,
    colorScale,
    seriesNames,
    unit,
    maxY,
    minY,
    xGridMarks
  } = props;

  const chartDomain = showDifference ? null : { y: [minY, maxY] };

  const urls = selectedScenarios.map(
    (scenario) => scenario && `/data/${scenario}/${chartName}.json`
  );

  let mainScenarioData = useFetch(urls[0]);
  let compareScenarioData = useFetch(urls[1]);

  mainScenarioData = normaliseData(
    mainScenarioData,
    selectedScenarios[0],
    seriesNames,
    xGridMarks
  );

  compareScenarioData = normaliseData(
    compareScenarioData,
    selectedScenarios[1],
    seriesNames,
    xGridMarks
  );

  const chartData =
    showDifference && selectedScenarios[1]
      ? [calculateDifference([mainScenarioData, compareScenarioData])]
      : [mainScenarioData, compareScenarioData];

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
                            ? scenario.name[0] + " - " + scenario.name[1]
                            : scenario.name
                        }
                        ${datum[0]}
                        ${series.seriesName}: ${datum[1]} ${unit}
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
      </VictoryChart>
    </>
  );
}

export default Chart;
