import React from "react";
import { Col, Row } from "react-bootstrap";

function FooterCredits(props) {
  return (
    <Row>
      <Col className="text-center">
        <small className="text-muted">
          {"Designed by "}
          <a
            href="https://facilitate.energy"
            className="text-reset text-decoration-none"
          >
            Facilitate Energy
          </a>
        </small>
      </Col>
    </Row>
  );
}

export default FooterCredits;
