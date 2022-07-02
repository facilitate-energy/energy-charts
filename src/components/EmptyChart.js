import React from "react";
import { VictoryChart, VictoryAxis, VictoryLabel } from "victory";

function EmptyChart(props) {
  const { unit, maxY, minY, xGridMarks, chartWidth } = props;

  return (
    <>
      <VictoryChart
        width={chartWidth}
        domainPadding={{ x: 20 }}
        domain={{ y: [minY, maxY] }}
      >
        <VictoryAxis tickFormat={(t) => t.toString()} tickValues={xGridMarks} />
        <VictoryAxis
          dependentAxis
          label={unit}
          axisLabelComponent={<VictoryLabel y={35} x={30} angle={0} />}
        />
      </VictoryChart>
    </>
  );
}

export default EmptyChart;
