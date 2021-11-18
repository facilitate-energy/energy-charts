import React from "react";
import { Route, Switch } from "react-router-dom";
import { Col, Button, ButtonGroup, Row } from "react-bootstrap";
import { NavRow } from "../components";

function Content(props) {
  return (
    <Col as="main">
      {props.contentNavs.map((nav, index) => (
        <Route key={index} path={nav.path}>
          <NavRow navLinks={nav.links} variant={nav.variant} />
        </Route>
      ))}

      <Route path="/charts">
        <Row className="d-md-none">
          <ButtonGroup>
            <Button> {props.selectedScenarios[0]} </Button>
            <Button> + </Button>
            <Button> {props.selectedScenarios[1]} </Button>
            <Button> Options </Button>
          </ButtonGroup>
        </Row>
      </Route>

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
                selectedScenarios={props.selectedScenarios}
                showDifference={props.showDifference}
              />
            }
          />
        ))}
      </Switch>
    </Col>
  );
}

export default Content;
