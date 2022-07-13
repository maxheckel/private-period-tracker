<script setup lang="ts">
import AppLogo from "@/components/AppLogo.vue";


</script>
<template>
  <!--Nav-->
  <nav id="header" class="fixed w-full z-30 top-0 py-3 text-ppt-black nav-gradient bg-ppt-blue-400">
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
    >
      <div class="pl-4 flex items-center">
        <AppLogo />
      </div>
      <div class="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          <svg
            class="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-ppt-black p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <router-link to="/dashboard" >
              <span
                  class="inline-block text-ppt-black no-underline hover:text-ppt-black hover:text-underline py-2 px-4"
                  href="#"
              >Dashboard</span
              >
            </router-link>
          </li>
          <li class="mr-3" v-if="authed">
            <router-link to="/logout">
              <span
                  class="inline-block text-ppt-black no-underline hover:text-ppt-black hover:text-underline py-2 px-4"
                  href="#"
              >Log Out</span
              >
            </router-link>
          </li>
          <li class="mr-3" v-if="!authed">
            <router-link to="/login">
              <span
                  class="inline-block text-ppt-black no-underline hover:text-ppt-black hover:text-underline py-2 px-4"
                  href="#"
              >Log In</span
              >
            </router-link>
          </li>
        </ul>
        <div v-if="!authed">
          <RouterLink to="sign-up">
            <button
              id="navAction"
              class="text-red-500 font-bold"
            >
              Sign Up
            </button>
          </RouterLink>
        </div>

        <div v-if="authed">

            <button
                @click="showAdd"
              id="navAction"
              class="mx-auto lg:mx-0 hover:underline bg-white text-ppt-black font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              <span v-if="onPeriod"> Log My Period </span>
              <span v-if="!onPeriod"> My Period Has Started </span>
            </button>

        </div>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>

<script lang="ts">
import { isOnPeriod } from "@/services/metrics";
import { isAuthed } from "@/services/accounts";
import {add} from "@/store/add";
export default {
  async mounted() {
    /*Toggle dropdown list*/
    /*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

    const navMenuDiv = document.getElementById("nav-content");
    const navMenu = document.getElementById("nav-toggle");

    document.onclick = check;
    function check(e: any) {
      const target = (e && e.target) || (event && event.srcElement);
      if (!navMenuDiv) {
        return;
      }
      //Nav Menu
      if (!checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, navMenu)) {
          // click on the link
          if (navMenuDiv.classList.contains("hidden")) {
            navMenuDiv.classList.remove("hidden");
          } else {
            navMenuDiv.classList.add("hidden");
          }
        } else {
          // click both outside link and outside menu, hide menu
          navMenuDiv.classList.add("hidden");
        }
      }
    }
    function checkParent(t: any, elm: any) {
      while (t.parentNode) {
        if (t == elm) {
          return true;
        }
        t = t.parentNode;
      }
      return false;
    }
  },
  computed: {
  },
  name: "NavMenu",
  data() {
    return {
      authed: isAuthed(),
      onPeriod: isOnPeriod(),
    }
  },
  methods: {
    showAdd(){
      add.show(new Date());
    }
  }
};
</script>

<style scoped></style>
