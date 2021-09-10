import React, { Suspense } from "react";
import { Card, Col, Row } from "react-bootstrap";

const Chart = React.lazy(() => import("./Chart"));

function Charts(props) {
  return (
    <Row>
      {props.charts.map((chart, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Header>{chart}</Card.Header>
            <Suspense fallback={<div>Loading...</div>}>
              <Chart chartName={chart} primaryScenario="Scenario 1" />
            </Suspense>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Charts;
