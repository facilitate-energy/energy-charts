import React, { useState } from "react";
import { Layout } from "./containers";
import config from "./config";

function App() {
  const [mainScenario, setMainScenario] = useState(config.defaultScenarioGroup);

  const [compareScenario, setCompareScenario] = useState(null);

  const selectedScenarios = [mainScenario, compareScenario];

  return (
    <Layout
      {...config}
      selectedScenarios={selectedScenarios}
      setMainScenario={setMainScenario}
      setCompareScenario={setCompareScenario}
    />
  );
}

export default App;
