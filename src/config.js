import React from "react";
import { Redirect } from "react-router-dom";

const Charts = React.lazy(() => import("./components/Charts"));
const Page = React.lazy(() => import("./components/Page"));
const PageNotFound = React.lazy(() => import("./components/NotFound"));

const config = {
  scenarios: [
    {
      name: "Scenario 1",
      variants: [{ name: "Scenario 1", specs: null }]
    },
    {
      name: "Scenario 2",
      variants: [{ name: "Scenario 2", specs: null }]
    },
    {
      name: "Scenario 3",
      variants: [{ name: "Scenario 3", specs: null }]
    },
    {
      name: "Scenario 4",
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
      path: "/charts/group1/subgroup1",
      component: Charts,
      charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
    },
    {
      exact: true,
      path: "/charts/group1/subgroup2",
      component: Charts,
      charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
    },
    {
      exact: true,
      path: "/charts/group2",
      component: Charts,
      charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
    },
    {
      path: "/charts/group2/",
      redirectPath: "/charts/group2",
      component: Redirect
    },
    {
      path: "/charts/",
      redirectPath: "/charts/group1/subgroup1",
      component: Redirect
    },
    { exact: true, path: "/", redirectPath: "/about", component: Redirect },
    {
      component: PageNotFound
    }
  ],
  routeWithSidebar: "/charts",
  contentNavs: [
    {
      path: "/charts",
      links: [
        { to: "/charts/group1", text: "Group 1" },
        { to: "/charts/group2", text: "Group 2" }
      ],
      variant: "tabs"
    },
    {
      path: "/charts/group1",
      links: [
        { to: "/charts/group1/subgroup1", text: "Subgroup 1" },
        { to: "/charts/group1/subgroup2", text: "Subgroup 2" }
      ],
      variant: "underscore"
    }
  ],
  headerNavLinks: [
    { to: "/about", text: "About" },
    { to: "/charts", text: "Charts" }
  ]
};

export { config as default };
