import React, { useState, useRef, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./containers";
import { PageLoading, ChartsPage, Charts, Page } from "./components";
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
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Layout {...config} />}>
          <Route
            path=":pageId"
            element={<Page cache={cache} basePath={basePath} />}
          />
          <Route
            path="charts/*"
            element={
              <ChartsPage
                {...config}
                selectedScenarios={[mainScenario, compareScenario]}
                showDifference={showDifference}
                setBasePath={setBasePath}
                setMainScenario={setMainScenario}
                setCompareScenario={setCompareScenario}
                setShowDifference={setShowDifference}
              />
            }
          >
            {config.routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  <Charts
                    selectedScenarios={[mainScenario, compareScenario]}
                    showDifference={showDifference}
                    basePath={basePath}
                    charts={route.charts}
                    cache={cache}
                  />
                }
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
