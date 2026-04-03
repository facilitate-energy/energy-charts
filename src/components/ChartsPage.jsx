import React from "react";
import { Routes, Route, Outlet } from "react-router";
import { Col, Container } from "react-bootstrap";
import { Menu, MobileMenu, NavRow } from "../components";

/**
 * Returns the layout element for a navigation route.
 *
 * If the nav config has a `links` property, renders a {@link NavRow} above an
 * {@link Outlet} so the nav bar appears above whatever child route is active.
 * Otherwise, renders a bare {@link Outlet} with no nav bar at this level.
 *
 * @param {object} nav - Navigation configuration object.
 * @param {Array}  [nav.links] - Tab/link definitions to render in a NavRow.
 * @param {string} [nav.variant] - Visual variant forwarded to NavRow.
 * @returns {React.ReactElement} A fragment with NavRow + Outlet, or just Outlet.
 */
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

/**
 * Builds a nested React Router {@link Route} from a nav configuration object.
 *
 * The parent route uses {@link navElement} as its element, providing the
 * appropriate layout (nav bar + outlet, or just outlet). Child routes are
 * created from `nav.routes`: each child renders a second-tier {@link NavRow}
 * if it has its own `links`, or `null` otherwise — filling the parent outlet
 * without adding extra UI.
 *
 * @param {object}   nav           - Navigation configuration object.
 * @param {string}   nav.path      - Route path for the parent route.
 * @param {Array}    [nav.links]   - Top-level tab/link definitions.
 * @param {string}   [nav.variant] - Visual variant forwarded to NavRow.
 * @param {Array}    [nav.routes]  - Child route configurations.
 * @param {number}   idx           - Index used as the route's React key.
 * @returns {React.ReactElement} A Route element with optional nested Routes.
 */
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

/**
 * Page-level layout component for the charts section.
 *
 * Renders a two-column layout: a sticky sidebar with a scenario selection
 * {@link Menu} (desktop only) and a main content area with a {@link MobileMenu}
 * and a nested {@link Routes} tree built from `contentNavs`.
 *
 * Navigation config entries with `path: "*"` are treated as catch-all parent
 * routes that always render; all other entries are nested inside them as
 * path-specific children, so both levels can render simultaneously. If no
 * catch-all nav exists, all entries are rendered as sibling top-level routes.
 *
 * @param {object}   props
 * @param {Array}    props.scenarios              - Available scenario objects; each must have a `name` string.
 * @param {object}   props.titles                 - Display title maps.
 * @param {object}   props.titles.scenarios       - Map of scenario name → display title.
 * @param {Array}    props.selectedScenarios      - Currently selected scenario names.
 * @param {boolean}  props.showDifference         - Whether the difference view is active.
 * @param {Function} props.setMainScenario        - Setter for the primary scenario.
 * @param {Function} props.setCompareScenario     - Setter for the comparison scenario.
 * @param {Function} props.setShowDifference      - Setter for the difference toggle.
 * @param {Array}    props.contentNavs            - Navigation configuration objects used to build the route tree.
 * @returns {React.ReactElement} The full charts page layout.
 */
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
