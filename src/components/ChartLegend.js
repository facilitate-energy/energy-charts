import React from "react";
import { VictoryLegend } from "victory";

function ChartLegend({ seriesNames, colorScale }) {
  return (
    <>
      <VictoryLegend
        orientation="horizontal"
        data={seriesNames.map((seriesName) => ({
          name: seriesName
        }))}
        itemsPerRow={5}
        height={60}
        colorScale={colorScale}
      />
    </>
  );
}

export default ChartLegend;
