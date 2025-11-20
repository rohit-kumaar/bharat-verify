import { validateIFSC } from "../src/ifsc.js";

describe("ValidateIFSC - Indian Bank IFSC Code Validation", () => {

    test("Rejects empty/null/undefined", () => {
        expect(validateIFSC("").error).toBe("IFSC code is required");
        expect(validateIFSC(null as any).error).toBe("IFSC code is required");
        expect(validateIFSC(undefined as any).error).toBe("IFSC code is required");
    });

    test("accepts string input and trims whitespace", () => {
        expect(validateIFSC("  sbin0001234 ").valid).toBe(true);
        expect(validateIFSC("\tHDFC0005678\n").valid).toBe(true);
    });

    test("Is case-insensitive", () => {
        expect(validateIFSC("sbin0001234").valid).toBe(true);
    });

    test("Rejects wrong length", () => {
        expect(validateIFSC("SBIN000123").error).toContain("11 characters");
        expect(validateIFSC("SBIN00012345").error).toContain("11 characters");
    });

    test("Rejects missing 4th zero", () => {
        expect(validateIFSC("SBIN1001234").error).toContain("Invalid IFSC code. Expected: ABCD0XXXXXX");
    });

    test("Accepts valid IFSC codes", () => {
        const validCodes = [
            "SBIN0001234",
            "HDFC0005678",
            "ICIC0004321",
            "KKBK0009876",
            "UTIB0001111",
            "BARB0VASNAB",
            "PUNB0ABCDE1"
        ];
        validCodes.forEach(code => {
            expect(validateIFSC(code)).toEqual({
                valid: true,
                message: "Valid IFSC code"
            });
        });
    });
});