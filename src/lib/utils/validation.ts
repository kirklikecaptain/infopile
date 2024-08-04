const validRegex = {
  username: /^[a-zA-Z0-9_-]{3,50}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,40}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  slug: /^[a-z0-9_-]+$/
};

export function validateInput(type: keyof typeof validRegex, value: unknown): value is string {
  return typeof value === "string" && validRegex[type].test(value);
}
