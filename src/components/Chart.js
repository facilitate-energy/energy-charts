import React from "react";
import { VictoryBar } from "victory";
import useFetch from "../hooks/useFetch";

function Chart(props) {
  const { primaryScenario, chartName } = props;

  const data = useFetch(`/data/${primaryScenario}/${chartName}.json`);

  return (
    <>{data && <VictoryBar data={data.data[0].seriesValues} x={0} y={1} />}</>
  );
}

export default Chart;
