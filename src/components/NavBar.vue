<template>
  <v-app-bar>
    <v-btn variant="text" to="/">
      <v-app-bar-title
        >Geochess
        <v-icon icon="mdi-earth"></v-icon>
      </v-app-bar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn variant="text" to="/contact">contact</v-btn>
    <v-btn variant="text" to="/about">about</v-btn>
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

<style scoped>
</style>
