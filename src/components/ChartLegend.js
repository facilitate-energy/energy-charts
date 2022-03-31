import React from "react";
import { Row, Col } from "react-bootstrap";
import seriesTitles from "../specs/seriesTitles";

function ChartLegend({ seriesNames, colorScale, itemsPerRow = 4 }) {
  return (
    <Row xs="auto" style={{ maxWidth: 440 }}>
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
                {seriesTitles[seriesName] || seriesName}{" "}
              </span>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}

export default ChartLegend;
