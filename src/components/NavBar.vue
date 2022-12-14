<template>
  <v-app-bar>
    <!-- <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
      class="d-sm-none"
    ></v-app-bar-nav-icon> -->
    <v-btn variant="text" to="/" class="hidden-sm-and-down">
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
  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    <v-list> </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/stores/tourStore";
import { storeToRefs } from "pinia";

const store = useStore();
const { theme } = storeToRefs(store);
theme.value = store.SystemTheme();

const drawer = ref(false);

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
  console.log(theme.value);
}
</script>

<style scoped></style>
