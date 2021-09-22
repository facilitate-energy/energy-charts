import React from "react";
import { ListGroup, Collapse } from "react-bootstrap";
import List from "./List";

function Menu(props) {
  //const scenarioList = props.scenarioList.reduce()

  return (
    <>
      {props.Title}
      <ListGroup as="ul" className="primaryScenarioList">
        <List
          items={props.scenarioList}
          selectedItem={props.selectedScenarios[0]}
          onSelection={props.setMainScenario}
        />
      </ListGroup>
      <hr />
      <Collapse>
        <div>{props.CompareItems}</div>
      </Collapse>
    </>
  );
}

export default Menu;
