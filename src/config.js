import React from "react";
import { Redirect } from "react-router-dom";
import PageNotFound from "./components/NotFound";

const Charts = React.lazy(() => import("./components/Charts"));
const Page = React.lazy(() => import("./components/Page"));

const config = {
  scenarios: [
    {
      group: "Scenario 1",
      variants: [{ name: "Scenario 1", specs: null }]
    },
    {
      group: "Scenario 2",
      variants: [{ name: "Scenario 2", specs: null }]
    },
    {
      group: "Scenario 3",
      variants: [{ name: "Scenario 3", specs: null }]
    },
    {
      group: "Scenario 4",
      variants: [{ name: "Scenario 4", specs: null }]
    }
  ],
  defaultScenarioGroup: "Scenario 1",
  routes: [
    {
      exact: true,
      path: "/about",
      component: Page,
      page: "about"
    },
    {
      exact: true,
      path: "/results/section-1/subsection-1",
      component: Charts,
      charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
    },
    {
      exact: true,
      path: "/results/section-1/subsection-2",
      component: Charts,
      charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
    },
    {
      exact: true,
      path: "/results/section-2",
      component: Charts,
      charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
    },
    {
      path: "/results/section-2/",
      redirectPath: "/results/section-2",
      component: Redirect
    },
    {
      path: "/results/",
      redirectPath: "/results/section-1/subsection-1",
      component: Redirect
    },
    { exact: true, path: "/", redirectPath: "/about", component: Redirect },
    {
      component: PageNotFound
    }
  ]
};

export { config as default };
