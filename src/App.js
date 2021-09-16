import React, { useState } from "react";
import { Layout } from "./containers";
import config from "./config";

function App() {
  const [selectedScenario, setSelectedScenario] = useState(
    config.defaultScenarioGroup
  );

  return (
    <Layout
      {...config}
      selectedScenario={selectedScenario}
      setSelectedScenario={setSelectedScenario}
    />
  );
}

export default App;
