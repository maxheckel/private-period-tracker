<template>
  <ViewDay
    :day="currentDay"
    :showing="showingDay"
    @hide="showingDay = false"
  ></ViewDay>
  <div class="text-center text-gray-400">
    {{ months[this.month] }} {{ this.year }}
  </div>
  <div class="w-full grid grid-cols-7 text-sm">
    <div class="text-center mb-2 text-gray-400">S</div>
    <div class="text-center mb-2 text-gray-400">M</div>
    <div class="text-center mb-2 text-gray-400">Tu</div>
    <div class="text-center mb-2 text-gray-400">W</div>
    <div class="text-center mb-2 text-gray-400">Th</div>
    <div class="text-center mb-2 text-gray-400">F</div>
    <div class="text-center mb-2 text-gray-400">Sa</div>
    <div
      class="p-4 bg-gray-200 border-t border-l border-gray-100 text-center"
      v-for="index in firstDayBuffer"
    >
      {{ numberOfDaysLastMonth - index }}
    </div>
    <div
      class="p-4 border-gray-100 border border-t border-l text-center"
      v-for="index in numberOfDays"
      v-bind:key="index"
    >
      <div
        :class="
          index === +today
            ? {
                'bg-blue-400 border-pink-300 border-2 rounded-full text-white  font-bold text-gray-700 rounded-full flex items-center justify-center font-mono': true,
              }
            : {
                'bg-pink-300 rounded-full  font-bold text-gray-700 rounded-full flex items-center justify-center font-mono': true,
              }
        "
        style="width: 30px; height: 30px"
        v-if="past[index] !== undefined"
        @click="showDay(past[index])"
      >
        {{ index }}
      </div>
      <div
        :class="
          index === +today
            ? {
                'bg-blue-400 border-blue-300 border-2 rounded-full text-white  flex items-center justify-center font-mono': true,
              }
            : {
                ' rounded-full border-2 border border-pink-300 flex items-center justify-center font-mono': true,
              }
        "
        v-if="future[index]"
        style="width: 30px; height: 30px"
      >
        {{ index }}
      </div>
      <div
        v-if="+today === index && !future[index] && !past[index]"
        class="bg-blue-400 rounded-full text-white"
        @click="addDay(index)"
      >
        {{ index }}
      </div>
      <div
        v-if="!future[index] && !past[index] && +today !== index"
        @click="addDay(index)"
      >
        {{ index }}
      </div>
    </div>

    <div
      class="p-4 bg-gray-200 border-t border-l border-gray-100 text-center"
      v-for="index in endBuffer"
    >
      {{ index }}
    </div>
  </div>
</template>

<script lang="ts">
import { days } from "@/store/days";
import type { DecryptedDay } from "@/store/days";
import ViewDay from "@/components/ViewDay.vue";
import { add } from "@/store/add";

export default {
  name: "CalendarView",
  components: { ViewDay },
  data() {
    return {
      currentDay: undefined,
      showingDay: false,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  props: ["month", "year", "nextStart", "averageDays"],
  computed: {
    past() {
      const daysForThisMonth = {};
      if (days.days.length === 0 && days.loaded){
        return daysForThisMonth;
      }
      // convert the days for this month into a map so they're easier to lookup
      days.decryptedDays
        .filter((day) => {
          return (
            day.date.getMonth() === this.month &&
            day.date.getFullYear() === this.year
          );
        })
        .forEach((day) => {
          daysForThisMonth[day.date.getDate()] = day;
        });
      return daysForThisMonth;
    },
    future() {
      const futureDays = {};
      let nextStart = this.nextStart;
      const averageDays = this.averageDays;
      if (!this.nextStart || !this.averageDays) {
        return futureDays;
      }
      nextStart = new Date(nextStart.getTime());
      for (let x = 0; x < averageDays; x++) {
        if (nextStart.getMonth() === this.month && nextStart.getTime() > new Date().getTime()) {
          futureDays[nextStart.getDate()] = true;
        }
        nextStart.setDate(nextStart.getDate() + 1);
      }
      return futureDays;
    },
    today() {
      const today = new Date();
      if (today.getMonth() === this.month) {
        return today.getDate();
      }
      return -1;
    },
    numberOfDays() {
      return new Date(this.year, +this.month + 1, 0).getDate();
    },
    firstDayBuffer() {
      const firstDay = new Date(this.year, this.month, 1);
      return firstDay.getDay();
    },
    numberOfDaysLastMonth() {
      if (this.month === 0) {
        return new Date(this.year, 11, 0).getDate();
      }
      return new Date(this.year, this.month - 1, 0).getDate();
    },
    endBuffer() {
      const numDaysShown = this.numberOfDays + this.firstDayBuffer;

      return 7 - (numDaysShown % 7);
    },
  },
  methods: {
    showDay(day: DecryptedDay) {
      this.currentDay = day;
      this.showingDay = true;
    },
    addDay(index) {
      add.show(new Date(this.year, this.month, index));
    },
  },
};
</script>

<style scoped></style>
