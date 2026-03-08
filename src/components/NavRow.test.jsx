import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavRow from "./NavRow";

const navLinks = [
  { to: "/about", text: "About" },
  { to: "/charts", text: "Charts" }
];

function renderNavRow(props = {}) {
  return render(
    <MemoryRouter>
      <NavRow navLinks={navLinks} variant="tabs" {...props} />
    </MemoryRouter>
  );
}

describe("NavRow", () => {
  test("renders all nav links", () => {
    renderNavRow();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Charts")).toBeInTheDocument();
  });

  test("renders the correct number of links", () => {
    renderNavRow();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(navLinks.length);
  });

  test("links have correct href values", () => {
    renderNavRow();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByRole("link", { name: "Charts" })).toHaveAttribute(
      "href",
      "/charts"
    );
  });

  test("renders a nav element", () => {
    renderNavRow();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
