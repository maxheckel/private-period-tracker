<template>
  <ViewDay
    :day="data.currentDay"
    :showing="data.showingDay"
    @hide="hideDay"
  ></ViewDay>
  <div class="text-center text-gray-400">
    {{ data.months[props.month] }} {{ props.year }}
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
      v-bind:key="index"
    >
      {{ numberOfDaysLastMonth - (firstDayBuffer - index) }}
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
      v-bind:key="index"
    >
      {{ index }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "CalendarView",
};
</script>
<script setup lang="ts">
import { days } from "@/store/days";
import type { DecryptedDay } from "@/store/days";
import ViewDay from "@/components/ViewDay.vue";
import { add } from "@/store/add";
import { computed, reactive } from "vue";
const data = reactive({
  days: days.decryptedDays,
  currentDay: {} as DecryptedDay,
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
});

const props = defineProps(["month", "year", "nextStart", "averageDays"]);
const past = computed(() => {
  const daysForThisMonth: any = {};
  if (days.days.length === 0 && days.loaded) {
    return daysForThisMonth;
  }
  // convert the days for this month into a map so they're easier to lookup
  days.decryptedDays
    .filter((day) => {
      return (
        day.date.getMonth() === props.month &&
        day.date.getFullYear() === props.year
      );
    })
    .forEach((day) => {
      daysForThisMonth[day.date.getDate()] = day;
    });
  return daysForThisMonth;
});
const future = computed(() => {
  const futureDays: any = {};
  let nextStart = props.nextStart;
  const averageDays = props.averageDays;
  if (!props.nextStart || !props.averageDays) {
    return futureDays;
  }
  nextStart = new Date(nextStart.getTime());
  for (let x = 0; x < averageDays; x++) {
    if (
      nextStart.getMonth() === props.month &&
      nextStart.getTime() > new Date().getTime()
    ) {
      futureDays[nextStart.getDate()] = true;
    }
    nextStart.setDate(nextStart.getDate() + 1);
  }
  return futureDays;
});

const today = computed(() => {
  const today = new Date();
  if (today.getMonth() === props.month) {
    return today.getDate();
  }
  return -1;
});

const numberOfDays = computed(() => {
  return new Date(props.year, +props.month + 1, 0).getDate();
});

const firstDayBuffer = computed(() => {
  const firstDay = new Date(props.year, props.month, 1);
  return firstDay.getDay();
});
const numberOfDaysLastMonth = computed(() => {
  if (props.month === 0) {
    return new Date(props.year, 11, 0).getDate();
  }
  return new Date(props.year, props.month - 1, 0).getDate();
});
const endBuffer = computed(() => {
  const numDaysShown = numberOfDays.value + firstDayBuffer.value;

  return 7 - (numDaysShown % 7);
});
const hideDay = () => {
  data.showingDay = false;
};

const showDay = (day: DecryptedDay) => {
  data.currentDay = day;
  data.showingDay = true;
};

const addDay = (index:number) => {
  add.show(new Date(props.year, props.month, index));
};
</script>

<style scoped></style>
