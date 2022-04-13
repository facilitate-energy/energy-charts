import React, { useState, useRef, useEffect } from "react";
import { Layout } from "./containers";
import config from "./config";

function App() {
  const [mainScenario, setMainScenario] = useState(config.defaultScenarioGroup);
  const [compareScenario, setCompareScenario] = useState(null);
  const [showDifference, setShowDifference] = useState(false);
  const [basePath, setBasePath] = useState("");

  const cache = useRef({});

  useEffect(() => {
    if (!compareScenario) {
      setShowDifference(false);
    }
  }, [compareScenario]);

  return (
    <Layout
      {...config}
      cache={cache}
      basePath={basePath}
      selectedScenarios={[mainScenario, compareScenario]}
      showDifference={showDifference}
      setBasePath={setBasePath}
      setMainScenario={setMainScenario}
      setCompareScenario={setCompareScenario}
      setShowDifference={setShowDifference}
    />
  );
}

export default App;
