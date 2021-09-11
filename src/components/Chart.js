import React from "react";
import { VictoryChart, VictoryBar, VictoryStack, VictoryLegend } from "victory";
import useFetch from "../hooks/useFetch";

function Chart(props) {
  const { primaryScenario, chartName } = props;

  let chartData = useFetch(`/data/${primaryScenario}/${chartName}.json`);

  return (
    <>
      <VictoryChart>
        {chartData && (
          <VictoryStack colorScale="qualitative">
            {chartData.data.map((series, idx) => (
              <VictoryBar key={idx} data={series.seriesValues} x={0} y={1} />
            ))}
          </VictoryStack>
        )}
      </VictoryChart>
    </>
  );
}

export default Chart;
