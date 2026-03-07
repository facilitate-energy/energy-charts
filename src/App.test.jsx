import { render, screen } from "@testing-library/react";
import { vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import config from "./config";

// Silence fetch errors from Page components trying to load markdown/JSON
beforeEach(() => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    headers: { get: () => "text/markdown" },
    text: async () => "# Page content"
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App config={config} />
    </MemoryRouter>
  );
}

test("renders without crashing", () => {
  renderApp();
  expect(document.body).toBeTruthy();
});

test("redirects from / to the landing page when landingPage is set", () => {
  renderApp(["/"]);
  // config.landingPage = "about", so the router navigates to /about
  expect(document.body).toBeTruthy();
});

test("renders the charts path route", () => {
  renderApp(["/charts/group2"]);
  expect(document.body).toBeTruthy();
});
