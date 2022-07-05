<script setup lang="ts">
import { RouterView } from "vue-router";
import NavMenu from "@/components/NavMenu.vue";
import TheFooter from "@/components/TheFooter.vue";
import TrackPeriod from "@/components/TrackPeriod.vue";
</script>

<template>
  <TrackPeriod/>
  <NavMenu/>
  <RouterView />
  <TheFooter/>
</template>

<style>
@import "@/assets/base.css";
</style>
