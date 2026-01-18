import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Validation SIREN (9 chiffres)
export function validateSIREN(siren: string): boolean {
  if (!/^\d{9}$/.test(siren)) return false;
  
  // Algorithme de Luhn pour validation SIREN
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(siren[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

// Format téléphone français
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return phone;
}

// Validation email
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validation téléphone français
export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return /^(?:(?:\+|00)33|0)[1-9](?:\d{8})$/.test(cleaned);
}
