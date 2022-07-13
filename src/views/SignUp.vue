<template>
  <main v-if="!hasIndexedDB()">
    <div class="h-20 gradient"></div>
    <div class="text-center m-20 text-4xl font-bold text-ppt-black">We've detected you do not have IndexedDB available on your browser.  It is required for the site to work.  Please update your browser or use a different device.</div>
  </main>
  <main
      v-if="hasIndexedDB()"
    class="leading-normal tracking-normal text-ppt-black gradient"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div
      v-if="showModal()"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
          <div
            class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <!-- Heroicon name: outline/exclamation -->
                  <svg
                    class="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Deactivate account
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      You currently have an account based on your browser data.
                      If you create a new account on this browser
                      <span class="font-bold"
                        >all your current data will be permanently deleted</span
                      >. Are you sure you want to deactivate your account? This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="data.acknowledged = true"
              >
                I Understand
              </button>
              <router-link to="login"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"

              >
                Log In to My Current Account
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-20"></div>
    <div class="md:grid md:grid-cols-2">
      <div class="flex flex-col sm:justify-center items-center sm:pt-0 pt-20">
        <h1 class="mt-4 text-4xl font-bold text-ppt-black leading-tight">
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
          class="w-full text-ppt-black sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
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
              <router-link to="login">
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
import { register as store, hasAccount } from "@/services/accounts";
import router from "@/router";
const data = reactive({
  password: "",
  confirm: "",
  error: "",
  acknowledged: false,
});

const showModal = (): boolean => {
  if (data.acknowledged) {
    return false;
  }
  return hasAccount();
};

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

const hasIndexedDB = () => {
  return !!window.indexedDB;
}


const goToDashboard = () => {
  router.push({ path: "/dashboard" });
};
</script>
