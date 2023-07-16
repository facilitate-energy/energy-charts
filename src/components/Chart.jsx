import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryPortal,
  VictoryStack,
  VictoryTooltip
} from "victory";
import useFetch from "../hooks/useFetch";
import calculateDifference from "../utils/calculateDifference";
import normaliseData from "../utils/normaliseData";

function Chart(props) {
  const {
    selectedScenarios,
    chartName,
    showDifference,
    colorScale,
    seriesNames,
    seriesTitles,
    scenarioTitles,
    unit,
    fixedDomain,
    maxY,
    minY,
    xGridMarks,
    xGridValues = xGridMarks,
    basePath = "",
    cache,
    locale,
    xDomainPadding = 20,
    stackbarOffset = 20,
    chartWidth,
    padding,
    barWidth,
    widthScaling
  } = props;

  const barCount = selectedScenarios[1] ? (showDifference ? 1 : 2) : 1;

  const numberStyle = {
    maximumSignificantDigits: 3
  };

  const yearStyle = {
    useGrouping: false
  };

  const yGridStyle = {
    maximumSignificantDigits: 3,
    notation: "compact"
  };

  const formattedNumber = (number, locale, options) => {
    return Intl.NumberFormat(locale, options).format(number);
  };

  const chartDomain =
    showDifference || !fixedDomain ? null : { y: [minY, maxY] };

  const urls = selectedScenarios.map(
    (scenario) => scenario && `${basePath}/data/${scenario}/${chartName}.json`
  );

  let [mainScenarioDataLoading, mainScenarioData] = useFetch(urls[0], cache);
  let [compareScenarioDataLoading, compareScenarioData] = useFetch(
    urls[1],
    cache
  );

  if (!mainScenarioDataLoading) {
    mainScenarioData = normaliseData(
      mainScenarioData,
      selectedScenarios[0],
      seriesNames,
      xGridValues
    );
  }

  if (!compareScenarioDataLoading) {
    compareScenarioData = selectedScenarios[1]
      ? normaliseData(
          compareScenarioData,
          selectedScenarios[1],
          seriesNames,
          xGridValues
        )
      : null;
  }

  const chartData =
    !mainScenarioDataLoading && !compareScenarioDataLoading
      ? showDifference && selectedScenarios[1]
        ? [calculateDifference([mainScenarioData, compareScenarioData])]
        : [mainScenarioData, compareScenarioData]
      : [];

  const getTotal = (data, period) => {
    return data.reduce((total, currentSeries) => {
      return (
        total +
        currentSeries.seriesValues.find((values) => values[0] === period)[1]
      );
    }, 0);
  };

  return (
    <>
      <VictoryChart
        domainPadding={{ x: Math.round(xDomainPadding * widthScaling) }}
        domain={chartDomain}
        padding={padding}
        width={chartWidth}
        containerComponent={
          <VictoryContainer
            style={{
              touchAction: "auto"
            }}
          />
        }
      >
        <VictoryPortal>
          <VictoryAxis
            tickFormat={(t) => formattedNumber(t, locale, yearStyle)}
            tickValues={xGridMarks}
          />
        </VictoryPortal>
        <VictoryAxis
          tickFormat={(t) =>
            Math.abs(t) > 0.01
              ? formattedNumber(t, locale, yGridStyle)
              : formattedNumber(t, locale, {
                  ...yGridStyle,
                  notation: "scientific"
                })
          }
          dependentAxis
          label={unit}
          axisLabelComponent={<VictoryLabel y={35} x={30} angle={0} />}
        />
        {!mainScenarioDataLoading && !compareScenarioDataLoading && (
          <VictoryGroup offset={Math.round(stackbarOffset * widthScaling)}>
            {chartData.map(
              (scenario, idx) =>
                scenario && (
                  <VictoryStack key={idx}>
                    {scenario.data.map((series, idx) => (
                      <VictoryBar
                        key={idx}
                        barWidth={Math.round(
                          (barWidth / barCount) * widthScaling
                        )}
                        data={series.seriesValues}
                        labels={({ datum }) =>
                          `${
                            showDifference
                              ? ((scenarioTitles &&
                                  scenarioTitles[scenario.name[0]]) ||
                                  scenario.name[0]) +
                                  " - " +
                                  (scenarioTitles &&
                                    scenarioTitles[scenario.name[1]]) ||
                                scenario.name[1]
                              : (scenarioTitles &&
                                  scenarioTitles[scenario.name]) ||
                                scenario.name
                          }
                        ${formattedNumber(datum[0], locale, yearStyle)}
                        ${
                          (seriesTitles && seriesTitles[series.seriesName]) ||
                          series.seriesName
                        }: ${formattedNumber(
                          datum[1],
                          locale,
                          numberStyle
                        )} ${unit}
                        Total: ${formattedNumber(
                          getTotal(scenario.data, datum[0]),
                          locale,
                          numberStyle
                        )} ${unit}`
                        }
                        x={0}
                        y={1}
                        labelComponent={<VictoryTooltip />}
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
        )}
      </VictoryChart>
    </>
  );
}

export default Chart;
