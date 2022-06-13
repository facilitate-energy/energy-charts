import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import { Menu, MobileMenu, NavRow } from "../components";

function ChartsPage(props) {
  const scenarioList = props.scenarios.map((scenario) => scenario.name);

  return (
    <>
      <Col as="aside" md="auto" className="p-3 d-none d-md-block">
        <Container fluid className="sticky-top">
          <Menu
            scenarioList={scenarioList}
            selectedScenarios={props.selectedScenarios}
            showDifference={props.showDifference}
            setMainScenario={props.setMainScenario}
            setCompareScenario={props.setCompareScenario}
            setShowDifference={props.setShowDifference}
          />
        </Container>
      </Col>
      <Col as="main">
        <MobileMenu
          scenarioList={scenarioList}
          selectedScenarios={props.selectedScenarios}
          showDifference={props.showDifference}
          setMainScenario={props.setMainScenario}
          setCompareScenario={props.setCompareScenario}
          setShowDifference={props.setShowDifference}
        />
        {props.contentNavs.map((nav, idx) => (
          <Routes key={idx}>
            <Route
              path={nav.path}
              element={<NavRow navLinks={nav.links} variant={nav.variant} />}
            />
          </Routes>
        ))}
        <Outlet />
      </Col>
    </>
  );
}

export default ChartsPage;
