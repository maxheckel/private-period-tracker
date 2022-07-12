import { getCookie, KEY } from "@/services/cookies";
import { AES, enc } from "crypto-ts";
import { v4 as uuidv4 } from "uuid";

export function encrypt(input: string, key: string | null = null): string {
  if (key === null) {
    key = getCookie(KEY);
  }
  if (key) {
    return AES.encrypt(input, key).toString();
  }
  throw new Error("No key found, please log in");
}

export function decrypt(input: string, key: string | null = null): string {
  if (key === null) {
    key = getCookie(KEY);
  }
  if (key) {
    return AES.decrypt(input, key).toString(enc.Utf8);
  }
  throw new Error("No key found, please log in.");
}

export function UUID(): string {
  return uuidv4();
}
