import { eraseCookie, getCookie, setCookie } from "@/services/cookies";
import { Md5 } from "ts-md5";

export function register(password: string) {
  if (!password) {
    throw new Error("Password cannot be empty");
  }
  if (password.length < 7) {
    throw new Error("Password must be at least 7 characters");
  }
  const salt = crypto.randomUUID();
  setCookie("salt", salt, 36500);
  login(password, salt);
}

export function isAuthed(): boolean {
  return !!getCookie("key");
}

export function login(password: string, salt: string | null = null) {
  if (!salt) {
    salt = getCookie("salt");
  }
  if (salt) {
    const key = Md5.hashStr(salt + password);
    setCookie("key", key, 7);
  }
}

export function logout() {
  eraseCookie("key");
}
