<script setup lang="ts">

import SetupQuestion from "@/components/SetupQuestion.vue";
</script>
<template>
  <main
    class="leading-normal tracking-normal text-white gradient"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <div
      class="pt-24 container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
    >
      <h1 class="my-4 text-5xl font-bold leading-tight">
        Let's get a baseline.
      </h1>
      <p class="leading-normal text-2xl mb-8">
        Answer the following questions to get a basic understanding of your
        menstrual cycle, or if you'd prefer to start from scratch
        <router-link to="dashboard" class="underline">click here</router-link>
        to skip the setup process.
      </p>
      <setup-question v-model="onItNow" question-type="boolean" question-text="Are you currently on your period?" question-number="1"></setup-question>
      <setup-question v-if="onItNow === true" v-model="currentPeriodStart" question-type="date" question-text="When did your current period start?"></setup-question>
      <setup-question v-model="lastPeriodStart" question-type="date" question-text="When did your last period start?" question-number="2"></setup-question>
      <setup-question  v-model="length" question-type="number" question-text="How many days do your periods generally last?" question-number="3"></setup-question>
      <setup-question v-model="birthControl" question-type="boolean" question-text="Are you currently on birth control?" question-number="4"></setup-question>
      <setup-question v-if="birthControl" v-model="birthControlType" question-type="text" question-text="What birth control are you on?"></setup-question>



      <button class=" inline-flex items-center px-4 py-2 bg-pink-500  drop-shadow-lg mb-10 border border-transparent rounded-md font-semibold text-2xl text-white  tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">Save</button>

    </div>
  </main>
</template>

<script lang="ts">

export default {
  name: "SetupAccount",
  data() {
    return {
      length: "",
      lastPeriodStart: "",
      currentPeriodStart: "",
      birthControlType: "",
      birthControl: false,
      onItNow: false,
    };
  },
};
</script>

<style scoped></style>
