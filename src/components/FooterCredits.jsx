import React from "react";
import { Col, Row } from "react-bootstrap";

function FooterCredits(props) {
  return (
    <>
      <Row className="pt-2">
        <Col className="text-center">
          <small>
            {props.demo ? (
              <span className="text-muted"> {"Developed by "} </span>
            ) : (
              <>
                <span className="text-muted"> {"Based on "} </span>
                <a
                  href="https://energy-charts.netlify.app"
                  className="text-reset text-decoration-none"
                >
                  Energy Charts
                </a>
                <span className="text-muted"> {" developed by "} </span>
              </>
            )}
            <a
              href="https://facilitate.energy"
              className="text-reset text-decoration-none"
            >
              Facilitate Energy Ltd.
            </a>
          </small>
        </Col>
      </Row>
      <Row className="pb-2">
        <Col className="text-center">
          <small>
            {props.demo ? (
              <>
                <a
                  href="https://energy-charts.netlify.app"
                  className="text-reset text-decoration-none"
                >
                  Energy Charts
                </a>{" "}
              </>
            ) : (
              <span className="text-muted"> {"Energy Charts "} </span>
            )}
            <a
              href="https://github.com/facilitate-energy/energy-charts"
              className="text-reset text-decoration-none"
            >
              source code
            </a>
            <span className="text-muted">{" available under the "}</span>
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              className="text-reset text-decoration-none"
            >
              Apache-2.0 License.
            </a>
          </small>
        </Col>
      </Row>
    </>
  );
}

export default FooterCredits;
