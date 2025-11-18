# bharat-verify

A powerful and lightweight validation library for Indian PAN numbers, Aadhaar numbers, GSTIN, mobile phone numbers, and IFSC codes. Ideal for KYC, fintech, banking, and verification workflows.

It returns a JSON response such as:

```ts
 { valid: boolean, error?: string,  message?: string }
```

### 1️⃣ PAN Validation - Surname Verification

```ts
 validatePAN(pan: string, surname: string)
```

#### 🧪 TESTED

- Exports the correct constants
- Rejects PAN numbers that are not 10 characters long
- Validates PAN using the official regex
- Case-insensitive PAN matching
- Rejects non-string PAN inputs
- Rejects PAN values that fail the regex
- Validates all permitted PAN entity types
- Accepts surname when it matches PAN rules
- Rejects non-string surname inputs
- Rejects empty or whitespace-only surname
- Ensures surname contains only alphabetic letters
- Ensures surname begins with a valid letter
- Rejects PAN numbers whose 5th character does not match the surname’s first letter

### 2️⃣ Aadhaar Validation

```ts
 validateAadhaar(aadhaar: string);
```

#### 🧪 TESTED

- Removes leading and trailing whitespace
- Removes tabs, newlines, carriage returns
- Converts number to string and trims spaces
- Does NOT remove spaces in the middle (correct behavior)
- Handles null / undefined / empty string gracefully
- Real-world copy-paste from PDF/Excel (lots of spaces)
- With spaces or dashes (rejected as non-digits)
- All zeros (invalid checksum)
- Rejects if starts with 1
- Valid checksum passes
- Invalid checksum passes
