import React from "react";
import { FloatingLabel, Form, ListGroup, Collapse } from "react-bootstrap";
import { List, OptionList } from "../components";
import { useSearchParamsState } from "../utils/useSearchParamsState";


function Menu(props) {
  const { defaultScenario, scenarioList, scenarioTitles } = props;
  const Title = props.Title ? props.Title : "Scenarios";

  const [rawMainScenario, setMainScenario] = useSearchParamsState('s', defaultScenario);
  const [rawCompareScenario, setCompareScenario] = useSearchParamsState('c', null);
  const [rawShowDifference, setShowDifference] = useSearchParamsState('d', false);
  
  const mainScenario = rawMainScenario || defaultScenario;
  const compareScenario = rawCompareScenario === 'none' ? null : rawCompareScenario;
  const showDifference = rawShowDifference === "1";

  const updateMainScenario = (name) => setMainScenario(name);
  const updateCompareScenario = (e) => setCompareScenario(e.target.value);
  const updateShowDifference = (e) => setShowDifference(e.target.checked ? 1 : 0);
  
  return (
    <>
      <p className="h4"> {Title} </p>
      <ListGroup as="ul" variant="flush" className="main-scenario-list">
        <List
          items={scenarioList}
          itemTitles={scenarioTitles}
          selectedItem={mainScenario}
          onSelection={updateMainScenario}
        />
      </ListGroup>
      <hr className="menu-separator" />

      <Form>
        <FloatingLabel controlId="compare-scenario-list" label="Compare with">
          <Form.Select
            onChange={updateCompareScenario}
            value={compareScenario || "none"}
          >
            <OptionList
              items={scenarioList}
              itemTitles={scenarioTitles}
              noneItem={true}
            />
          </Form.Select>
        </FloatingLabel>

        <Collapse in={compareScenario ? true : false}>
          <div>
            <hr className="menu-separator" />
            <Form.Switch
              disabled={!compareScenario}
              checked={showDifference}
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
