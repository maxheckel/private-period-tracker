<template>
  <div class="relative w-full">
    <div class="mt-24"></div>
    <div class="block justify-center flex">
      <h1 class="text-2xl font-bold">
        <span v-if="onPeriod && currentEstimatedPeriodEndDate" class="">
          You're currently on your period, it should end on
          {{ currentEstimatedPeriodEndDate.toDateString() }}
        </span>
        <span v-if="!onPeriod && nextPeriodStartDate">
          Your next period start date is estimated to be
          {{ nextPeriodStartDate.toDateString() }}
        </span>
        <span v-else>
          Click the button below to log your first period data.
        </span>
      </h1>
    </div>
    <div class="mt-4 block justify-center flex">
      <div
        class="cursor-pointer text-2xl mx-auto relative gradient inline-block p-6 rounded-full text-white font-bold drop-shadow-lg mx-auto relative"
      >
        Log My Period
      </div>
    </div>

    <div
      class="container px-3 mx-auto "
    >
      <!--Left Col-->
      <div
        class=" w-full md:text-left"
      >
        <div class="grid grid-cols-3 gap-10">
          <div>
            <h2 class="text-center text-xl my-8">Last Month</h2>
            <CalendarView :month="lastMonthMonth" :year="lastMonthYear"></CalendarView>
          </div>
          <div>
            <h2 class="text-center text-xl my-8">This Month</h2>
            <CalendarView :month="currentMonthMonth" :year="currentMonthYear"></CalendarView>
          </div>
          <div>
            <h2 class="text-center text-xl my-8">Next Month</h2>
            <CalendarView :month="nextMonthMonth" :year="nextMonthYear"></CalendarView>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { DecryptedDay } from "@/store/days";
import { days } from "@/store/days";
import {
  isOnPeriod,
  getCurrentEstimatedPeriodEndDate,
  getNextEstimatedPeriodStartDate,
} from "@/services/metrics";
import CalendarView from "@/components/CalendarView.vue";

export default {
  name: "DashboardView",
  components: {CalendarView},
  data() {
    return {
      days: days.getDays(),
      onPeriod: isOnPeriod(),
      currentEstimatedPeriodEndDate: getCurrentEstimatedPeriodEndDate(),
      nextPeriodStartDate: getNextEstimatedPeriodStartDate(),
    };
  },
  computed: {
    lastMonthMonth(){
      if (new Date().getMonth() === 0){
        return 11;
      }
      return new Date().getMonth() - 1;
    },
    lastMonthYear(){
      if (new Date().getMonth() === 0){
        return new Date().getFullYear()-1;
      }
      return new Date().getFullYear();
    },
    currentMonthMonth(){
      return new Date().getMonth();
    },
    currentMonthYear(){
      return new Date().getFullYear();
    },
    nextMonthMonth(){
      if (new Date().getMonth() === 11){
        return 0;
      }
      return new Date().getMonth() + 1;
    },
    nextMonthYear(){
      if (new Date().getMonth() === 11){
        return new Date().getFullYear()+1;
      }
      return new Date().getFullYear();
    },
  },
  mounted() {
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
  },
};
</script>

<style scoped></style>
