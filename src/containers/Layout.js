import React from "react";
import { Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Content, Footer, Header, Sidebar } from "./index";

function Layout() {
  return (
    <Container fluid="ms" className="vh-100 d-flex flex-column">
      <Row as="header" className="mb-auto">
        <Header />
      </Row>
      <Row>
        <Route path="/results">
          <Sidebar />
        </Route>
        <Content />
      </Row>
      <Row as="footer" className="mt-auto">
        <Footer />
      </Row>
    </Container>
  );
}

export default Layout;
