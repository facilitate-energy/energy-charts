function normaliseData(data, scenarioName, seriesNames, periods) {
  if (data === null && scenarioName) {
    return {
      name: scenarioName,
      data: seriesNames.map((seriesName) => {
        return {
          seriesName: seriesName,
          seriesValues: periods.map((period) => [period, 0])
        };
      })
    };
  } else if (data !== null && scenarioName) {
    return {
      name: scenarioName,
      data: seriesNames.map((seriesName) => {
        return {
          seriesName: seriesName,
          seriesValues: periods.map((period) => {
            const series = data.data.find(
              (series) => series.seriesName === seriesName
            );
            let periodValue;
            if (typeof series === "undefined") {
              periodValue = 0;
            } else {
              const seriesValue = series.seriesValues.find(
                (seriesValue) => seriesValue[0] === period
              );
              if (typeof seriesValue === "undefined") {
                periodValue = 0;
              } else {
                periodValue = seriesValue[1];
              }
            }
            return [period, periodValue];
          })
        };
      })
    };
  } else {
    return data;
  }
}

export default normaliseData;
