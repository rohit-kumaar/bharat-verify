import { validatePAN } from "./pan.js";

export const GSTIN_FORMAT_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[A-Z0-9]$/;
export const GSTIN_ENTITY_CODE_REGEX = /^[1-9A-Z]$/; // 13th char: 1–9 or A–Z

export const VALID_STATE_CODES = new Set([
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "97"
]);

type GSTINValidationResult = {
    valid: boolean;
    error?: string;
    message?: string;
};

export function validateGSTIN(gstin: string, surname: string): GSTINValidationResult {
    // 1. Must be string
    if (gstin == null || typeof gstin !== "string") {
        return { valid: false, error: "GSTIN must be a non-empty string" };
    }

    // 2. Normalize
    const input = gstin.trim().toUpperCase();

    // 3. Length check
    if (input.length !== 15) {
        return { valid: false, error: "GSTIN must be exactly 15 characters" };
    }

    // 4. Format regex
    if (!GSTIN_FORMAT_REGEX.test(input)) {
        return { valid: false, error: "Invalid GSTIN format. Expected: 27AAAAA0000A1Z5" };
    }

    // 5. State code
    const stateCode = input.slice(0, 2);
    if (!VALID_STATE_CODES.has(stateCode)) {
        return { valid: false, error: "Invalid state code in GSTIN" };
    }

    // 6. Entity code (13th char)
    const entityCode = input[12];
    if (!GSTIN_ENTITY_CODE_REGEX.test(entityCode)) {
        return { valid: false, error: "13th character must be 1-9 or A-Z (entity code)" };
    }

    // 7. 14th char = Z
    if (input[13] !== "Z") {
        return { valid: false, error: "14th character must be Z" };
    }

    // 8. PAN + surname match
    const panFromGSTIN = input.slice(2, 12);
    const panResult = validatePAN(panFromGSTIN, surname);

    if (!panResult.valid) {
        return {
            valid: false,
            error: panResult.error || "PAN embedded in GSTIN does not match surname",
        };
    }

    // Success
    return {
        valid: true,
        message: "GSTIN is valid",
    };
}