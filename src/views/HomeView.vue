<script setup lang="ts">
import woman from "./../assets/woman.svg";
import security from "./../assets/security.svg";
import opensource from "./../assets/open-source.svg";
import lightbulb from "./../assets/lightbulb.svg";
import { isAuthed } from "@/services/accounts";
import { isOnPeriod } from "@/services/metrics";
import { reactive } from "vue";
import { add } from "@/store/add";
import LogoDot from "@/components/LogoDot.vue";

const data = reactive({
  authed: isAuthed(),
  onPeriod: isOnPeriod(),
});

const showModal = function (date: Date | null = null) {
  add.show(date);
};
</script>
<template>
  <main class="leading-normal tracking-normal text-ppt-black">
    <div class="gradient">
      <!--Hero-->
      <div class="pt-10">
        <div
          class="w-full block justify-center flex"
          v-if="data.authed"
          to="dashboard"
        >
          <button
            @click="showModal()"
            id="navAction"
            class="mx-auto relative lg:mx-0 hover:underline bg-white text-ppt-black font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            <span v-if="data.onPeriod"> Log My Period </span>
            <span v-if="!data.onPeriod"> My Period Has Started </span>
          </button>
        </div>
        <div
          class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
        >
          <!--Left Col-->
          <div
            class="flex flex-col w-full md:w-2/5 items-start text-center md:text-left"
          >
            <p
              class="uppercase tracking-loose w-full tracking-wider text-ppt-red-500 font-bold"
            >
              FULLY PRIVATE, GUARANTEED
            </p>
            <h1 class="my-4 text-4xl font-bold leading-tight">
              Track Your Periods With Zero-Trust Security.
            </h1>
            <p class="leading-normal text-xl mb-8 font-light">
              Recent rulings jeopardize your privacy and safety. This tool
              allows you to track your cycles and keeps the information between
              you and your device.
            </p>
            <router-link
              to="sign-up"
              class="mx-auto uppercase tracking-widest lg:mx-0 hover:underline bg-ppt-red-500 text-white font-bold rounded-full my-6 py-4 px-12 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Get Started
            </router-link>
          </div>
          <!--Right Col-->
          <div class="w-full md:w-3/5 py-6 text-center">
            <img
              class="w-full md:w-4/5 z-50 md:ml-10 mt-10 rounded-3xl max-w-full"
              :src="woman"
            />
          </div>
        </div>
      </div>
      <div class="relative -mt-12 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
    <section class="bg-white py-8">
      <div class="container max-w-5xl mx-auto m-8">
        <h1
          class="w-full my-20 text-4xl font-bold leading-tight text-center text-ppt-black"
        >
          Privacy By Design <LogoDot />
        </h1>
        <div class="w-full mb-4">
          <div
            class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
          ></div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full sm:w-1/2 p-6">
            <img :src="security" />
          </div>
          <div class="w-5/6 sm:w-1/2 p-6">
            <div class="float-left h-[100%] pr-2">
              <LogoDot />
            </div>
            <h3 class="text-2xl text-ppt-black font-bold leading-none mb-3">
              No Database. No Problem.
            </h3>
            <p class="text-gray-600 mb-8 font-light">
              All data you enter is stored exclusively on the device where you
              enter it. There is no “back-end” service connected to this site.
              The server exists only to deliver the necessary code to run the
              service.
              <br />
              <br />
            </p>
          </div>
        </div>
        <div class="flex text-right flex-wrap flex-col-reverse sm:flex-row">
          <div class="w-full sm:w-1/2 p-6 mt-6">
            <div class="float-right h-[100%] pl-4">
              <LogoDot />
            </div>
            <div class="align-middle">
              <h3 class="text-2xl text-ppt-black font-bold leading-none mb-3">
                Open Source, no Trackers.
              </h3>
              <p class="text-gray-600 mb-8 font-light">
                All the code for this site is
                <a
                  class="text-pink-500 underline"
                  href="https://github.com/maxheckel/private-period-tracker"
                  target="_blank"
                  >open source</a
                >
                and we welcome anyone to review it. There are absolutely no
                trackers including analytics, ads or any other pixels or
                cookies.
              </p>
            </div>
          </div>
          <div class="w-full sm:w-1/2 p-6 mt-6">
            <img :src="opensource" />
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto border border-ppt-blue-500 rounded-xl border-2 p-4 text-center text-ppt-black">
      <div class="inline-block absolute mt-[-40px] px-2 py-3 rounded-full border border-ppt-blue-500 bg-ppt-blue-300"><img :src="lightbulb" /></div>
      <span class="block font-bold text-lg tracking-wide mt-4">Find some issues or have feature requests?</span>
      <a href="https://github.com/maxheckel/private-period-tracker/issues" target="_blank" class="underline font-light tracking-widest text-lg">Please submit your feedback on our GitHub page!</a>
    </section>
    <section class="bg-ppt-blue-300 mt-20 bg-white  py-8">
      <div class="container mx-auto flex flex-wrap pt-4 pb-12">
        <h1
          class="w-full my-2 text-3xl font-bold leading-tight text-center text-ppt-black"
        >
          How it works <LogoDot/>
        </h1>
        <div class="w-full mb-4">
          <div
            class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
          ></div>
        </div>
        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div
            class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
          >
            <div class="flex flex-wrap no-underline hover:no-underline">
              <div class="mt-4 w-full font-bold text-xl text-ppt-black px-6">
                What is "Zero-Trust" security?
              </div>
              <p class="text-ppt-black text-base px-6 mb-5">
                <a
                  href="https://en.wikipedia.org/wiki/Zero_trust_security_model"
                  target="_blank"
                  class="text-pink-500 underline inline"
                  >Zero-Trust</a
                >
                is a term used in networking to describe keeping all data in a
                singular location (your device in this instance) and not
                trusting any inbound or outbound requests to said device.
                Because your data is stored exclusively on your device the only
                way to get access to your data is by having access to your
                device.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div
            class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
          >
            <div
              href="#"
              class="flex flex-wrap no-underline hover:no-underline"
            >
              <div class="mt-4 w-full font-bold text-xl text-ppt-black px-6">
                Data Exclusively On Your Device
              </div>
              <p class="text-ppt-black text-base px-6 mb-5">
                When you add data (such as dates of your period) the app
                encrypts and then saves it in your browser's storage using a
                tool called
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
                  class="text-pink-500 underline"
                  >IndexedDB</a
                >.  The only way for anyone to access your data is to have your password.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div
            class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
          >
            <div
              href="#"
              class="flex flex-wrap no-underline hover:no-underline"
            >
              <div class="mt-4 w-full font-bold text-xl text-ppt-black px-6">
                Single device or multiple
              </div>
              <p class="text-ppt-black text-base px-6 mb-5">
                Because of the nature of the storage your data is only available
                on a single device, it does not sync across devices
                automatically. However, eventually you will be able to download
                all your encrypted data and upload it to another device if
                necessary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Change the colour #f8fafc to match the previous section colour -->
    <svg
      class="wave-top"
      viewBox="0 0 1439 147"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
          <g class="wave" fill="#f8fafc">
            <path
              d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
            ></path>
          </g>
          <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
            <g
              transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) "
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                opacity="0.200000003"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>

  </main>
</template>
