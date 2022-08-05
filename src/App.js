import React, { useState, useRef, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./containers";
import { PageLoading, ChartsPage, Charts, Page } from "./components";

function App({ config }) {
  const [mainScenario, setMainScenario] = useState(config.defaultScenarioGroup);
  const [compareScenario, setCompareScenario] = useState(null);
  const [showDifference, setShowDifference] = useState(false);

  const cache = useRef({});

  const titles = {
    chartsTitles: config.titles.charts,
    scenarioTitles: config.titles.scenarios,
    seriesTitles: config.titles.series
  };

  useEffect(() => {
    if (!compareScenario) {
      setShowDifference(false);
    }
  }, [compareScenario]);

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Layout {...config} />}>
          {config.landingPage ? (
            <Route
              index
              element={<Navigate to={config.landingPage} replace={true} />}
            />
          ) : (
            <Route
              index
              element={
                <Page cache={cache} basePath={config.basePath} name="index" />
              }
            />
          )}
          <Route
            path=":pageId"
            element={<Page cache={cache} basePath={config.basePath} />}
          />
          <Route
            path={config.chartsPath}
            element={
              <ChartsPage
                {...config}
                selectedScenarios={[mainScenario, compareScenario]}
                showDifference={showDifference}
                setMainScenario={setMainScenario}
                setCompareScenario={setCompareScenario}
                setShowDifference={setShowDifference}
              />
            }
          >
            <Route
              index
              element={<Navigate to={config.routes[0].path} replace={true} />}
            />
            {config.routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  route.charts && (
                    <Charts
                      selectedScenarios={[mainScenario, compareScenario]}
                      showDifference={showDifference}
                      basePath={config.basePath}
                      charts={route.charts}
                      chartsInfo={config.chartsInfo}
                      cache={cache}
                      xDomainPadding={config.xDomainPadding}
                      xGridValues={config.xGridValues}
                      xGridMarks={config.xGridMarks}
                      fixedDomain={config.fixedDomain}
                      maxChartWidth={config.maxChartWidth}
                      stackbarOffset={config.stackbarOffset}
                      padding={config.chartPadding}
                      barWidth={config.barWidth}
                      {...titles}
                    />
                  )
                }
              >
                {route.routes && (
                  <>
                    <Route
                      index
                      element={
                        <Navigate to={route.routes[0].path} replace={true} />
                      }
                    />
                    {route.routes.map((route, idx) => (
                      <Route
                        key={idx}
                        path={route.path}
                        element={
                          route.charts && (
                            <Charts
                              selectedScenarios={[
                                mainScenario,
                                compareScenario
                              ]}
                              showDifference={showDifference}
                              basePath={config.basePath}
                              charts={route.charts}
                              chartsInfo={config.chartsInfo}
                              cache={cache}
                              xDomainPadding={config.xDomainPadding}
                              xGridValues={config.xGridValues}
                              xGridMarks={config.xGridMarks}
                              fixedDomain={config.fixedDomain}
                              maxChartWidth={config.maxChartWidth}
                              stackbarOffset={config.stackbarOffset}
                              padding={config.chartPadding}
                              barWidth={config.barWidth}
                              {...titles}
                            />
                          )
                        }
                      />
                    ))}
                  </>
                )}
              </Route>
            ))}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
