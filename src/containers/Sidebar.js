import React from "react";
import { Col } from "react-bootstrap";
import Menu from "../components/Menu";

function Sidebar(props) {
  return (
    <Col as="aside">
      <Menu {...props} />
    </Col>
  );
}

export default Sidebar;
