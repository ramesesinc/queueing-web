import { phoneNumberFormatter } from "./formatter";

export function required(value: any) {
  return value ? undefined : "Required";
}

export function validateEmail(value: any) {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return isValidEmail ? undefined : "Invalid Email Address";
}

export const validatePhone = (value: string) => {
  if (!value) return "Phone number is required";

  const numericValue = value.replace(/[^\d]/g, "");

  if (numericValue.length !== 11) {
    return "Phone number must be exactly 11 digits";
  }

  const formattedValue = phoneNumberFormatter(value);
  const isValid = formattedValue.match(/^\(\d{4}\) \d{3}-\d{4}$/);

  if (!isValid) {
    return "Invalid phone number format";
  }

  return undefined;
};
