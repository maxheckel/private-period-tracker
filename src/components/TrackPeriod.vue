<script setup lang="ts">
import { add } from "@/store/add";
</script>
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
                  <div class="text-red-500 mb-4" v-if="error">{{ error }}</div>
                  <label>
                    Are You logging one day or a span of days?
                    <select class="mt-2 rounded-3xl w-full" v-model="one_day">
                      <option :value="true">One Day</option>
                      <option :value="false">A Span</option>
                    </select>
                  </label>

                  <div class="mt-8" v-if="one_day">
                    <label>
                      Which day are you logging?
                      <input
                          @change="error = null"
                        class="mt-4 rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                        type="date"
                        v-model="start_date"
                        required
                      />
                    </label>
                  </div>
                  <div class="mt-8" v-if="one_day && currently_on_period">
                    <label>
                      Did your period end on {{ startDateReadable }}?
                      <select class="mt-2 rounded-3xl w-full" v-model="ended">
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                      </select>
                    </label>
                  </div>
                  <div class="mt-8" v-if="!one_day">
                    <div class="grid grid-cols-2 gap-4">
                      <label>
                        Start
                        <input
                            @change="error = null"
                          class="mt-4 rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                          type="date"
                          v-model="start_date"
                          required
                        />
                      </label>

                      <label>
                        End
                        <input
                            @change="error = null"
                          class="mt-4 rounded-md text-xl shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                          type="date"
                          required
                          v-model="end_date"
                        />
                      </label>
                    </div>
                  </div>

                  <div v-if="!one_day" class="mt-8">
                    <label>
                      Did your period end on {{ endDateReadable }}?
                      <select class="mt-2 rounded-3xl w-full" v-model="ended">
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                      </select>
                    </label>
                  </div>

                  <div class="mt-8" v-if="!ended">
                    <label>
                      Enter your {{ !one_day ? "average" : "" }} flow level
                      <select class="mt-2 rounded-3xl w-full" v-model="flow">
                        <option :value="1">Spotting Only</option>
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
import { diffBetweenDays, isOnPeriod } from "@/services/metrics";
import type { DecryptedDay } from "@/store/days";
import { days } from "@/store/days";
import router from "@/router";

export default {
  name: "TrackPeriod",
  data() {
    return {
      one_day: true,
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      currently_on_period: isOnPeriod(),
      flow: 1,
      ended: false,
      error: "",
      on_period: true,

    };
  },
  methods: {
    save() {
      if (!this.one_day && this.startDateObject.getTime() > this.endDateObject.getTime()) {
        this.error = "Start date must come before end date";
        return;
      }
      if (this.startDateObject.getTime() > new Date().getTime() && this.startDateObject.getDate() > new Date().getDate()){
        this.error = "Start date cannot be in the future";
        return;
      }
      if (this.one_day) {
        const day = {} as DecryptedDay;
        const start = new Date(this.startDateObject.getTime());
        if (this.ended) {
          start.setDate(start.getDate() - 1);
        }
        day.date = start;
        day.flow = this.flow;
        day.on_period = true;
        day.period_ended = this.ended;
        days.addDay(day);
      }
      if (!this.one_day) {
        const startDate = new Date(this.startDateObject.getTime());
        const dayCount = diffBetweenDays(
          this.startDateObject,
          this.endDateObject
        );
        for (let x = 0; x < dayCount; x++) {
          const day = {} as DecryptedDay;
          day.date = startDate;
          day.flow = this.flow;
          day.on_period = true;
          day.period_ended = this.ended;
          days.addDay(day);
          startDate.setDate(startDate.getDate() + 1);
        }
      }
      add.hide();
      router.push({ path: "/dashboard" });
    },
  },
  computed: {
    startDateReadable() {
      return this.startDateObject.toDateString();
    },
    startDateObject() {
      const [y, m, d] = this.start_date.split("-");
      const start = new Date();
      start.setDate(+d);
      start.setMonth(+m - 1);
      start.setFullYear(+y);
      return start;
    },
    endDateObject() {
      const [y, m, d] = this.end_date.split("-");
      const end = new Date();
      end.setDate(+d);
      end.setMonth(+m - 1);
      end.setFullYear(+y);
      return end;
    },
    endDateReadable() {
      return this.endDateObject.toDateString();
    },
  },
};
</script>

<style scoped></style>
