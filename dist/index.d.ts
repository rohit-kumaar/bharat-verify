declare const PAN_REGEX: RegExp;
declare const VALID_ENTITY_CHARS = "PCHFATBLJG";
declare const LETTER_AZ_REGEX: RegExp;
declare const ONLY_LETTERS_REGEX: RegExp;
type PANValidationResult = {
    valid: boolean;
    error?: string;
    message?: string;
};
/**
 * validatePAN – KYC-grade PAN + Surname validation
 * @param pan - 10-char PAN
 * @param surname - User's surname (must match 5th char)
 */
declare function validatePAN(pan: string, surname: string): PANValidationResult;

export { LETTER_AZ_REGEX, ONLY_LETTERS_REGEX, PAN_REGEX, VALID_ENTITY_CHARS, validatePAN };
