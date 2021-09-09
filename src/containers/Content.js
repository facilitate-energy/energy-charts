import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Col } from "react-bootstrap";

function Content(props) {
  return (
    <Col as="main">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {props.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.component to={route.redirectPath} />}
            />
          ))}
        </Switch>
      </Suspense>
    </Col>
  );
}

export default Content;
