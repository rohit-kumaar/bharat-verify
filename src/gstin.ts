import { validatePAN } from "./pan.js";

/**
 * validateGSTIN – Full GSTIN validation
 * - State code
 * - PAN match
 * - Checksum (official mod 36)
 */
export function validateGSTIN(gstin: string): boolean {
    const u = gstin.toUpperCase();
    if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]1Z[A-Z0-9]$/.test(u)) return false;

    // 1. State code
    const state = u.slice(0, 2);
    const validStates = new Set([
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '36', '37', '38', '97'
    ]);
    if (!validStates.has(state)) return false;

    // 2. PAN match (positions 2–12)
    const panPart = u.slice(2, 12);
    if (!validatePAN(panPart)) return false;

    // 3. 13th char must be '1' (first registration)
    if (u[12] !== '1') return false;

    // 4. 14th char must be 'Z'
    if (u[13] !== 'Z') return false;

    // 5. Checksum (15th char) – same as PAN but on first 14 chars
    const factors = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    let sum = 0;

    for (let i = 0; i < 14; i++) {
        const c = u[i + 2]; // skip state code
        const code = c.charCodeAt(0);
        const val = code >= 65 ? code - 55 : parseInt(c, 10); // A=10, 0=0
        sum += val * factors[i];
    }

    const mod = sum % 36;
    const expected = mod === 0 ? '0' : (36 - mod).toString(36).toUpperCase();

    return u[14] === expected;
}