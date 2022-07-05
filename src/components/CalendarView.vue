<template>
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
                'bg-blue-400': true,
                'border-pink-300': true,
                'border-2': true,
                'rounded-full': true,
                'text-white': true,
              }
            : { 'bg-pink-300': true, 'rounded-full': true }
        "
        v-if="past[index] !== undefined"
      >
        {{ index }}
      </div>
      <div
        :class="
          index === +today
            ? {
                'bg-blue-400': true,
                'border-blue-300': true,
                'border-2': true,
                'rounded-full': true,
                'text-white': true,
              }
            : {
                border: true,
                'border-pink-300': true,
                'border-2': true,
                'rounded-full': true,
              }
        "
        v-if="future[index]"
      >
        {{ index }}
      </div>
      <div v-if="+today === index" class="bg-blue-400 rounded-full text-white">
        {{ index }}
      </div>
      <div v-if="!future[index] && !past[index] && +today !== index">
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

<script>
import { days } from "@/store/days";

export default {
  name: "CalendarView",
  data() {
    return {
      days: days.getDays(),
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
      // convert the days for this month into a map so they're easier to lookup
      this.days
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
        if (nextStart.getMonth() === this.month) {
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
};
</script>

<style scoped></style>
