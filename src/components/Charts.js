import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import useMediaQuery from "../hooks/useMediaQuery";
import { Chart, ChartLegend } from "../components";

function Charts(props) {
  const {
    charts,
    chartsInfo,
    chartsTitles,
    seriesTitles,
    maxChartWidth = 450
  } = props;

  let applyMaxChartWidth = useMediaQuery(`(min-width: ${maxChartWidth}px)`);

  const chartWidth = applyMaxChartWidth ? maxChartWidth : 450;

  return (
    <Row
      xs={"auto"}
      className="charts py-2 justify-content-center justify-content-md-start"
    >
      {charts.map((chart, idx) => (
        <Col className="p-2" key={idx}>
          <Card style={{ maxWidth: chartWidth }}>
            <Card.Header>
              {(chartsTitles && chartsTitles[chart]) || chart}
            </Card.Header>
            <Chart
              chartName={chart}
              {...props}
              {...chartsInfo[chart]}
              chartWidth={chartWidth}
            />
            <Card.Footer>
              <ChartLegend {...chartsInfo[chart]} seriesTitles={seriesTitles} />
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Charts;
