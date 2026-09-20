import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import fc from "fast-check";
import { nonBlankString } from "@/test/arbitraries";

describe("test harness smoke", () => {
  it("registers @testing-library/jest-dom matchers and renders React", () => {
    render(<button type="button">Click me</button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("runs fast-check property tests", () => {
    fc.assert(
      fc.property(nonBlankString(), (s) => {
        expect(s.trim().length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("registers jest-axe toHaveNoViolations matcher", async () => {
    const { container } = render(
      <main>
        <h1>Accessible heading</h1>
        <img src="/x.png" alt="" />
      </main>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
