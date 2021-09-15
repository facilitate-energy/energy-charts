import React, { Suspense } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Col, Row, Nav } from "react-bootstrap";
import PageLoading from "../components/PageLoading";

function Content(props) {
  const sectionNavs = [
    {
      path: "/charts",
      navLinks: [
        { to: "/charts/group1", text: "Group 1" },
        { to: "/charts/group2", text: "Group 2" }
      ]
    }
  ];

  const subsectionNavs = [
    {
      path: "/charts/group1",
      navLinks: [
        { to: "/charts/group1/subgroup1", text: "Subgroup 1" },
        { to: "/charts/group1/subgroup2", text: "Subgroup 2" }
      ]
    }
  ];

  return (
    <Col as="main">
      {sectionNavs.map((sectionNav, index) => (
        <Route key={index} path={sectionNav.path}>
          <Row>
            <Nav as="nav" variant="tabs">
              {sectionNav.navLinks.map((navLink, index) => (
                <NavLink className="nav-link" to={navLink.to} key={index}>
                  {navLink.text}
                </NavLink>
              ))}
            </Nav>
          </Row>
        </Route>
      ))}
      {subsectionNavs.map((subsectionNav, index) => (
        <Route key={index} path={subsectionNav.path}>
          <Row>
            <Nav as="nav" variant="pills">
              {subsectionNav.navLinks.map((navLink, index) => (
                <NavLink className="nav-link" to={navLink.to} key={index}>
                  {navLink.text}
                </NavLink>
              ))}
            </Nav>
          </Row>
        </Route>
      ))}
      <Suspense fallback={<PageLoading />}>
        <Switch>
          {props.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={
                <route.component
                  to={route.redirectPath}
                  page={route.page}
                  charts={route.charts}
                />
              }
            />
          ))}
        </Switch>
      </Suspense>
    </Col>
  );
}

export default Content;
