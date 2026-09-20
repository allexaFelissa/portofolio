// Vitest global setup: registers custom matchers used across the test suite.
// - @testing-library/jest-dom adds DOM assertion matchers (e.g. toBeInTheDocument).
// - jest-axe adds toHaveNoViolations for accessibility assertions.
import "@testing-library/jest-dom/vitest";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Ensure the DOM is reset between tests to avoid cross-test leakage.
afterEach(() => {
  cleanup();
});
