import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "./NavBar";

const navLinks = [
  { to: "/about", text: "About" },
  { to: "/charts", text: "Charts" }
];

const navBrand = { brand: "Energy Charts", to: "/" };

function renderNavBar(props = {}) {
  return render(
    <MemoryRouter>
      <NavBar navLinks={navLinks} navBrand={navBrand} {...props} />
    </MemoryRouter>
  );
}

describe("NavBar", () => {
  test("renders the brand name", () => {
    renderNavBar();
    expect(screen.getByText("Energy Charts")).toBeInTheDocument();
  });

  test("renders all nav link texts", () => {
    renderNavBar();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Charts")).toBeInTheDocument();
  });

  test("nav links point to correct hrefs", () => {
    const { container } = renderNavBar();
    const aboutLink = container.querySelector('a[href="/about"]');
    const chartsLink = container.querySelector('a[href="/charts"]');
    expect(aboutLink).toBeInTheDocument();
    expect(chartsLink).toBeInTheDocument();
  });

  test("renders the toggle button for mobile", () => {
    renderNavBar();
    expect(
      screen.getByRole("button", { name: /toggle navigation/i })
    ).toBeInTheDocument();
  });
});
