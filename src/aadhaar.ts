
export const AADHAAR_REGEX = /^\d{12}$/;

const VERHOEFF_TABLE_D = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
] as const;

const VERHOEFF_TABLE_P = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
] as const;

type AadhaarValidationResult = {
    valid: boolean;
    error?: string;
    message?: string;
};

export function validateAadhaar(aadhaar: string | number): AadhaarValidationResult {
    const str = String(aadhaar).trim();

    if (!AADHAAR_REGEX.test(str)) {
        return { valid: false, error: "Aadhaar must be exactly 12 digits" };
    }

    if (str[0] === "0" || str[0] === "1") {
        return { valid: false, error: "Aadhaar cannot start with 0 or 1" };
    }

    if (!isValidVerhoeff(str)) {
        return { valid: false, error: "Invalid Aadhaar checksum" };
    }

    return { valid: true, message: "Aadhaar is verified." };
}

function isValidVerhoeff(num: string): boolean {
    let c = 0;
    const digits = num.split("").map(Number);

    for (let i = 0; i < 12; i++) {
        const p = VERHOEFF_TABLE_P[i % 8][digits[11 - i]];
        c = VERHOEFF_TABLE_D[c][p];
    }

    return c === 0;
}