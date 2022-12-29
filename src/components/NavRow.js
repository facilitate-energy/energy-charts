import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { Nav, Row } from "react-bootstrap";

function NavRow(props) {
  const { navLinks, variant } = props;
  const [searchParams, ] = useSearchParams();
  const addSearchParams = (path) => `${path}?${searchParams.toString()}`;
  
  return (
    <Row>
      <Nav as="nav" variant={variant}>
        {navLinks.map((navLink, index) => (
          <NavLink className="nav-link text-nowrap" to={addSearchParams(navLink.to)} key={index}>
            {navLink.text}
          </NavLink>
        ))}
      </Nav>
    </Row>
  );
}

export default NavRow;
