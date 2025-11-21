# bharat-verify

A powerful and lightweight `validation library` for Indian. Perfect for KYC systems, fintech apps, banking workflows, onboarding processes, and verification pipelines. Easy to integrate, fully typed, and optimized for performance.

- [PAN Number](#1️⃣-PAN-Validation-Surname-Verification)
- [Aadhaar Number](#2️⃣-Aadhaar-Validation)
- [Mobile Number](#3️⃣-Indian-Mobile-Number-Validation)
- [IFSC Code](#4️⃣-Indian-Bank-IFSC-Code-Validation)

It returns a `JSON` response such as:

```ts
 { valid: boolean, error?: string,  message?: string }
```

## 1️⃣ PAN Validation - Surname Verification

```ts
 validatePAN(pan: string, surname: string)
```

#### 🧪 TESTED

```js
validatePAN(null | undefined | 1234567890, "Kumar")              // false
validatePAN("ABCPK1234Z", null | undefined | 12345)              // false
validatePAN("ABCPK1234Z", "kum123" | "@kum" | "#kum" | " kumar") // false
validatePAN("ABCPK1234Z", "" | "  ")                             // false
validatePAN("ABCPK1234?", "Kumar")                               // false
validatePAN("XXXXXXXXZX", "Kumar")                               // false
validatePAN(" ABCPK1234ZZ", "Kumar")                             // false
validatePAN("XXXXDXXXXZX", "KXXXXX")                             // false
validatePAN("abcPK1234z", "KUMAR")                               // true
validatePAN("XXX[ P|C|H|F|A|T|B|L|J|G ]XXXXXX", "Kumar")         // true
```

## 2️⃣ Aadhaar Validation

```ts
 validateAadhaar(aadhaar: string | number);
```

#### 🧪 TESTED

```js
validateAadhaar(null | undefined | "" | "  ")    // false
validateAadhaar("   234123412346   ")            // true
validateAadhaar("\t\n  234123412346  \r\n")      // true
validateAadhaar(234123412346)                    // true
validateAadhaar("XXXX XXXX XXXX")                // false
validateAadhaar("XXXX-XXXX-XXXX")                // false
validateAadhaar("0XXXXXXXXXXX" | "1XXXXXXXXXXX") // false
```

## 3️⃣ Indian Mobile Number Validation

```ts
 validateMobile(mobile: string | number)
```

#### 🧪 TESTED

```js
validateMobile(6203306876 | 7203306876 | 8765432109)               // true
validateMobile("+919876543210" | "91 9876543210")                  // true
validateMobile(" 98765 43210 " | "(98765) 43210" | "98765-432-10") // true
validateMobile("5XXXXXXXXX" | "0XXXXXXXXX")                        // false
validateMobile("987654321" | "98765432109")                        // false
```

## 4️⃣ Indian Bank IFSC Code Validation

```ts
 validateIFSC(ifsc: string)
```

#### 🧪 TESTED

```js
validateIFSC(" " | null | undefined)               // false     
validateIFSC("  sbin0001234 " | "\tHDFC0005678\n") // true
validateIFSC("SBIN000123" | "SBIN00012345")        // false
validateIFSC("XXXX1XXXXXX")                        // false
```

## Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/-rohit-kumaar/)
