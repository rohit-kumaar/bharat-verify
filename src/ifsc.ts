export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

type IFSCValidationResult = {
  valid: boolean;
  error?: string;
  message?: string;
};

export function validateIFSC(ifsc: string): IFSCValidationResult {

  // 1. Early guard: handle null, undefined, number, object, etc.
  if (!ifsc) {
    return { valid: false, error: "IFSC code is required" };
  }

  // 2. Normalize once
  const code = String(ifsc).trim().toUpperCase();

  // 3. Fast length check first (cheaper than regex)
  if (code.length !== 11) {
    return { valid: false, error: "IFSC must be exactly 11 characters long" };
  }

  // 4. Final regex validation
  if (!IFSC_REGEX.test(code)) {
    return {
      valid: false,
      error: "Invalid IFSC code. Expected: ABCD0XXXXXX",
    };
  }

  return { valid: true, message: "Valid IFSC code" };
}
