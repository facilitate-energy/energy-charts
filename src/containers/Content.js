import React from "react";
import { Route, Routes } from "react-router-dom";
import { Col } from "react-bootstrap";
import { NavRow, MobileMenu } from "../components";

function Content(props) {
  return (
    <Col as="main">
      <Routes>
        <Route path="/charts/*" element={<MobileMenu {...props} />} />
      </Routes>

      {props.contentNavs.map((nav, index) => (
        <Routes key={index}>
          <Route
            path={nav.path}
            element={<NavRow navLinks={nav.links} variant={nav.variant} />}
          />
        </Routes>
      ))}
      <Routes>
        {props.routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.component
                {...route.props}
                selectedScenarios={props.selectedScenarios}
                showDifference={props.showDifference}
              />
            }
          />
        ))}
      </Routes>
    </Col>
  );
}

export default Content;
