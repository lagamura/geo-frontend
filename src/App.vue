<template>
  <v-app :theme="store.getTheme">
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

const store = useStore();
</script>
