import React from "react";
import { FloatingLabel, Form, ListGroup, Collapse } from "react-bootstrap";
import { List, OptionList } from "../components";

function Menu(props) {
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

  //Could use/create pluck instead
  const scenarioList = props.scenarioList.map((scenario) => scenario.name);

  const Title = props.Tilte ? props.Title : "Scenarios";

  return (
    <>
      <p className="h4"> {Title} </p>
      <ListGroup as="ul" variant="flush" className="main-scenario-list">
        <List
          items={scenarioList}
          selectedItem={props.selectedScenarios[0]}
          onSelection={props.setMainScenario}
        />
      </ListGroup>
      <hr className="menu-separator" />

      <Form>
        <FloatingLabel controlId="compare-scenario-list" label="Compare with">
          <Form.Select
            onChange={updateCompareScenario}
            value={selectedCompareScenario}
          >
            <option>None</option>
            <OptionList items={scenarioList} />
          </Form.Select>
        </FloatingLabel>

        <Collapse in={props.selectedScenarios[1] ? true : false}>
          <div>
            <hr className="menu-separator" />
            <Form.Switch
              disabled={!props.selectedScenarios[1]}
              checked={props.showDifference}
              label="Show difference"
              id="scenario-difference-switch"
              onChange={updateShowDifference}
            />
          </div>
        </Collapse>
        <hr className="menu-separator" />
      </Form>
    </>
  );
}

export default Menu;
