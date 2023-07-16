import React from "react";
import { FloatingLabel, Form, ListGroup, Collapse } from "react-bootstrap";
import { List, OptionList } from "../components";

function Menu(props) {
  const { scenarioList, selectedScenarios, scenarioTitles } = props;

  const updateCompareScenario = (e) => {
    if (e.target.value !== "none") {
      props.setCompareScenario(e.target.value);
    } else {
      props.setCompareScenario(null);
    }
  };

  const updateShowDifference = (e) => {
    props.setShowDifference(e.target.checked);
  };

  const Title = props.Tilte ? props.Title : "Scenarios";

  return (
    <>
      <p className="h4"> {Title} </p>
      <ListGroup as="ul" variant="flush" className="main-scenario-list">
        <List
          items={scenarioList}
          itemTitles={scenarioTitles}
          selectedItem={selectedScenarios[0]}
          onSelection={props.setMainScenario}
        />
      </ListGroup>
      <hr className="menu-separator" />

      <Form>
        <FloatingLabel controlId="compare-scenario-list" label="Compare with">
          <Form.Select
            onChange={updateCompareScenario}
            value={selectedScenarios[1] ? selectedScenarios[1] : "none"}
          >
            <OptionList
              items={scenarioList}
              itemTitles={scenarioTitles}
              noneItem={true}
            />
          </Form.Select>
        </FloatingLabel>

        <Collapse in={!!selectedScenarios[1]}>
          <div>
            <hr className="menu-separator" />
            <Form.Switch
              disabled={!selectedScenarios[1]}
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
