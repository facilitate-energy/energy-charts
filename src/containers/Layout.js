import React from "react";
import { Container, Row } from "react-bootstrap";
import { Content, Footer, Header, Sidebar } from "./index";

function Layout() {
  return (
    <Container fluid="ms" className="vh-100 d-flex flex-column">
      <Row as="header" className="mb-auto">
        <Header />
      </Row>
      <Row>
        <Sidebar />
        <Content />
      </Row>
      <Row as="footer" className="mt-auto">
        <Footer />
      </Row>
    </Container>
  );
}

export default Layout;
