import {eraseCookie, getCookie, setCookie} from "@/services/cookies";
import {Md5} from "ts-md5";
import {decrypt, encrypt} from "@/services/crypto";
import {reactive} from "vue";

export const logincheckKey = "logincheck";
export const secretKey = "key";
export const saltKey = "salt";

export const account = reactive({
  isAuthed: false,
})

export function register(password: string) {
  if (!password) {
    throw new Error("Password cannot be empty");
  }
  if (password.length < 7) {
    throw new Error("Password must be at least 7 characters");
  }
  const salt = crypto.randomUUID();
  setCookie(saltKey, salt, 36500);
  login(password, salt);

}



export function isAuthed(): boolean {
  account.isAuthed = !!getCookie(secretKey);
  return account.isAuthed;
}

export function hasAccount(): boolean {
  return !!getCookie(saltKey);
}

export function login(password: string, salt: string | null = null) {
  if (!salt) {
    salt = getCookie(saltKey);
  }
  if (salt) {
    const key = Md5.hashStr(salt + password);
    setCookie(secretKey, key, 7);

    // After generating the secret key check if it can successfully be used to decrypt
    // if not then the password is incorrect.
    let logincheck = getCookie(logincheckKey);
    // If the logincheck isn't set then this is their first time logging in probably
    if (!logincheck) {
      logincheck = encrypt("success");
      setCookie(logincheckKey, logincheck, 36500);
    }
    if (decrypt(logincheck) !== "success") {
      eraseCookie(secretKey);
      throw new Error("Invalid Password");
    }
    account.isAuthed = true;
  }
}

export function logout() {
  eraseCookie(secretKey);
  account.isAuthed = false;
}
