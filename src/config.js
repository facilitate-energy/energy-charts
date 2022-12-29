import chartsInfo from "./specs/chartsInfo";
import chartsTitles from "./specs/chartsTitles";
import seriesTitles from "./specs/seriesTitles";
import scenarioTitles from "./specs/scenarioTitles";

const config = {
  chartsInfo: chartsInfo,
  chartsPath: "charts/*",
  demo: true,
  fixedDomain: true,
  titles: {
    charts: chartsTitles,
    series: seriesTitles,
    scenarios: scenarioTitles
  },
  scenarios: [
    /* Note that "name" - including nested "name" in "variants" - 
       must only contain A-Za-z0-9-_.!~*'() and NO SPACES */
    {
      name: "Scenario1",
      variants: [{ name: "Scenario1", specs: null }]
    },
    {
      name: "Scenario2",
      variants: [{ name: "Scenario2", specs: null }]
    },
    {
      name: "Scenario3",
      variants: [{ name: "Scenario3", specs: null }]
    },
    {
      name: "Scenario4",
      variants: [{ name: "Scenario4", specs: null }]
    }
  ],
  defaultScenarioGroup: "Scenario1",
  landingPage: "about",
  routes: [
    {
      /* Note that "path" must only contain A-Za-z0-9-_.!~*'()/ and NO SPACES */
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
  ],
  contentNavs: [
    { /* Note that "path" and "to" must only contain A-Za-z0-9-_.!~*'()/ and NO SPACES */
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
  ],
  headerNavBrand: {
    brand: "Energy Charts",
    to: "/"
  }
};

export { config as default };
