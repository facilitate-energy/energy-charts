import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Chart, ChartLegend } from "../components";
import chartsInfo from "../specs/chartsInfo";
import chartsTitles from "../specs/chartsTitles";

function Charts(props) {
  return (
    <Row
      xs={"auto"}
      className="charts py-2 justify-content-center justify-content-md-start"
    >
      {props.charts.map((chart, idx) => (
        <Col className="p-2" key={idx}>
          <Card>
            <Card.Header>
              {chartsTitles[chart] ? chartsTitles[chart] : chart}
            </Card.Header>
            <Chart
              chartName={chart}
              selectedScenarios={props.selectedScenarios}
              showDifference={props.showDifference}
              {...chartsInfo[chart]}
            />
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
