// 1. Regex for PAN format
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// 2. Valid 4th characters (Entity types)
export const VALID_ENTITY_CHARS = "PCHFATBLJG";

// 3. Regex for A-Z letter (reused for surname first letter)
export const LETTER_AZ_REGEX = /[A-Z]/;

// 4. NEW: Surname must contain ONLY letters (no digits, symbols, spaces)
export const ONLY_LETTERS_REGEX = /^[A-Za-z]+$/;

// 5. Result type
type PANValidationResult = {
    valid: boolean;
    error?: string;
};

/**
 * validatePAN – KYC-grade PAN + Surname validation
 * @param pan - 10-char PAN
 * @param surname - User's surname (must match 5th char)
 */
export function validatePAN(pan: string, surname: string): PANValidationResult {
    // 1. PAN: type + length
    if (typeof pan !== "string" || pan.length !== 10) {
        return {
            valid: false,
            error: "PAN must be a 10-character string"
        };
    }

    const u = pan.toUpperCase();

    // 2. Format
    if (!PAN_REGEX.test(u)) {
        return {
            valid: false,
            error: "Invalid PAN format. Must be 5 letters + 4 digits + 1 letter",
        };
    }

    // 3. Entity type
    const fourthChar = u[3];
    if (!VALID_ENTITY_CHARS.includes(fourthChar)) {
        return {
            valid: false,
            error: "Invalid entity type (4th character)"
        };
    }

    // 4. Surname: type check FIRST
    if (typeof surname !== "string") {
        return {
            valid: false,
            error: "Surname must be a string"
        };
    }

    // 5. Trim once
    const trimmed = surname.trim();
    if (trimmed.length === 0) {
        return {
            valid: false,
            error: "Surname cannot be empty"
        };
    }

    // 6. NEW: Surname must contain ONLY letters (A-Z, a-z)
    if (!ONLY_LETTERS_REGEX.test(trimmed)) {
        return {
            valid: false,
            error: "Surname must contain only letters (A-Z). No digits, spaces, or symbols allowed.",
        };
    }

    // 7. First surname letter
    const firstSurnameLetter = trimmed.toUpperCase()[0];
    if (!LETTER_AZ_REGEX.test(firstSurnameLetter)) {
        return {
            valid: false,
            error: "Surname must start with a letter (A-Z)"
        };
    }

    // 8. Match 5th char
    const fifthChar = u[4];
    if (fifthChar !== firstSurnameLetter) {
        return {
            valid: false,
            error: `PAN 5th char '${fifthChar}' must match surname start '${firstSurnameLetter}'`,
        };
    }

    return {
        valid: true
    };
}
