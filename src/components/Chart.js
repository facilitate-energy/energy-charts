import React from "react";
import { VictoryChart, VictoryBar, VictoryStack, VictoryLegend } from "victory";
import useFetch from "../hooks/useFetch";

function Chart(props) {
  const { primaryScenario, chartName } = props;

  let chartData = useFetch(`/data/${primaryScenario}/${chartName}.json`);

  const colorScale = {
    "Series 1": "#00429d",
    "Series 2": "#4771b2",
    "Series 3": "#73a2c6",
    "Series 4": "#a5d5d8",
    "Series 5": "#ffbcaf",
    "Series 6": "#f4777f",
    "Series 7": "#cf3759",
    "Series 8": "#93003a"
  };

  const seriesNames = [
    "Series 1",
    "Series 2",
    "Series 3",
    "Series 4",
    "Series 5",
    "Series 6",
    "Series 7",
    "Series 8"
  ];

  const colors = [
    "#00429d",
    "#4771b2",
    "#73a2c6",
    "#a5d5d8",
    "#ffbcaf",
    "#f4777f",
    "#cf3759",
    "#93003a"
  ];

  return (
    <>
      <VictoryChart height={400} width={450}>
        <VictoryLegend
          orientation="horizontal"
          data={seriesNames.map((seriesName) => ({
            name: seriesName
          }))}
          colorScale={colors}
        />
        {chartData && (
          <VictoryStack>
            {chartData.data.map((series, idx) => (
              <VictoryBar
                key={idx}
                data={series.seriesValues}
                x={0}
                y={1}
                style={{ data: { fill: colorScale[series.seriesName] } }}
              />
            ))}
          </VictoryStack>
        )}
      </VictoryChart>
    </>
  );
}

export default Chart;
