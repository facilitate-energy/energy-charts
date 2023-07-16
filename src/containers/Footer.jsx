import React from "react";
import { Container } from "react-bootstrap";
import { FooterLogos, FooterCredits } from "../components";

function Footer(props) {
  return (
    <Container fluid className="footer bg-light mt-auto pr-0" as="footer">
      <FooterLogos {...props} />
      <FooterCredits {...props} />
    </Container>
  );
}

export default Footer;
