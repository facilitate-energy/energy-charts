import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryBar,
  VictoryStack
} from "victory";
import useFetch from "../hooks/useFetch";

function Chart(props) {
  const {
    primaryScenario,
    chartName,
    colorScale,
    seriesNames,
    unit,
    maxY,
    minY
  } = props;

  let chartData = useFetch(`/data/${primaryScenario}/${chartName}.json`);

  return (
    <>
      <VictoryChart domainPadding={{ x: 20 }} domain={{ y: [minY, maxY] }}>
        <VictoryAxis tickFormat={(t) => t.toString()} />
        <VictoryAxis
          dependentAxis
          label={unit}
          axisLabelComponent={<VictoryLabel y={35} x={30} angle={0} />}
        />
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
