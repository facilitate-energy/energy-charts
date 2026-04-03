import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("NotFound", () => {
  test("renders a Page Not Found heading", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: /page not found/i })
    ).toBeInTheDocument();
  });

  test("renders a descriptive message", () => {
    render(<NotFound />);
    expect(screen.getByText(/could not be found/i)).toBeInTheDocument();
  });
});
