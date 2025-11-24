// tests/gstin.test.ts
import { validateGSTIN, GSTIN_FORMAT_REGEX, GSTIN_ENTITY_CODE_REGEX, VALID_STATE_CODES } from "../src/gstin.js";

describe("validateGSTIN - Full GSTIN Validation Suite", () => {

    test("Rejects null, undefined, empty", () => {
        expect(validateGSTIN(null as any, "Kumar").valid).toBe(false);
        expect(validateGSTIN(undefined as any, "Kumar").error).toBe("GSTIN must be a non-empty string");
        expect(validateGSTIN(123456789012345 as any, "Kumar").error).toBe("GSTIN must be a non-empty string");
        expect(validateGSTIN("", "Kumar").valid).toBe(false);
        expect(validateGSTIN("   ", "Kumar").valid).toBe(false);
    });

    test("Accepts string and trims whitespace", () => {
        expect(validateGSTIN(" 27AAAAA0000A1Z5 ", "Anand").valid).toBe(true);
        expect(validateGSTIN("\t07BBBBB1111B1Z9\n", "Bajaj").valid).toBe(true);
    });

    test("Rejects wrong length", () => {
        expect(validateGSTIN("27AAAAA0000A1Z", "A").valid).toBe(false);
        expect(validateGSTIN("27AAAAA0000A1Z55", "A").valid).toBe(false);
    });

    test("Accepts valid format via GSTIN_FORMAT_REGEX", () => {
        expect(GSTIN_FORMAT_REGEX.test("27AAAAA0000A1Z5")).toBe(true);
        expect(GSTIN_FORMAT_REGEX.test("07BBBBB1111B2Z9")).toBe(true);
        expect(GSTIN_FORMAT_REGEX.test("36CCCCC2222C9ZA")).toBe(true);
    });

    test("Rejects invalid state code", () => {
        expect(VALID_STATE_CODES.has("27")).toBe(true);
        expect(VALID_STATE_CODES.has("07")).toBe(true);
        expect(VALID_STATE_CODES.has("38")).toBe(true);
        expect(VALID_STATE_CODES.has("97")).toBe(true);
        expect(VALID_STATE_CODES.has("98")).toBe(false);
        expect(validateGSTIN("00AAAAA0000A1Z5", "A").valid).toBe(false);
        expect(validateGSTIN("40AAAAA0000A1Z5", "A").valid).toBe(false);
        expect(validateGSTIN("99AAAAA0000A1Z5", "A").valid).toBe(false);
    });

    test("Accepts 1-9 and A-Z", () => {
        expect(GSTIN_ENTITY_CODE_REGEX.test("1")).toBe(true);
        expect(GSTIN_ENTITY_CODE_REGEX.test("5")).toBe(true);
        expect(GSTIN_ENTITY_CODE_REGEX.test("A")).toBe(true);
        expect(GSTIN_ENTITY_CODE_REGEX.test("Z")).toBe(true);
        expect(GSTIN_ENTITY_CODE_REGEX.test("@")).toBe(false);
        expect(GSTIN_ENTITY_CODE_REGEX.test("#")).toBe(false);
    });

    test("Rejects if 14th char is not Z", () => {
        expect(validateGSTIN("27AAAAA0000A1X5", "A").valid).toBe(false);
        expect(validateGSTIN("27AAAAA0000A1z5", "A").valid).toBe(true);
    });

    test("Passes when PAN's 5th char matches surname first letter", () => {
        expect(validateGSTIN("27AKUMAR1234D1Z5", "Kumar").valid).toBe(false);
        expect(validateGSTIN("07BSINGH5678H1Z9", "Singh").valid).toBe(false);
        expect(validateGSTIN("36CRAJRSH999E1ZA", "Rajesh").valid).toBe(false);
    });

    test("Common valid GSTINs", () => {
        const examples = [
            { gstin: "27AAAAA0000A1Z5", surname: "Anand" },
            { gstin: "07BQWPS1234F1Z5", surname: "Sharma" },
            { gstin: "36CCCCC9999C1Z9", surname: "Chopra" },
            { gstin: "09DELHI1234D2Z1", surname: "Ielhi" },
            { gstin: "09DELHI1234D2Z1", surname: " Ielhi" },
        ];
        examples.forEach(({ gstin, surname }) => {
            expect(validateGSTIN(gstin, surname).valid).toBe(true);
        });
    });

});