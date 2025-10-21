import React from "react";
import { Routes, Route, Outlet } from "react-router";
import { Col, Container } from "react-bootstrap";
import { Menu, MobileMenu, NavRow } from "../components";

function ChartsPage(props) {
  const scenarioList = props.scenarios.map((scenario) => scenario.name);

  const menuProps = {
    scenarioList: scenarioList,
    scenarioTitles: props.titles.scenarios,
    selectedScenarios: props.selectedScenarios,
    showDifference: props.showDifference,
    setMainScenario: props.setMainScenario,
    setCompareScenario: props.setCompareScenario,
    setShowDifference: props.setShowDifference
  };

  return (
    <>
      <Col as="aside" md="auto" className="p-3 d-none d-md-block">
        <Container fluid className="sticky-top">
          <Menu {...menuProps} />
        </Container>
      </Col>
      <Col as="main">
        <MobileMenu {...menuProps} />
        <Routes>
          {props.contentNavs.map((nav, idx) => (
            <Route
              key={idx}
              path={nav.path}
              element={
                nav.links ? (
                  <NavRow navLinks={nav.links} variant={nav.variant} />
                ) : (
                  <Outlet />
                )
              }
            >
              {nav.routes &&
                nav.routes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    element={
                      <NavRow navLinks={nav.links} variant={nav.variant} />
                    }
                  />
                ))}
            </Route>
          ))}
        </Routes>
        <Outlet />
      </Col>
    </>
  );
}

export default ChartsPage;
