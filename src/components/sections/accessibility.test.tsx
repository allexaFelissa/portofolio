import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Contact } from "./Contact";
describe("section accessibility", () => { it("has labeled form controls and no detectable axe violations", async () => { const { container } = render(<Contact heading={{ eyebrow: "GET IN TOUCH", heading: "Contact Me" }} />); expect(await axe(container)).toHaveNoViolations(); }); });
