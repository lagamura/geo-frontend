<template>
  <v-app :theme="theme">
    <NavBar />
    <v-main>
      <v-container><MainContainer /></v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import MainContainer from "./components/MainContainer.vue";
import { useStore } from "@/stores/tourStore";
import { storeToRefs } from "pinia";

const store = useStore();
const { theme } = storeToRefs(store);
</script>
