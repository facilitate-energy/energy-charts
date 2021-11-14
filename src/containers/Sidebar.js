import React from "react";
import { Col, Container } from "react-bootstrap";
import { Menu } from "../components";

function Sidebar(props) {
  return (
    <Col as="aside" md="auto" className="p-3 d-none d-md-block">
      <Container fluid className="sticky-top">
        <Menu {...props} />
      </Container>
    </Col>
  );
}

export default Sidebar;
