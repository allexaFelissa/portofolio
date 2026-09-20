"use client";

import { useEffect, type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  variant?: "centered" | "bottom-sheet";
  children: ReactNode;
}

export function Modal({ open, onClose, labelledBy, variant = "centered", children }: ModalProps) {
  const dialogRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const position = variant === "bottom-sheet"
    ? "items-end sm:items-center"
    : "items-center";
  const panel = variant === "bottom-sheet"
    ? "w-full max-h-[90vh] rounded-t-panel sm:max-w-lg sm:rounded-panel"
    : "w-[calc(100%-2rem)] max-w-lg rounded-panel";

  return (
    <div className={`fixed inset-0 z-50 flex justify-center p-4 ${position}`} role="presentation">
      <button aria-label="Close dialog" className="absolute inset-0 cursor-default bg-primary/10 backdrop-blur-sm" onClick={onClose} type="button" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={labelledBy} tabIndex={-1} className={`relative max-h-[calc(100vh-2rem)] overflow-auto border border-border bg-bg shadow-card-hover ${panel}`}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
