import React from "react";
import { Col } from "react-bootstrap";
import { Menu } from "../components";

function Sidebar(props) {
  return (
    <Col as="aside" md="auto" className="p-3 d-none d-md-block">
      <Menu {...props} />
    </Col>
  );
}

export default Sidebar;
