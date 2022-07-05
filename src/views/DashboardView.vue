<template>
  <div class="relative w-full">
    <div class="mt-24"></div>
    <div class="mx-auto container md:grid gap-0 md:grid-cols-3 items-center justify-center">

      <div class="my-4 block justify-center flex">
        <div
            class="cursor-pointer text-2xl mx-auto relative gradient inline-block p-6 rounded-full text-white font-bold drop-shadow-lg mx-auto relative"
            @click="showAdd()"
        >
          Log My Period
        </div>
      </div>
      <div class="block text-center justify-center flex md:col-span-2 align-middle justify-center">
        <h1 class="text-2xl d">
          <span
            v-if="data.onPeriod && data.currentEstimatedPeriodEndDate"
            class=""
          >
            You're currently on your period, it should end on
            <span class="text-pink-600 font-bold">{{ data.currentEstimatedPeriodEndDate.toDateString() }}</span>

          </span>
          <span v-if="!data.onPeriod && data.nextPeriodStartDate">
            Your next period start date is estimated to be
            <span class="text-pink-600 font-bold">{{ data.nextPeriodStartDate.toDateString() }}</span>

          </span>
          <span
            v-if="
              !data.onPeriod &&
              !data.nextPeriodStartDate &&
              !data.currentEstimatedPeriodEndDate
            "
          >
            Click the button below to log your first period data.
          </span>
        </h1>
      </div>
    </div>

    <div class="container px-3 mx-auto">
      <!--Left Col-->
      <div class="w-full md:text-left">
        <div class="md:grid md:grid-cols-3 md:gap-10">
          <div>
            <h2 class="text-center text-xl my-8">Last Month</h2>
            <CalendarView
              :month="lastMonthMonth"
              :year="lastMonthYear"
              :next-start="data.nextPeriodStartDate"
              :average-days="data.averageDays"
            ></CalendarView>
          </div>
          <div>
            <h2 class="text-center text-xl my-8">This Month</h2>
            <CalendarView
              :month="currentMonthMonth"
              :year="currentMonthYear"
              :next-start="data.nextPeriodStartDate"
              :average-days="data.averageDays"
            ></CalendarView>
          </div>
          <div>
            <h2 class="text-center text-xl my-8">Next Month</h2>
            <CalendarView
              :month="nextMonthMonth"
              :year="nextMonthYear"
              :next-start="data.nextPeriodStartDate"
              :average-days="data.averageDays"
            ></CalendarView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DecryptedDay } from "@/store/days";
import { days } from "@/store/days";
import {
  averageLength,
  estimatedEndDate,
  estimatedStartDate,
  isOnPeriod,
} from "@/services/metrics";
import CalendarView from "@/components/CalendarView.vue";
import { computed, reactive } from "vue";
import {add} from "@/store/add";

const data = reactive({
  onPeriod: isOnPeriod(),
  currentEstimatedPeriodEndDate: estimatedEndDate(),
  nextPeriodStartDate: estimatedStartDate(),
  averageDays: averageLength()
});

const showAdd = () => {
  add.show(null)
}

const lastMonthMonth = computed(() => {
  if (currentMonthMonth.value === 0) {
    return 11;
  }
  return currentMonthMonth.value - 1;
});
const lastMonthYear = computed(() => {
  if (currentMonthMonth.value === 0) {
    return currentMonthYear.value - 1;
  }
  return currentMonthYear.value;
});
const currentMonthMonth = computed(() => {
  return new Date().getMonth();
});
const currentMonthYear = computed(() => {
  return new Date().getFullYear();
});
const nextMonthMonth = computed(() => {
  if (currentMonthMonth.value === 11) {
    return 0;
  }
  return currentMonthMonth.value + 1;
});
const nextMonthYear = computed(() => {
  if (currentMonthMonth.value === 11) {
    return new Date().getFullYear() + 1;
  }
  return currentMonthYear.value;
});
function setupNavHeadeer() {
  document.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    const navaction = document.getElementById("navAction");
    const toToggle = document.querySelectorAll(".toggleColour");
    const navcontent = document.getElementById("nav-content");
    if (!header || !navaction || !toToggle || !navcontent) {
      return;
    }
    header.classList.add("bg-white");
    navaction.classList.remove("bg-white");
    navaction.classList.add("gradient");
    navaction.classList.remove("text-gray-800");
    navaction.classList.add("text-white");
    //Use to switch toggleColour colours
    for (let i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-gray-800");
      toToggle[i].classList.remove("text-white");
    }
    header.classList.add("shadow");
    navcontent.classList.remove("bg-gray-100");
    navcontent.classList.add("bg-white");
  });
  const header = document.getElementById("header");
  const navaction = document.getElementById("navAction");
  const toToggle = document.querySelectorAll(".toggleColour");
  const navcontent = document.getElementById("nav-content");
  if (!header || !navaction || !toToggle || !navcontent) {
    return;
  }
  header.classList.add("bg-white");
  navaction.classList.remove("bg-white");
  navaction.classList.add("gradient");
  navaction.classList.remove("text-gray-800");
  navaction.classList.add("text-white");
  //Use to switch toggleColour colours
  for (let i = 0; i < toToggle.length; i++) {
    toToggle[i].classList.add("text-gray-800");
    toToggle[i].classList.remove("text-white");
  }
  header.classList.add("shadow");
  navcontent.classList.remove("bg-gray-100");
  navcontent.classList.add("bg-white");
}

setupNavHeadeer();
</script>

<style scoped></style>
