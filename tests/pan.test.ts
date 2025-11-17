// tests/pan.test.ts
import { validatePAN, PAN_REGEX, VALID_ENTITY_CHARS, LETTER_AZ_REGEX } from "../src/pan.js";

describe("PAN Validation - Surname Verification", () => {

    test("Exports the correct constants", () => {
        expect(PAN_REGEX.test("ABCDE1234F")).toBe(true);
        expect(PAN_REGEX.test("ABCDE123F")).toBe(false);

        expect(VALID_ENTITY_CHARS).toBe("PCHFATBLJG");
        expect(VALID_ENTITY_CHARS.includes("P")).toBe(true);
        expect(VALID_ENTITY_CHARS.includes("X")).toBe(false);

        expect(LETTER_AZ_REGEX.test("K")).toBe(true);
        expect(LETTER_AZ_REGEX.test("1")).toBe(false);
    })

    // 1. PAN: type + length
    test("Rejects PAN numbers that are not 10 characters long", () => {
        expect(validatePAN("ABCPK1234", "Kumar").valid).toBe(false);
        expect(validatePAN("ABCPK1234ZZ", "Kumar").valid).toBe(false);
        expect(validatePAN(" ABCPK1234ZZ", "Kumar").valid).toBe(false);
        expect(validatePAN(null as any, "Kumar").valid).toBe(false);
        expect(validatePAN(undefined as any, "Kumar").valid).toBe(false);
        expect(validatePAN(1234567890 as any, "Kumar").valid).toBe(false);
    });

    // 2. Format
    test("Validates PAN using the correct regex", () => {
        expect(validatePAN("ABCPK123ZZ", "Kumar").valid).toBe(false);
        expect(validatePAN("ABCP1123ZZ", "Kumar").valid).toBe(false);
    });

    test("Is case-insensitive", () => {
        expect(validatePAN("abcPK1234z", "KUMAR").valid).toEqual(true);
    });

    test("Rejects non-string PAN inputs", () => {
        expect(validatePAN(null as any, "Kumar").valid).toBe(false);
        expect(validatePAN(undefined as any, "Kumar").valid).toBe(false);
        expect(validatePAN(1234567890 as any, "Kumar").valid).toBe(false);
    });

    test("Rejects PAN values that fail the regex", () => {
        expect(validatePAN("ABCDE1234FXYZ", "Kumar").error).toBe("PAN must be a 10-character string");
    });

    // 3. Entity type
    test("Validates 4th character permitted entity types", () => {
        const entities = VALID_ENTITY_CHARS.split("");
        entities.forEach((char) => {
            const pan = `ABC${char}K1234Z`;
            expect(validatePAN(pan, "Kumar").valid).toBe(true);
            expect(validatePAN(pan, "Rong").valid).toBe(false);
        });
    });

    // 4. Surname: type check FIRST
    test("Accepts matching surname", () => {
        expect(validatePAN("ABCPK1234Z", "Kumar").valid).toBe(true);
        expect(validatePAN("ABCPa1234Z", "alok").valid).toBe(true);
        expect(validatePAN("HUFTR5678K", "Kapoor").error).toEqual(
            "PAN 5th char 'R' must match surname start 'K'"
        );
        expect(validatePAN("ABCPK1234Z", "  kumar  ").valid).toBe(true);
    });

    test("Rejects non-string surname inputs", () => {
        expect(validatePAN("ABCPK1234Z", null as any).valid).toBe(false);
        expect(validatePAN("ABCPK1234Z", undefined as any).valid).toBe(false);
        expect(validatePAN("ABCPK1234Z", 123 as any).valid).toBe(false);
    });

    // 5. Trim once
    test("Rejects empty or whitespace-only surname", () => {
        expect(validatePAN("ABCPK1234Z", "").valid).toBe(false);
        expect(validatePAN("ABCPK1234Z", "   ").valid).toBe(false);
    });

    // 6. Surname only must letters
    test("Ensures surname contains only alphabetic letters", () => {
        expect(validatePAN("ABCPK1234Z", "5umar").valid).toBe(false);
        expect(validatePAN("ABCPK1234Z", "Kumar1234").valid).toBe(false);
    });

    // 7. First surname letter
    test("Ensures surname starts with a valid letter", () => {
        expect(validatePAN("ABCPM1234Z", "@alik").valid).toBe(false);
        expect(validatePAN("ABCPM1234Z", "#alik").valid).toBe(false);
        expect(validatePAN("ABCPM1234Z", " alik").valid).toBe(false);
    })

    // 8. Match 5th char
    test("Rejects PAN numbers whose 5th character does not match the surname's first letter", () => {
        expect(validatePAN("ABCPM1234Z", "Malik").valid).toBe(true);
        expect(validatePAN("ABCPm1234Z", "malik").valid).toBe(true);
        expect(validatePAN("ABCPK1234Z", "Sharma").valid).toBe(false);
        expect(validatePAN("ABCPK1234Z", "sharma").valid).toBe(false);
        expect(validatePAN("ABCP@1234Z", "sharma").valid).toBe(false);
    });

})