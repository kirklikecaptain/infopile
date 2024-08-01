export function isValidUsername(username: unknown): username is string {
  return (
    typeof username === "string" &&
    /^[a-z0-9_-]+$/.test(username) &&
    username.length > 2 &&
    username.length < 31
  );
}

export function isValidPassword(password: unknown): password is string {
  return typeof password === "string" && password.length > 5 && password.length < 255;
}

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /.+@.+/.test(email);
}
