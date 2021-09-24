import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryBar,
  VictoryStack,
  VictoryGroup
} from "victory";
import useFetch from "../hooks/useFetch";

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

  const getDataPath = (scenario, chart) => {
    if (scenario && chart) {
      return `/data/${scenario}/${chart}.json`;
    } else {
      return "";
    }
  };

  const mainScenarioData = useFetch(
    getDataPath(selectedScenarios[0], chartName)
  );
  const compareScenarioData = useFetch(
    getDataPath(selectedScenarios[1], chartName)
  );

  const calculateDifference = (data) => {
    return [data[0]];
  };

  const chartData = showDifference
    ? calculateDifference([mainScenarioData, compareScenarioData])
    : [mainScenarioData, compareScenarioData];

  return (
    <>
      <VictoryChart domainPadding={{ x: 20 }} domain={{ y: [minY, maxY] }}>
        <VictoryAxis tickFormat={(t) => t.toString()} tickValues={xGridMarks} />
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
                      x={0}
                      y={1}
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
