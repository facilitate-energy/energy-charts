import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Content, Footer, Header, Sidebar } from "../containers";
import { PageLoading } from "../components";

function Layout(props) {
  return (
    <Container fluid="ms" className="vh-100 d-flex flex-column">
      <Row as="header" className="mb-auto mx-0">
        <Header navLinks={props.headerNavLinks} />
      </Row>
      <Suspense fallback={<PageLoading />}>
        <Row className="mx-0 my-2">
          <Route path={props.routeWithSidebar}>
            <Sidebar
              scenarioList={props.scenarios}
              selectedScenarios={props.selectedScenarios}
              showDifference={props.showDifference}
              setMainScenario={props.setMainScenario}
              setCompareScenario={props.setCompareScenario}
              setShowDifference={props.setShowDifference}
            />
          </Route>
          <Content
            routes={props.routes}
            scenarioList={props.scenarios}
            selectedScenarios={props.selectedScenarios}
            showDifference={props.showDifference}
            setMainScenario={props.setMainScenario}
            setCompareScenario={props.setCompareScenario}
            setShowDifference={props.setShowDifference}
            contentNavs={props.contentNavs}
          />
        </Row>
      </Suspense>
      <Row as="footer" className="mt-auto mx-0">
        <Footer />
      </Row>
    </Container>
  );
}

export default Layout;
