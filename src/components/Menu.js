import React from "react";
import { ListGroup, Collapse } from "react-bootstrap";
import List from "./List";

function Menu(props) {
  //const scenarioList = props.scenarioList.reduce()

  return (
    <>
      {props.Title}
      <ListGroup as="ul" className="primaryScnarioList">
        <List
          items={props.scenarioList}
          selectedItem={props.selectedScenario}
          onSelection={props.setSelectedScenario}
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
