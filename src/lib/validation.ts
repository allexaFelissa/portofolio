export interface FieldValidationResult {
  valid: boolean;
  error?: string;
}

export const CONTACT_FIELD_LIMITS = {
  name: { min: 1, max: 100 },
  subject: { min: 1, max: 150 },
  email: { min: 1, max: 254 },
  message: { min: 1, max: 2000 },
} as const;

/** Validates the deliberately simple email rule specified for this portfolio. */
export function isValidEmail(value: string): boolean {
  const atIndex = value.indexOf("@");
  return atIndex > 0 && atIndex === value.lastIndexOf("@") && value.slice(atIndex + 1).includes(".");
}

export function validateField(value: string, min: number, max: number): FieldValidationResult {
  const length = value.trim().length;

  if (length === 0) {
    return { valid: false, error: "This field is required." };
  }
  if (length < min || length > max) {
    return { valid: false, error: `Enter between ${min} and ${max} characters.` };
  }
  return { valid: true };
}

export function isValidChatInput(question: string): boolean {
  const length = question.trim().length;
  return length >= 1 && length <= 1000;
}
