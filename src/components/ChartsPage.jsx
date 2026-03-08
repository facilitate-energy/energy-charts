import React from "react";
import { Routes, Route, Outlet } from "react-router";
import { Col, Container } from "react-bootstrap";
import { Menu, MobileMenu, NavRow } from "../components";

function navElement(nav) {
  if (nav.links) {
    return (
      <>
        <NavRow navLinks={nav.links} variant={nav.variant} />
        <Outlet />
      </>
    );
  }
  return <Outlet />;
}

function renderNavRoute(nav, idx) {
  return (
    <Route key={idx} path={nav.path} element={navElement(nav)}>
      {nav.routes &&
        nav.routes.map((route, routeIdx) => (
          <Route
            key={routeIdx}
            path={route.path}
            element={
              route.links ? (
                <NavRow navLinks={route.links} variant={nav.variant} />
              ) : null
            }
          />
        ))}
    </Route>
  );
}

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

  // Separate the catch-all nav ("*") from path-specific sub-navs.
  // The catch-all nav must be the parent route so it always renders; path-specific
  // navs are nested inside it as children, allowing both to render simultaneously.
  const catchAllNav = props.contentNavs.find((nav) => nav.path === "*");
  const pathNavs = props.contentNavs.filter((nav) => nav.path !== "*");

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
          {catchAllNav ? (
            <Route
              path="*"
              element={
                <>
                  {catchAllNav.links && (
                    <NavRow
                      navLinks={catchAllNav.links}
                      variant={catchAllNav.variant}
                    />
                  )}
                  <Outlet />
                </>
              }
            >
              {pathNavs.map(renderNavRoute)}
            </Route>
          ) : (
            props.contentNavs.map(renderNavRoute)
          )}
        </Routes>
        <Outlet />
      </Col>
    </>
  );
}

export default ChartsPage;
