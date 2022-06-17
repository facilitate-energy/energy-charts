import React from "react";
import { Row, Col, ButtonGroup } from "react-bootstrap";
import { OffcanvasMenu, OffcanvasMenuDifference } from "../components";

function MobileMenu(props) {
  const { scenarioList, scenarioTitles } = props;

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
      <Col className="text-center">
        <ButtonGroup>
          {props.selectedScenarios.map((scenario, idx) => (
            <OffcanvasMenu
              key={idx}
              name={scenario}
              items={scenarioList}
              itemTitles={scenarioTitles}
              selectedItem={scenario}
              {...menuButtons[idx]}
            />
          ))}
          {props.selectedScenarios[1] && (
            <OffcanvasMenuDifference
              title="Options"
              placement="top"
              showDifference={props.showDifference}
              setShowDifference={props.setShowDifference}
            />
          )}
        </ButtonGroup>
      </Col>
    </Row>
  );
}

export default MobileMenu;
