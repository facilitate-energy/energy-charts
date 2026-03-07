import { render, screen, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";
import App from "./App";
import config from "./config";

// Mock fetch: return JSON for data files, markdown for page files
beforeEach(() => {
  vi.spyOn(global, "fetch").mockImplementation((url) => {
    if (url.includes("/data/")) {
      return Promise.resolve({
        headers: { get: () => "application/json" },
        json: async () => ({ data: [] })
      });
    }
    return Promise.resolve({
      headers: { get: () => "text/markdown" },
      text: async () => "# Page content"
    });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Renders the current pathname so redirect tests can assert on it
function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App config={config} />
      <LocationDisplay />
    </MemoryRouter>
  );
}

test("renders without crashing", () => {
  renderApp();
  expect(document.body).toBeTruthy();
});

test("redirects / to /about", async () => {
  renderApp(["/"]);
  await waitFor(() => {
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      `/${config.landingPage}`
    );
  });
});

test("redirects /charts to /charts/group1/subgroup1", async () => {
  const firstRoute = config.routes[0];
  const firstSubRoute = firstRoute.routes[0];
  const expectedPath = `/charts/${firstRoute.path}/${firstSubRoute.path}`;

  renderApp(["/charts"]);
  await waitFor(() => {
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      expectedPath
    );
  });
});

test("renders the charts path route", () => {
  renderApp(["/charts/group2"]);
  expect(document.body).toBeTruthy();
});
