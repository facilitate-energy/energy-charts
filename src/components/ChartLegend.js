import React from "react";
import { VictoryLegend } from "victory";
import seriesTitles from "../specs/seriesTitles";

function ChartLegend({ seriesNames, colorScale }) {
  return (
    <>
      <VictoryLegend
        orientation="horizontal"
        data={seriesNames.map((seriesName) => ({
          name: seriesTitles[seriesName] ? seriesTitles[seriesName] : seriesName
        }))}
        itemsPerRow={4}
        height={60}
        gutter={30}
        colorScale={colorScale}
      />
    </>
  );
}

export default ChartLegend;
