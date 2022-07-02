import { getCookie, KEY } from "@/services/cookies";
import { AES, enc } from "crypto-ts";

export function encrypt(input: string): string {
  const key = getCookie(KEY);
  if (key) {
    return AES.encrypt(input, key).toString();
  }
  throw new Error("No key found, please log in");
}

export function decrypt(input: string): string {
  const key = getCookie(KEY);
  if (key) {
    return AES.decrypt(input, key).toString(enc.Utf8);
  }
  throw new Error("No key found, please log in.");
}
