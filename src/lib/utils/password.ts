import { hash, verify } from "@node-rs/argon2";

const hashConfig = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1
};

export async function hashPassword(password: string) {
  return await hash(password, hashConfig);
}

export async function checkPassword(password: string, passwordHash: string) {
  return await verify(passwordHash, password, hashConfig);
}
