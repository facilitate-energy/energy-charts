import React from "react";
import { Col, Row } from "react-bootstrap";

function FooterLogos(props) {
  const { logos } = props;

  return (
    <>
      {logos && (
        <Row className="justify-content-around pt-4 gx-0">
          {logos.map((logo, idx) => (
            <Col xs={6} sm={3} className="align-self-center" key={idx}>
              <a href={logo.href}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="img-fluid mx-auto d-block"
                />
              </a>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default FooterLogos;
