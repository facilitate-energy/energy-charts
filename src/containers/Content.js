import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Col } from "react-bootstrap";
import NavRow from "../components/NavRow";
import PageLoading from "../components/PageLoading";

function Content(props) {
  return (
    <Col as="main">
      {props.contentNavs.map((nav, index) => (
        <Route key={index} path={nav.path}>
          <NavRow navLinks={nav.links} variant={nav.variant} />
        </Route>
      ))}

      <Suspense fallback={<PageLoading />}>
        <Switch>
          {props.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={
                <route.component
                  to={route.redirectPath}
                  page={route.page}
                  charts={route.charts}
                  selectedScenario={props.selectedScenario}
                />
              }
            />
          ))}
        </Switch>
      </Suspense>
    </Col>
  );
}

export default Content;
