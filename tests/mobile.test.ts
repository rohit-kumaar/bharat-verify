import { validateMobile } from "../src/mobile.js";

describe("ValidateMobile - Indian Mobile Number Validation", () => {
    test("Accepts clean 10-digit number starting with 6-9", () => {
        expect(validateMobile("9876543210")).toEqual({
            valid: true,
            message: "Mobile number is valid.",
        });
    });

    test("Accepts number type", () => {
        expect(validateMobile(8765432109).valid).toBe(true);
        expect(validateMobile(6203306876).valid).toBe(true);
    });

    test("Accepts +91 prefix", () => {
        expect(validateMobile("+919876543210").valid).toBe(true);
        expect(validateMobile("91 9876543210").valid).toBe(true);
    });

    test("Accepts spaces, spaces, dashes, parentheses", () => {
        expect(validateMobile(" 98765 43210 ").valid).toBe(true);
        expect(validateMobile("(98765) 43210").valid).toBe(true);
        expect(validateMobile("98765-432-10").valid).toBe(true);
    });

    test("Rejects starting with 0-5", () => {
        expect(validateMobile("5876543210").error).toContain("start with 6-9");
        expect(validateMobile("0123456789").error).toContain("start with 6-9");
    });

    test("Rejects wrong length", () => {
        expect(validateMobile("987654321").error).toContain("10 digits");
        expect(validateMobile("98765432109").error).toContain("10 digits");
    });
});