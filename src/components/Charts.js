import React, { Suspense } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ChartLegend from "./ChartLegend";
import EmptyChart from "./EmptyChart";
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
            <Suspense fallback={<EmptyChart />}>
              <Chart
                chartName={chart}
                primaryScenario={props.selectedScenario}
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
