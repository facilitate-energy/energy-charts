import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageLoading from "./PageLoading";

describe("PageLoading", () => {
  test("renders a loading spinner", () => {
    render(<PageLoading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders visually-hidden Loading text for screen readers", () => {
    const { container } = render(<PageLoading />);
    const hiddenText = container.querySelector(".visually-hidden");
    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveTextContent("Loading...");
  });

  test("renders a visible Loading heading", () => {
    render(<PageLoading />);
    expect(
      screen.getByRole("heading", { name: "Loading..." })
    ).toBeInTheDocument();
  });
});
