<template>
  <v-app :theme="theme">
    <NavBar />
    <v-main>
      <v-container ><RouterView /></v-container>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
import { useStore } from "@/stores/tourStore";
import { storeToRefs } from "pinia";

const store = useStore();
const { theme } = storeToRefs(store);
</script>
