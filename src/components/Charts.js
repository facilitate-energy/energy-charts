import React from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { Chart, ChartLegend } from "../components";
import chartsInfo from "../specs/chartsInfo";
import chartsTitles from "../specs/chartsTitles";

function Charts(props) {
  let { chartsId } = useParams;
  console.log(chartsId);

  return (
    <Row
      xs={"auto"}
      className="charts py-2 justify-content-center justify-content-md-start"
    >
      {props.charts.map((chart, idx) => (
        <Col className="p-2" key={idx}>
          <Card>
            <Card.Header>{chartsTitles[chart] || chart}</Card.Header>
            <Chart chartName={chart} {...props} {...chartsInfo[chart]} />
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
