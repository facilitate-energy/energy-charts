import React from "react";
import { Row, Col } from "react-bootstrap";

function ChartLegend(props) {
  const { seriesNames, seriesTitles, colorScale } = props;

  return (
    <Row xs="auto">
      {seriesNames.map((seriesName, idx) => (
        <Col className="chart-legend" key={idx}>
          <Row xs={2} className="align-items-center">
            <Col xs="auto">
              <div
                className="colour"
                style={{
                  backgroundColor: colorScale[idx],
                  borderRadius: "50%",
                  width: 12,
                  height: 12,
                  left: 0,
                  top: 0
                }}
              />
            </Col>
            <Col xs="auto" className="ps-0">
              <span
                style={{
                  fontFamily: "Gill Sans, Seravek, Trebuchet MS, sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal"
                }}
              >
                {" "}
                {(seriesTitles && seriesTitles[seriesName]) || seriesName}{" "}
              </span>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}

export default ChartLegend;
