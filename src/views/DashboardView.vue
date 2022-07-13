
<script setup lang="ts">
import { days } from "@/store/days";
import {
  averageLength,
  estimatedEndDate,
  estimatedStartDate,
  isOnPeriod,
} from "@/services/metrics";
import CalendarView from "@/components/CalendarView.vue";
import { computed, reactive } from "vue";
import { add } from "@/store/add";

const data = reactive({
  days: days.decryptedDays,
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
});

const previousMonth = () => {
  if (data.currentMonth == 0){
    data.currentMonth = 11;
    data.currentYear = data.currentYear - 1;
  }
  data.currentMonth--;
}
const resetMonths = () => {
  data.currentMonth = new Date().getMonth();
  data.currentYear = new Date().getFullYear();
}
const nextMonth = () => {

  if (data.currentMonth == 11){
    data.currentMonth = 0;
    data.currentYear = data.currentYear + 1;
  }
  data.currentMonth++;
}
const showAdd = () => {
  add.show(null);
};

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
  return data.currentMonth;
});
const currentMonthYear = computed(() => {
  return data.currentYear
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

</script>

<template>
  <div class="relative w-full">
    <div class="mt-24"></div>
    <div
      class="mx-auto container md:grid gap-0 md:grid-cols-3 items-center justify-center"
    >
      <div class="my-4 block justify-center flex">
        <div
          class="cursor-pointer text-2xl mx-auto relative gradient inline-block p-6 rounded-full text-white font-bold drop-shadow-lg mx-auto relative"
          @click="showAdd()"
        >
          Log My Period
        </div>
      </div>
      <div
        class="block text-center justify-center flex md:col-span-2 align-middle justify-center"
      >
        <h1 class="text-2xl d">
          <span v-if="isOnPeriod() && estimatedEndDate()">
            You're currently on your period, it should end around
            <span class="text-pink-600 font-bold">{{
                estimatedEndDate()?.toDateString()
            }}</span>
          </span>
          <span v-if="!isOnPeriod() && estimatedStartDate()">
            Your next period start date is estimated to be
            <span class="text-pink-600 font-bold">{{
                estimatedStartDate()?.toDateString()
            }}</span>
            it will last around {{averageLength()}} days
          </span>
          <span
            v-if="
              !estimatedEndDate() && !estimatedStartDate()
            "
          >
            Click the "Log my period" button to start logging your period
          </span>
        </h1>
      </div>
    </div>
    <div class="flex justify-center">
      <div @click="previousMonth" class="rounded-3xl text-sm border border-2 px-4 mx-2 py-2 hover:bg-pink-600 cursor-pointer hover:text-white border-pink-300 text-black">
        &lt;
      </div>
      <div @click="resetMonths" class="rounded-3xl text-sm border border-2 px-4 mx-2 py-2 hover:bg-pink-600 cursor-pointer hover:text-white border-pink-300 text-black">
        This Month
      </div>
      <div @click="nextMonth" class="rounded-3xl text-sm border border-2 px-4 mx-2 py-2 hover:bg-pink-600 cursor-pointer hover:text-white border-pink-300 text-black">
        >
      </div>
    </div>
    <div class="container px-3 mx-auto">
      <!--Left Col-->
      <div class="w-full md:text-left">
        <div class="md:grid md:grid-cols-3 md:gap-10 my-5">
          <div>
            <CalendarView
              :month="lastMonthMonth"
              :year="lastMonthYear"
            ></CalendarView>
          </div>
          <div>
            <CalendarView
              :month="currentMonthMonth"
              :year="currentMonthYear"
            ></CalendarView>
          </div>
          <div>
            <CalendarView
              :month="nextMonthMonth"
              :year="nextMonthYear"
            ></CalendarView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
