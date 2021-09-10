import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Chart from "./Chart";

function Charts(props) {
  return (
    <Row>
      {props.charts.map((chart, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Header>{chart}</Card.Header>
            <Chart chartName={chart} primaryScenario="Scenario 1" />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Charts;
