export function validatePhone(phone: string): boolean {
    const clean = phone.replace(/\D/g, '');
    if (clean.length !== 10 && clean.length !== 12) return false;
    if (clean.length === 12 && !clean.startsWith('91')) return false;
    const num = clean.length === 12 ? clean.slice(2) : clean;
    return /^[6-9]\d{9}$/.test(num);
}