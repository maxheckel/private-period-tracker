<template>
  <div class="text-center text-gray-400">
    {{ months[this.month] }} {{ this.year }}
  </div>
  <div class="w-full grid grid-cols-7">
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
    >
      <div
        class="bg-pink-300 rounded-full rounded"
        v-if="periods[index] !== undefined"
      >
        {{ index }}
      </div>
      <div v-else>
        {{ index }}
      </div>
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
  props: ["month", "year"],
  computed: {
    periods() {
      const daysForThisMonth = {};

      this.days
        .filter((day) => {
          return (
            day.date.getMonth() === this.month &&
            day.date.getFullYear() === this.year
          );
        })
        .forEach((day) => {
          daysForThisMonth[day.date.getMonth()] = day;
        });
      return daysForThisMonth;
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
  },
};
</script>

<style scoped></style>
