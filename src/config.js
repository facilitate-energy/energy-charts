//import React from "react";
//import { Navigate } from "react-router-dom";
//const PageNotFound = React.lazy(() => import("./components/NotFound"));

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
      path: "group1",
      routes: [
        {
          path: "subgroup1",
          charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
        },
        {
          path: "subgroup2",
          charts: ["chart 1", "chart 4", "chart 3", "chart 2"]
        }
      ]
    },
    {
      path: "group2",
      charts: ["chart 1", "chart 2", "chart 3", "chart 4"]
    }
    /*  {
      path: "group1",
      component: Navigate,
      props: { replace: true, to: "group1/subgroup1" }
    },
    {
      path: "",
      component: Navigate,
      props: { replace: true, to: "group1/subgroup1" }
    },
    {
      path: "/",
      component: Navigate,
      props: { replace: true, to: "/about" }
    },
    {
      path: "*",
      component: PageNotFound
    } */
  ],
  contentNavs: [
    {
      path: "*",
      links: [
        { to: "group1", text: "Group 1" },
        { to: "group2", text: "Group 2" }
      ],
      variant: "tabs"
    },
    {
      path: "group1/*",
      links: [
        { to: "subgroup1", text: "Subgroup 1" },
        { to: "subgroup2", text: "Subgroup 2" }
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
