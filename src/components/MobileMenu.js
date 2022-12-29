import React from "react";
import { Row, Col, ButtonGroup } from "react-bootstrap";
import { OffcanvasMenu, OffcanvasMenuDifference } from "../components";
import { useSearchParamsState } from "../utils/useSearchParamsState";

function MobileMenu(props) {
    

  const { defaultScenario, scenarioList, scenarioTitles } = props;

  const [rawMainScenario, setMainScenario] = useSearchParamsState('s', defaultScenario);
  const [rawCompareScenario, setCompareScenario] = useSearchParamsState('c', null);
  const [rawShowDifference, setShowDifference] = useSearchParamsState('d', false);
  
  const mainScenario = rawMainScenario || defaultScenario;
  const compareScenario = rawCompareScenario === 'none' ? null : rawCompareScenario;
  const showDifference = rawShowDifference === "1";

  const updateMainScenario = (name) => setMainScenario(name);
  const updateCompareScenario = (name) => setCompareScenario(name);
  const updateShowDifference = (checked) => setShowDifference(checked ? 1 : 0);
  
  const selectedScenarios = [mainScenario, compareScenario];
  
  const menuButtons = [
    {
      placement: "start",
      title: "Scenarios",
      noneItem: false,
      onSelection: updateMainScenario
    },
    {
      placement: "end",
      title: "Compare with",
      noneItem: true,
      onSelection: updateCompareScenario
    }
  ];

  return (
    <Row className="pb-2 d-md-none sticky-top">
      <Col className="text-center">
        <ButtonGroup>
          {selectedScenarios.map((scenario, idx) => (
            <OffcanvasMenu
              key={idx}
              name={scenario}
              items={scenarioList}
              itemTitles={scenarioTitles}
              selectedItem={scenario}
              {...menuButtons[idx]}
            />
          ))}
          {selectedScenarios[1] && (
            <OffcanvasMenuDifference
              title="Options"
              placement="top"
              showDifference={showDifference}
              setShowDifference={updateShowDifference}
            />
          )}
        </ButtonGroup>
      </Col>
    </Row>
  );

}

export default MobileMenu;
