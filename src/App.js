import React, { useState } from "react";
import { Layout } from "./containers";
import config from "./config";

function App() {
  const [mainScenario, setMainScenario] = useState(config.defaultScenarioGroup);

  const [compareScenario, setCompareScenario] = useState(null);

  const [showDifference, setShowDifference] = useState(false);

  const selectedScenarios = [mainScenario, compareScenario];

  return (
    <Layout
      {...config}
      selectedScenarios={selectedScenarios}
      showDifference={showDifference}
      setMainScenario={setMainScenario}
      setCompareScenario={setCompareScenario}
      setShowDifference={setShowDifference}
    />
  );
}

export default App;
