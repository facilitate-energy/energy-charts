import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Chart, ChartLegend } from "../components";

function Charts(props) {
  const {
    charts,
    chartsInfo,
    chartsTitles,
    seriesTitles,
    maxChartWidth = 440
  } = props;

  return (
    <Row
      xs={"auto"}
      className="charts py-2 justify-content-center justify-content-md-start"
    >
      {charts.map((chart, idx) => (
        <Col className="p-2" key={idx}>
          <Card style={{ maxWidth: maxChartWidth }}>
            <Card.Header>
              {(chartsTitles && chartsTitles[chart]) || chart}
            </Card.Header>
            <Chart chartName={chart} {...props} {...chartsInfo[chart]} />
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
