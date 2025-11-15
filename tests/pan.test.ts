// tests/pan.test.ts
import { validatePAN, PAN_REGEX, VALID_ENTITY_CHARS, LETTER_AZ_REGEX } from "../src/pan.js";

describe("validatePAN - KYC-grade PAN + Surname validation", () => {

    test("rejects PAN with spaces", () => {
        const result = validatePAN(" ABCPK1234Z ", "Kumar");
        expect(result.valid).toBe(false);
        expect(result.error).toBe("PAN must be a 10-character string");
    });

    test("valid PAN + matching surname", () => {
        expect(validatePAN("ABCPK1234Z", "Kumar")).toEqual({ valid: true });
        expect(validatePAN("CCMPR1234X", "Reddy")).toEqual({ valid: true });
        expect(validatePAN("HUFTR5678K", "Kapoor")).toEqual({
            valid: false, error: "PAN 5th char 'R' must match surname start 'K'",
        });
        expect(validatePAN("ABCPK1234Z", "  kumar  ")).toEqual({ valid: true });
    });

    test("case insensitive", () => {
        expect(validatePAN("abcPK1234z", "KUMAR")).toEqual({ valid: true });
    });

    test("invalid: pan not string", () => {
        expect(validatePAN(null as any, "Kumar").error).toBe("PAN must be a 10-character string");
        expect(validatePAN(undefined as any, "Kumar").error).toBe("PAN must be a 10-character string");
        expect(validatePAN(1234567890 as any, "Kumar").error).toBe("PAN must be a 10-character string");
    });

    test("invalid: pan length ≠ 10", () => {
        expect(validatePAN("ABCPK1234", "Kumar").error).toBe("PAN must be a 10-character string");
        expect(validatePAN("ABCPK1234ZZ", "Kumar").error).toBe("PAN must be a 10-character string");
    });

    test("invalid: wrong format (regex)", () => {
        expect(validatePAN("ABCDE123F", "Kumar")).toEqual({
            valid: false,
            error: "PAN must be a 10-character string",
        });
        expect(validatePAN("ABCD12345F", "Kumar").error).toBe("Invalid PAN format. Must be 5 letters + 4 digits + 1 letter");
        expect(validatePAN("12345ABCDZ", "Kumar").error).toBe("Invalid PAN format. Must be 5 letters + 4 digits + 1 letter");
        expect(validatePAN("ABCDE12#4Z", "Kumar").error).toBe("Invalid PAN format. Must be 5 letters + 4 digits + 1 letter");
    });


    test("valid: all entity types", () => {
        const entities = VALID_ENTITY_CHARS.split("");
        entities.forEach((char) => {
            const pan = `ABC${char}K1234Z`;
            expect(validatePAN(pan, "Kumar")).toEqual({ valid: true });
        });
    });

    test("invalid: surname not string", () => {
        expect(validatePAN("ABCPK1234Z", null as any).error).toBe("Surname must be a string");
        expect(validatePAN("ABCPK1234Z", undefined as any).error).toBe("Surname must be a string");
        expect(validatePAN("ABCPK1234Z", 123 as any).error).toBe("Surname must be a string");
    });

    test("invalid: surname empty or whitespace", () => {
        expect(validatePAN("ABCPK1234Z", "").error).toBe("Surname cannot be empty");
        expect(validatePAN("ABCPK1234Z", "   ").error).toBe("Surname cannot be empty");
    });

    test("invalid: surname does not start with letter", () => {
        expect(validatePAN("ABCPK1234Z", "Kumar").valid).toBe(true);
        expect(validatePAN("ABCPK1234Z", "  kumar  ").valid).toBe(true);
        expect(validatePAN("ABCPK1234Z", "#Kumar").error).toContain("only letters");
        expect(validatePAN("ABCPK1234Z", "123Kumar").error).toContain("only letters");
        expect(validatePAN("ABCPK1234Z", "@Kumar").error).toContain("only letters");
    });

    test("invalid: 5th char ≠ surname first letter", () => {
        expect(validatePAN("ABCPK1234Z", "Sharma").error).toContain("must match");
        expect(validatePAN("ABCPK1234Z", "sharma").error).toContain("must match");
        expect(validatePAN("ABCPM1234Z", "Kumar").error).toContain("must match");
    });

    test("exported constants are correct", () => {
        expect(PAN_REGEX.test("ABCDE1234F")).toBe(true);
        expect(PAN_REGEX.test("ABCDE123F")).toBe(false);

        expect(VALID_ENTITY_CHARS).toBe("PCHFATBLJG");
        expect(VALID_ENTITY_CHARS.includes("P")).toBe(true);
        expect(VALID_ENTITY_CHARS.includes("X")).toBe(false);

        expect(LETTER_AZ_REGEX.test("K")).toBe(true);
        expect(LETTER_AZ_REGEX.test("1")).toBe(false);
    })

})