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
      <setup-question
        v-model="data.onItNow"
        question-type="boolean"
        question-text="Are you currently on your period?"
        question-number="1"
      ></setup-question>
      <setup-question
        v-if="data.onItNow === true"
        v-model="data.currentPeriodStart"
        question-type="date"
        question-text="When did your current period start?"
      ></setup-question>
      <setup-question
        v-model="data.lastPeriodStart"
        question-type="date"
        question-text="When did your last period start?"
        question-number="2"
      ></setup-question>
      <setup-question
        v-model="data.length"
        question-type="number"
        question-text="How many days do your periods generally last?"
        question-number="3"
      ></setup-question>
      <setup-question
        v-model="data.birthControl"
        question-type="boolean"
        question-text="Are you currently on birth control?"
        question-number="4"
      ></setup-question>
      <setup-question
        v-if="data.birthControl"
        v-model="data.birthControlType"
        question-type="text"
        question-text="What birth control are you on?"
      ></setup-question>
      <setup-question
        v-if="data.birthControl"
        v-model="data.birthControlStartDate"
        question-type="date"
        question-text="When did you start this birth control?"
      ></setup-question>
      <div class="w-full">
        <button
          @click="save"
          class="inline-flex items-center px-4 py-2 bg-white text-pink-500 drop-shadow-lg mb-10 border border-transparent rounded-md font-semibold text-2xl text-white tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
        >
          Save
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import SetupQuestion from "@/components/SetupQuestion.vue";
import type { DecryptedDay } from "@/store/days";
import { days } from "@/store/days";
import type { BirthControlDecrypted } from "@/store/birthcontrol";
import { birthControl } from "@/store/birthcontrol";
import router from "@/router";
import {diffBetweenDays} from "@/services/metrics";

const data = reactive({
  length: 7,
  lastPeriodStart: "",
  currentPeriodStart: "",
  birthControlType: "",
  birthControl: false,
  birthControlStartDate: "",
  onItNow: false,
});

const save = () => {
  // Add the days from their last period start date till the average end date
  let [y, m, d] = data.lastPeriodStart.split("-");
  const lastPeriodStart = new Date();
  lastPeriodStart.setDate(+d);
  lastPeriodStart.setMonth(+m - 1);
  lastPeriodStart.setFullYear(+y);
  for (let x = 0; x < data.length; x++) {
    const newDay = {} as DecryptedDay;
    newDay.date = new Date(lastPeriodStart.getTime());
    newDay.on_period = true;
    newDay.period_ended = false;
    if (x == Math.ceil(data.length) - 1) {
      newDay.period_ended = true;
    }
    newDay.notes = "";
    days.addDay(newDay);
    lastPeriodStart.setDate(lastPeriodStart.getDate() + 1);
  }

  // Add the days from their current period start till today
  [y, m, d] = data.currentPeriodStart.split("-");
  const currentPeriodStart = new Date();
  currentPeriodStart.setDate(+d);
  currentPeriodStart.setMonth(+m - 1);
  currentPeriodStart.setFullYear(+y);

  const numDays = diffBetweenDays(currentPeriodStart, new Date());
  for (let x = 0; x < Math.ceil(numDays); x++) {
    const newDay = {} as DecryptedDay;
    newDay.date = new Date(currentPeriodStart.getTime());
    newDay.on_period = true;
    newDay.period_ended = false;
    newDay.notes = "";
    days.addDay(newDay);
    currentPeriodStart.setDate(currentPeriodStart.getDate() + 1);
  }

  if (data.birthControl) {
    const newBc = {} as BirthControlDecrypted;
    newBc.name = data.birthControlType;
    if (data.birthControlStartDate) {
      const [y, m, d] = data.birthControlStartDate.split("-");
      const bcStart = new Date();
      bcStart.setDate(+d);
      bcStart.setMonth(+m);
      bcStart.setFullYear(+y);
      newBc.start_date = bcStart;
    }
    newBc.active = true;
    newBc.average_days = data.length;
    birthControl.addBirthControl(newBc);
  }
  // router.push({ path: "/dashboard" });
};
</script>

<style scoped></style>
