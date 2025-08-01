// Email validation (simple regex)
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password validation (min 6 chars, one number, one letter)
export function isValidPassword(pw) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(pw);
}

// Checks if a value is not empty (string or array)
export function isRequired(val) {
  return val && val.length > 0;
}
