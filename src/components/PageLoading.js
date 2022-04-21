import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";

function PageLoading() {
  return (
    <Row xs={1} className="text-center m-auto">
      <Col>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
      <Col>
        <h3>Loading...</h3>
      </Col>
    </Row>
  );
}

export default PageLoading;
