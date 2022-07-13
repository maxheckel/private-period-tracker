<template>
  <router-link to="/">
    <div
      class="toggleColour text-ppt-black no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
    >
      [Private] Period Tracker <LogoDot />
    </div>
  </router-link>
</template>

<script>
import LogoDot from "@/components/LogoDot.vue";
export default {
  name: "AppLogo",
  components: { LogoDot },
};
</script>
