import React, { Suspense } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { EmptyChart, ChartLegend } from "../components";
import chartsInfo from "../specs/chartsInfo";

const Chart = React.lazy(() => import("./Chart"));

function Charts(props) {
  return (
    <Row
      xs={"auto"}
      className="charts g-2 m-sm-3 justify-content-center justify-content-md-start"
    >
      {props.charts.map((chart, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Header>{chart}</Card.Header>
            <Suspense fallback={<EmptyChart {...chartsInfo[chart]} />}>
              <Chart
                chartName={chart}
                selectedScenarios={props.selectedScenarios}
                showDifference={props.showDifference}
                {...chartsInfo[chart]}
              />
            </Suspense>
            <Card.Footer>
              <ChartLegend {...chartsInfo[chart]} />
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Charts;
