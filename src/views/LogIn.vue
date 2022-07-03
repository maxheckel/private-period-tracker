<template>
  <main
    class="leading-normal tracking-normal text-white gradient"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <div class="h-20"></div>
    <div class="">
      <div class="flex flex-col sm:justify-center items-center sm:pt-0 pt-20">
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
                Enter Password
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

            <div class="mt-4"></div>
            <div class="flex items-center justify-end mt-4">
              <button
                class="ml-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                @click="performLogin"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="h-20"></div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import {isAuthed, login} from "@/services/accounts";
import router from "@/router";

const data = reactive({
  password: "",

  error: "",
});

const performLogin = () => {
  if (!data.password) {
    data.error = "Please enter a password";
    return;
  }
  try {
    login(data.password);
    router.push({ path: "/dashboard" });
    isAuthed();
  } catch (e: any) {
    data.error = e.message;
  }
};
</script>

<style scoped></style>
