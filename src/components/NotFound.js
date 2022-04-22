import React from "react";
import { Row, Col } from "react-bootstrap";

function NotFound() {
  return (
    <Row className="Page notFound m-auto justify-content-center align-items-center h-100">
      <Col sm={10} md={8} lg={7} xl={6} xxl={5} className="text-center">
        <h1>Page Not Found</h1>
        <p>
          The content you were looking for could not be found. It might have
          been removed, renamed, or did not exist in the first place.
        </p>
      </Col>
    </Row>
  );
}

export default NotFound;
