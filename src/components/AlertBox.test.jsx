import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AlertBox from "./AlertBox";

describe("AlertBox", () => {
  test("renders heading text when heading prop is provided", () => {
    render(<AlertBox heading="Warning" variant="warning" />);
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  test("renders body text when text prop is provided", () => {
    render(<AlertBox text="Something went wrong." variant="danger" />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  test("renders both heading and text when both props are provided", () => {
    render(<AlertBox heading="Info" text="All good." variant="info" />);
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("All good.")).toBeInTheDocument();
  });

  test("does not render heading element when heading is not provided", () => {
    render(<AlertBox text="Only text" variant="success" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  test("does not render paragraph when text is not provided", () => {
    const { container } = render(
      <AlertBox heading="Only heading" variant="primary" />
    );
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });
});
