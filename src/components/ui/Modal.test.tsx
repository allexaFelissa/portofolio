import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Modal } from "./Modal";

function ModalExample() {
  const [open, setOpen] = useState(false);
  return <><button type="button" onClick={() => setOpen(true)}>Open dialog</button><Modal open={open} onClose={() => setOpen(false)} labelledBy="dialog-title"><h2 id="dialog-title">Project details</h2><button type="button" onClick={() => setOpen(false)}>Close</button><button type="button">Next</button></Modal></>;
}

describe("Modal", () => {
  it("opens, closes with Escape, restores trigger focus, and uses a blurred backdrop", () => {
    render(<ModalExample />);
    const trigger = screen.getByRole("button", { name: "Open dialog" });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Project details" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close dialog" })).toHaveClass("backdrop-blur-sm");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps tab focus inside the dialog", () => {
    render(<ModalExample />);
    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    const close = screen.getByRole("button", { name: "Close" });
    const next = screen.getByRole("button", { name: "Next" });
    next.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(close).toHaveFocus();
  });
});
