<template>
  <main
    class="leading-normal tracking-normal text-white gradient"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <div class="h-20"></div>
    <div class="md:grid md:grid-cols-2">
      <div class="flex flex-col sm:justify-center items-center sm:pt-0 pt-20">
        <h1 class="mt-4 text-4xl font-bold text-pink-50 leading-tight">
          Sign Up
        </h1>
        <div
          class="w-full sm:max-w-xl mt-6 px-6 py-4 overflow-hidden sm:rounded-lg"
        >
          <h2 class="text-xl">Write this down.</h2>
          This password will be used to encrypt your data on your browser.
          Because there is no backend service
          <span class="font-bold">
            there is no way to recover your password</span
          >
          if you forget it. Once you've signed in your session will last one
          week then you will have to re-enter your password.
        </div>
        <div
          class="w-full text-black sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
          <div>
            <div v-if="data.error != null" class="text-red-500">
              {{ data.error }}
            </div>
            <!-- Password -->
            <div class="mt-4">
              <label
                class="block font-medium text-sm text-gray-700"
                for="password"
              >
                Choose a Password
                <input
                  @keyup="data.error = ''"
                  v-model="data.password"
                  id="password"
                  class="rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                  type="password"
                  name="password"
                  required
                  autocomplete="new-password"
                />
              </label>
            </div>

            <!-- Confirm Password -->
            <div class="mt-4">
              <label
                class="block font-medium text-sm text-gray-700"
                for="password_confirmation"
              >
                Repeat Password
                <input
                  @keyup="data.error = ''"
                  v-model="data.confirm"
                  id="password_confirmation"
                  class="rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                  type="password"
                  name="password_confirmation"
                  required
                />
              </label>
            </div>

            <div class="mt-4"></div>
            <div class="flex items-center justify-end mt-4">
              <router-link to="log-in">
                <span
                  class="underline text-sm text-gray-600 hover:text-gray-900"
                  href=""
                >
                  Already Registered
                </span>
              </router-link>

              <button
                class="ml-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                @click="register"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img :src="signup" />
      </div>
    </div>
    <div class="h-20"></div>
  </main>
</template>

<style scoped></style>

<script setup lang="ts">
import signup from "./../assets/signup.svg";
import { reactive } from "vue";
import { register as store } from "@/services/accounts";
import router from "@/router";
const data = reactive({
  password: "",
  confirm: "",
  error: "",
});

const register = () => {
  if (data.password != data.confirm) {
    data.error = "Passwords do not match";
    return;
  }
  try {
    store(data.password);
    router.push({ path: "/setup" });
  } catch (e: any) {
    data.error = e.message;
  }
};
</script>
