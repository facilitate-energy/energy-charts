import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Content, Footer, Header, Sidebar } from "../containers";
import { PageLoading } from "../components";

function Layout(props) {
  const scenarioList = props.scenarios.map((scenario) => scenario.name);

  return (
    <Container fluid="ms" className="vh-100 d-flex flex-column">
      <Row as="header" className="mb-3 mx-0">
        <Header navLinks={props.headerNavLinks} />
      </Row>
      <Suspense fallback={<PageLoading />}>
        <Row className="mx-0 flex-grow-1">
          <Routes>
            <Route
              path={props.routeWithSidebar}
              element={
                <Sidebar
                  scenarioList={scenarioList}
                  selectedScenarios={props.selectedScenarios}
                  showDifference={props.showDifference}
                  setMainScenario={props.setMainScenario}
                  setCompareScenario={props.setCompareScenario}
                  setShowDifference={props.setShowDifference}
                />
              }
            />
          </Routes>
          <Content
            routes={props.routes}
            scenarioList={scenarioList}
            basePath={props.basePath}
            cache={props.cache}
            selectedScenarios={props.selectedScenarios}
            showDifference={props.showDifference}
            setBasePath={props.setBasePath}
            setMainScenario={props.setMainScenario}
            setCompareScenario={props.setCompareScenario}
            setShowDifference={props.setShowDifference}
            contentNavs={props.contentNavs}
          />
        </Row>
      </Suspense>
      <Row as="footer" className="mt-3 mx-0">
        <Footer />
      </Row>
    </Container>
  );
}

export default Layout;
