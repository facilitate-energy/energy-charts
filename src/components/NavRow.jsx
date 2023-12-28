import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Row } from "react-bootstrap";

function NavRow(props) {
  const { navLinks, variant } = props;

  return (
    <Row>
      <Nav as="nav" variant={variant}>
        {navLinks.map((navLink, index) => (
          <NavLink className="nav-link text-nowrap" to={navLink.to} key={index}>
            {navLink.text}
          </NavLink>
        ))}
      </Nav>
    </Row>
  );
}

export default NavRow;
