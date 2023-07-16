import React from "react";
import { Container, Row } from "react-bootstrap";
import { Content, Footer, Header } from "../containers";
import { Alert } from "../components";

function Layout(props) {
  const { alert } = props;

  return (
    <Container fluid="ms" className="vh-100 d-flex flex-column">
      <Row as="header" className="mb-3 mx-0">
        <Header
          navLinks={props.headerNavLinks}
          navBrand={props.headerNavBrand}
        />
        {alert && <Alert {...alert} />}
      </Row>
      <Row className="mx-0 flex-grow-1">
        <Content {...props} />
      </Row>
      <Row as="footer" className="mt-3 mx-0">
        <Footer {...props} />
      </Row>
    </Container>
  );
}

export default Layout;
