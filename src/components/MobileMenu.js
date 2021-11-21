import React from "react";
import { Row, Col, ButtonGroup } from "react-bootstrap";
import { OffcanvasMenu } from "../components";

function MobileMenu(props) {
  const { scenarioList } = props;

  const menuButtons = [
    {
      placement: "start",
      title: "Scenarios",
      noneItem: false,
      onSelection: props.setMainScenario
    },
    {
      placement: "end",
      title: "Compare with",
      noneItem: true,
      onSelection: props.setCompareScenario
    }
  ];

  return (
    <Row className="pb-2 d-md-none sticky-top">
      <Col className="align-self-center text-center">
        <ButtonGroup>
          {props.selectedScenarios.map((scenario, idx) => (
            <OffcanvasMenu
              key={idx}
              name={scenario}
              items={scenarioList}
              selectedItem={scenario}
              {...menuButtons[idx]}
            />
          ))}
        </ButtonGroup>
      </Col>
    </Row>
  );
}

export default MobileMenu;
