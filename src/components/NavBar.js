import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavToggle } from "../components";

function NavBar(props) {
  const { navLinks, navBrand } = props;

  const [expandNavbar, setExpandNavbar] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="light"
      role="navigation"
      expanded={expandNavbar}
    >
      <Container>
        <Navbar.Brand href={navBrand.to}>{navBrand.brand}</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpandNavbar(!expandNavbar)}
        >
          <NavToggle />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" as="nav">
            {navLinks.map((navLink, idx) => (
              <NavLink
                className="nav-link"
                to={navLink.to}
                role="button"
                key={idx}
                onClick={() => setExpandNavbar(false)}
              >
                {navLink.text}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
