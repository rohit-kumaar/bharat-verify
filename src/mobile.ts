export const MOBILE_REGEX = /^[6-9]\d{9}$/;

export type MobileValidationResult = {
    valid: boolean;
    error?: string;
    message?: string;
};

/**
 * validateMobile – Validates Indian mobile number
 * Accepts: string | number
 * Accepts: with/without +91, spaces, dashes
 * Rejects: 0/1/2/3/4/5 start, wrong length, non-digits
 *
 * @example
 * validateMobile("9876543210")        → valid
 * validateMobile("+91 98765 43210")   → valid
 * validateMobile("09876543210")       → invalid (starts with 0)
 */
export function validateMobile(mobile: string | number): MobileValidationResult {
    // Convert to string and remove common separators
    let cleaned = String(mobile)
        .trim()
        .replace(/[\s+()-]/g, ""); // removes space, +, -, (, ), -, +

    // Remove country code if present
    if (cleaned.startsWith("91") && cleaned.length === 12) {
        cleaned = cleaned.slice(2); // remove 91 → left with 10 digits
    }

    // Final check: must be exactly 10 digits and start with 6–9
    if (!MOBILE_REGEX.test(cleaned)) {
        return {
            valid: false,
            error: "Invalid mobile number. Must be 10 digits and start with 6-9",
        };
    }

    return {
        valid: true,
        message: "Mobile number is valid.",
    };
}