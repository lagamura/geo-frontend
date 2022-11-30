<template>
  <v-app-bar>
    <v-spacer></v-spacer>

    <v-btn
      :prepend-icon="
        theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
      @click="onClick"
    ></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/tourStore";
import { storeToRefs } from "pinia";

const store = useStore();
const { theme } = storeToRefs(store);

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<style scoped></style>
