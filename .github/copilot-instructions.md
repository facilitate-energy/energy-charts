# Copilot Instructions for Energy Charts

## Project Overview

Energy Charts is a React web application designed to visualise energy modelling results and scenarios for stakeholders. It supports scenario comparison, chart navigation, and markdown-based content pages.

## Tech Stack

- **Framework**: React 19 with JSX
- **Build tool**: Vite (via `rolldown-vite`)
- **Charts**: Victory (v37)
- **Routing**: React Router DOM v6
- **Styling**: Bootstrap 5 + React Bootstrap
- **Testing**: Vitest + Testing Library (React)
- **Linting**: ESLint 9 (flat config)
- **Formatting**: Prettier
- **Node version**: 22 (see `.node-version`)

## Repository Structure

```
src/
  App.jsx            # Root component; handles routing and scenario state
  config.js          # Demo configuration (scenarios, routes, nav links)
  index.jsx          # Entry point
  components/        # Presentational components (charts, nav, layout pieces)
  containers/        # Layout containers (Header, Footer, Content, Layout)
  hooks/             # Custom hooks (useFetch, useMediaQuery)
  specs/             # Chart and title metadata (chartsInfo, chartsTitles, etc.)
  utils/             # Pure utility functions (normaliseData, calculateDifference)
public/
  data/              # Scenario data files (JSON)
  pages/             # Markdown files rendered as content pages
tests/
  setup.js           # Vitest global setup (jest-dom matchers + cleanup)
```

## Common Commands

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start dev server (port 3000) | `npm start` |
| Build for production | `npm run build` |
| Run tests | `npm test` |
| Lint | `npm run lint` |

## Coding Conventions

- **Language**: JavaScript with JSX (`.js` / `.jsx`). No TypeScript.
- **Style**: Follow Prettier config (`.prettierrc`):
  - 2-space indentation
  - Double quotes for strings
  - Semicolons required
  - No trailing commas
- **Linting**: ESLint flat config (`eslint.config.js`). Run `npm run lint` before committing. Variables matching `^[A-Z_]` are exempt from the `no-unused-vars` rule.
- **Imports**: Use named exports from `index.jsx` barrel files where they exist (e.g. `components/index.jsx`, `containers/index.jsx`, `hooks/index.jsx`). The `~` alias resolves to `./src` (configured in `vite.config.js`).
- **Components**: Functional components with React hooks. PropTypes are used for runtime prop validation.
- **SVG imports**: SVGR is configured (`vite-plugin-svgr`); SVG files can be imported as React components.
- **No TypeScript**: Keep all new files as `.js` or `.jsx`.

## Testing

- Tests live alongside source files (e.g. `src/App.test.jsx`) or in the `tests/` directory.
- Use **Vitest** and **@testing-library/react**.
- The test environment is `jsdom` (configured in `vite.config.js`).
- Vitest globals (`describe`, `test`, `it`, `expect`, `vi`, etc.) are enabled — no need to import them.
- Run a specific test file: `npm test -- src/App.test.jsx`
- Run all tests: `npm test`

## Configuration & Customisation

Real deployments replace `src/config.js` with a project-specific config. Key config properties:

| Property | Purpose |
|----------|---------|
| `scenarios` | List of scenario groups available in the selector |
| `defaultScenarioGroup` | Scenario selected on first load |
| `landingPage` | Route to redirect to from `/` (e.g. `"about"`) |
| `routes` | Chart page routes and nested sub-routes |
| `chartsInfo` | Metadata for each chart (from `src/specs/chartsInfo.js`) |
| `contentNavs` | In-page navigation tabs/links |
| `headerNavLinks` | Top nav bar links |
| `basePath` | Base URL path for data/page fetches |
| `maxChartWidth` | Maximum chart width in pixels (default: 450) |
| `showSearchParams` | Sync scenario selection to URL query params (`?scen1=`, `?scen2=`, `?diff=`) |

Scenario data (JSON) goes in `public/data/`; markdown pages go in `public/pages/`.

## Key Patterns

- **Data fetching**: Use the `useFetch` hook (`src/hooks/useFetch.jsx`) for loading scenario data; results are cached via a `useRef` cache passed down from `App`.
- **Scenario comparison**: Two scenarios can be selected simultaneously (`mainScenario`, `compareScenario`). A `showDifference` flag toggles a difference view.
- **Chart specs**: Each chart is identified by a string key. Its metadata (type, series, domains, etc.) is defined in `src/specs/chartsInfo.js`.
- **Responsive charts**: Chart width is capped by `maxChartWidth` and scales down on smaller viewports using `useMediaQuery`.

## Security & CI

- CodeQL analysis runs on every push/PR to `main` (`.github/workflows/codeql-analysis.yml`).
- Avoid introducing `eval`, dynamic `require`, or un-sanitised HTML (`dangerouslySetInnerHTML`) without review.
- Markdown pages are rendered via `react-markdown` with `rehype-raw`; be cautious when adding new rehype plugins.
