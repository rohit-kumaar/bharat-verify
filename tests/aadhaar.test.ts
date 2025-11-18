import { validateAadhaar } from "../src/aadhaar.js";

describe("Aadhaar Validation Tests", () => {
    test("Removes leading and trailing whitespace (string input)", () => {
        const result = validateAadhaar("   234123412346   ");
        expect(result).toEqual({
            valid: true,
            message: "Aadhaar is verified."
        });
    });

    test("Removes tabs, newlines, carriage returns", () => {
        const result = validateAadhaar("\t\n  234123412346  \r\n");
        expect(result).toEqual({
            valid: true,
            message: "Aadhaar is verified."
        });
    });

    test("Converts number to string and trims spaces", () => {
        const result2 = validateAadhaar(234123412346);
        expect(result2).toEqual({
            valid: true,
            message: "Aadhaar is verified."
        });
    });

    test("Does NOT remove spaces in the middle (correct behavior)", () => {
        const result = validateAadhaar("2341 2341 2346");
        expect(result.error).toBe("Aadhaar must be exactly 12 digits");
    });

    test("Handles null / undefined / empty string gracefully", () => {
        expect(validateAadhaar(null as any).error).toBe("Aadhaar must be exactly 12 digits");
        expect(validateAadhaar(undefined as any).error).toBe("Aadhaar must be exactly 12 digits");
        expect(validateAadhaar("").error).toBe("Aadhaar must be exactly 12 digits");
        expect(validateAadhaar("   ").error).toBe("Aadhaar must be exactly 12 digits");
    });

    test("Real-world copy-paste from PDF/Excel (lots of spaces)", () => {
        const uglyInput = "      234123412346             ";
        const result = validateAadhaar(uglyInput);
        expect(result.valid).toBe(true);
    });

    test("With spaces or dashes (rejected as non-digits)", () => {
        expect(validateAadhaar("2341-2341-2346").error).toBe("Aadhaar must be exactly 12 digits");

    });

    test("All zeros (invalid checksum)", () => {
        expect(validateAadhaar("000000000000").error).toBe("Aadhaar cannot start with 0 or 1");
    });

    test("Rejects if starts with 1", () => {
        expect(validateAadhaar("034123412346").error).toBe("Aadhaar cannot start with 0 or 1");
        expect(validateAadhaar("134123412346").error).toBe("Aadhaar cannot start with 0 or 1");
    });

    test("Valid checksum passes", () => {
        expect(validateAadhaar("234123412346")).toEqual({
            valid: true,
            message: "Aadhaar is verified."
        });
    });

    test("Invalid checksum passes", () => {
        expect(validateAadhaar("234123412346")).toEqual({
            valid: true,
            message: "Aadhaar is verified."
        });
    });
});
