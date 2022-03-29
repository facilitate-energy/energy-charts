import React from "react";
import { VictoryLegend } from "victory";
import seriesTitles from "../specs/seriesTitles";

function ChartLegend({
  seriesNames,
  colorScale,
  itemsPerRow = 4,
  height = 60
}) {
  return (
    <>
      <VictoryLegend
        orientation="horizontal"
        data={seriesNames.map((seriesName) => ({
          name: seriesTitles[seriesName] || seriesName
        }))}
        itemsPerRow={itemsPerRow}
        height={height}
        gutter={25}
        colorScale={colorScale}
      />
    </>
  );
}

export default ChartLegend;
