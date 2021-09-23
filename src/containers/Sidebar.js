import React from "react";
import { Col } from "react-bootstrap";
import { Menu } from "../components";

function Sidebar(props) {
  return (
    <Col as="aside">
      <Menu {...props} />
    </Col>
  );
}

export default Sidebar;
