import React from "react";
import { FloatingLabel, Form, ListGroup, Collapse } from "react-bootstrap";
import { List, OptionList } from "../components";

function Menu(props) {
  //const scenarioList = props.scenarioList.reduce()

  const updateCompareScenario = (e) => {
    if (e.target.value !== "None") {
      props.setCompareScenario(e.target.value);
    } else {
      props.setCompareScenario(null);
      props.setShowDifference(false);
    }
  };

  const updateShowDifference = (e) => {
    props.setShowDifference(e.target.checked);
  };

  const selectedCompareScenario = props.selectedScenarios[1]
    ? props.selectedScenarios[1]
    : "None";

  return (
    <>
      {props.Title}
      <ListGroup as="ul" className="MainScenarioList">
        <List
          items={props.scenarioList}
          selectedItem={props.selectedScenarios[0]}
          onSelection={props.setMainScenario}
        />
      </ListGroup>
      <hr className="MenuSeparatorLine" />

      <Form>
        <FloatingLabel controlId="CompareScenarioList" label="Compare with">
          <Form.Select
            onChange={updateCompareScenario}
            value={selectedCompareScenario}
          >
            <option>None</option>
            <OptionList items={props.scenarioList} />
          </Form.Select>
        </FloatingLabel>

        <Collapse in={props.selectedScenarios[1] ? true : false}>
          <div>
            <hr className="MenuSeparatorLine" />
            <Form.Switch
              disabled={!props.selectedScenarios[1]}
              checked={props.showDifference}
              label="Show difference"
              id="ScenarioDifferenceSwitch"
              onChange={updateShowDifference}
            />
          </div>
        </Collapse>
        <hr className="MenuSeparatorLine" />
      </Form>
    </>
  );
}

export default Menu;
