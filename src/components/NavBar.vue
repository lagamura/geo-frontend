<template>
  <v-app-bar>
    <v-spacer></v-spacer>
    <router-link to="/about">about </router-link>
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
theme.value = store.SystemTheme();

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
  console.log(theme.value);
}
</script>

<style scoped></style>
