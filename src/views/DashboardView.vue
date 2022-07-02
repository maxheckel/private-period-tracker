<template>

</template>

<script>
export default {
  name: "DashboardView",
  async mounted() {
    const header = document.getElementById("header");
    const navaction = document.getElementById("navAction");
    const toToggle = document.querySelectorAll(".toggleColour");
    const navcontent = document.getElementById("nav-content");
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
}
</script>

<style scoped>

</style>