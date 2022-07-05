<template>
  <div
    v-if="add.getShowing()"
    class="relative z-40"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!--
      Background backdrop, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div
          class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex w-full sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                  ></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 pt-2 text-gray-900 font-bold"
                  id="modal-title"
                >
                  Add Period Data
                </h3>
                <div class="my-4 w-full">
                  <div class="text-red-500 mb-4" v-if="data.error">{{ data.error }}</div>
                  <label>
                    Are You logging one day or a span of days?
                    <select class="mt-2 rounded-3xl w-full" v-model="data.one_day">
                      <option :value="true">One Day</option>
                      <option :value="false">A Span</option>
                    </select>
                  </label>

                  <div class="mt-8" v-if="data.one_day">
                    <label>
                      Which day are you logging?
                      <input
                        @change="setStartDate"
                        class="mt-4 rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                        type="date"
                        :value="add.date.toISOString().slice(0, 10)"
                        required
                      />
                    </label>
                  </div>
                  <div class="mt-8" v-if="data.one_day">
                    <label>
                      Did your period end on {{ startDateReadable }}?
                      <select class="mt-2 rounded-3xl w-full" v-model="data.ended">
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                      </select>
                    </label>
                  </div>
                  <div class="mt-8" v-if="!data.one_day">
                    <div class="grid grid-cols-2 gap-4">
                      <label>
                        Start
                        <input
                          @change="setStartDate"
                          class="mt-4 rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                          type="date"
                          :value="add.date.toISOString().slice(0, 10)"
                          required
                        />
                      </label>

                      <label>
                        End
                        <input
                          @change="data.error = ''"
                          class="mt-4 rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                          type="date"
                          required
                          v-model="data.end_date"
                        />
                      </label>
                    </div>
                  </div>

                  <div v-if="!data.one_day" class="mt-8">
                    <label>
                      Did your period end on {{ endDateReadable }}?
                      <select class="mt-2 rounded-3xl w-full" v-model="data.ended">
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                      </select>
                    </label>
                  </div>

                  <div class="mt-8" v-if="!data.ended">
                    <label>
                      Enter your {{ !data.one_day ? "average" : "" }} flow level
                      <select class="mt-2 rounded-3xl w-full" v-model="data.flow">
                        <option :value="1">Spotting</option>
                        <option :value="2">Light</option>
                        <option :value="3">Medium</option>
                        <option :value="2">Heavy</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="save()"
            >
              Save
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="add.hide()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TrackPeriod",
};
</script>
<script setup lang="ts">
import { diffBetweenDays, isOnPeriod } from "@/services/metrics";
import type { DecryptedDay } from "@/store/days";
import { days } from "@/store/days";
import router from "@/router";
import { add } from "@/store/add";
import { computed, reactive } from "vue";

const data = reactive({
  one_day: true,
  start_date: add.getDate().toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  currently_on_period: isOnPeriod(),
  flow: 1,
  ended: false,
  error: "",
  on_period: true,
});

const startDateReadable = computed(() => {
  return startDateObject.value.toDateString();
});
const startDateObject = computed(() => {
  return add.getDate();
});
const endDateObject = computed(() => {
  const [y, m, d] = data.end_date.split("-");
  const end = new Date();
  end.setDate(+d);
  end.setMonth(+m - 1);
  end.setFullYear(+y);
  return end;
});
const endDateReadable = computed(() => {
  return endDateObject.value.toDateString();
});

const setStartDate = (e: any) => {
  const [y, m, d] = e.target.value.split("-");
  const dateToAdd = new Date();
  dateToAdd.setDate(+d);
  dateToAdd.setMonth(+m - 1);
  dateToAdd.setFullYear(+y);
  dateToAdd.setDate(dateToAdd.getDate());
  add.show(dateToAdd);
};
const save = () => {
  if (
    !data.one_day &&
    startDateObject.value.getTime() > endDateObject.value.getTime()
  ) {
    data.error = "Start date must come before end date";
    return;
  }
  if (
    startDateObject.value.getTime() > new Date().getTime() &&
    startDateObject.value.getDate() > new Date().getDate()
  ) {
    data.error = "Start date cannot be in the future";
    return;
  }
  if (data.one_day) {
    const day = {} as DecryptedDay;
    const start = new Date(startDateObject.value.getTime());
    if (data.ended) {
      start.setDate(start.getDate() - 1);
    }
    day.date = start;
    day.flow = data.flow;
    day.on_period = true;
    day.period_ended = data.ended;
    day.notes = "";
    days.addDay(day);
  }
  if (!data.one_day) {
    const startDate = new Date(startDateObject.value.getTime());
    const dayCount = diffBetweenDays(
      startDateObject.value,
      endDateObject.value
    );
    for (let x = 0; x < dayCount + 1; x++) {
      const day = {} as DecryptedDay;
      day.date = new Date(startDate.getTime());
      day.flow = data.flow;
      day.on_period = true;
      day.period_ended = false;
      day.notes = "";
      if (x == dayCount && data.ended) {
        day.period_ended = true;
      }
      days.addDay(day);
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  add.hide();
  router.push({ path: "/dashboard" });
};
</script>

<style scoped></style>
