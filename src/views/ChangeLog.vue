<script setup lang="ts">

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
<template>
  <div>
    <div class="mt-20"></div>
    <div class="container mx-auto px-4 text-2xl">
      <ul>
        <li>2022-07-05</li>
        <ul>
          <li>asdf</li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ChangeLog.vue"
}
</script>

<style scoped>

</style>