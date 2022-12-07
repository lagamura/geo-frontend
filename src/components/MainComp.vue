<template>
  <div><v-card :title="`Upcoming Tournaments in `" text="..." variant="tonal"></v-card></div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/tourStore";
import type { Tournament } from "@/stores/tournament";

const store = useStore();

</script>

<style scoped></style>
