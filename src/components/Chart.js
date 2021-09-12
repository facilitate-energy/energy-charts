import React from "react";
import { VictoryChart, VictoryBar, VictoryStack } from "victory";
import useFetch from "../hooks/useFetch";

function Chart(props) {
  const { primaryScenario, chartName, colorScale, seriesNames } = props;

  let chartData = useFetch(`/data/${primaryScenario}/${chartName}.json`);

  return (
    <>
      <VictoryChart height={400} width={450}>
        {chartData && (
          <VictoryStack>
            {chartData.data.map((series, idx) => (
              <VictoryBar
                key={idx}
                data={series.seriesValues}
                x={0}
                y={1}
                style={{
                  data: {
                    fill: colorScale[seriesNames.indexOf(series.seriesName)]
                  }
                }}
              />
            ))}
          </VictoryStack>
        )}
      </VictoryChart>
    </>
  );
}

export default Chart;
