import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";
const heading = { eyebrow: "GET IN TOUCH", heading: "Contact Me" };
function fill() { fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Alex" } }); fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hello" } }); fireEvent.change(screen.getByLabelText("Email"), { target: { value: "alex@example.com" } }); fireEvent.change(screen.getByLabelText("Message"), { target: { value: "A message" } }); }
describe("Contact", () => { afterEach(() => vi.unstubAllGlobals());
  it("blocks invalid input", () => { const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher); render(<Contact heading={heading} />); fireEvent.click(screen.getByRole("button", { name: /send message/i })); expect(fetcher).not.toHaveBeenCalled(); expect(screen.getAllByText("This field is required.")).toHaveLength(4); });
  it("clears values after success", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true })); render(<Contact heading={heading} />); fill(); fireEvent.click(screen.getByRole("button", { name: /send message/i })); await screen.findByText("Message sent successfully."); expect(screen.getByLabelText("Name")).toHaveValue(""); });
  it("retains values after failure", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false })); render(<Contact heading={heading} />); fill(); fireEvent.click(screen.getByRole("button", { name: /send message/i })); await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument()); expect(screen.getByLabelText("Name")).toHaveValue("Alex"); });
});
