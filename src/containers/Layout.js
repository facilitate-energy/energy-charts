import React from "react";
import { Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Content, Footer, Header, Sidebar } from "../containers";

function Layout(props) {
  return (
    <Container fluid="ms" className="vh-100 d-flex flex-column">
      <Row as="header" className="mb-auto mx-0">
        <Header navLinks={props.headerNavLinks} />
      </Row>
      <Row className="m-0">
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
          selectedScenarios={props.selectedScenarios}
          showDifference={props.showDifference}
          contentNavs={props.contentNavs}
        />
      </Row>
      <Row as="footer" className="mt-auto mx-0">
        <Footer />
      </Row>
    </Container>
  );
}

export default Layout;
