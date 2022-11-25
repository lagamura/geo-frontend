<template>
  <div>
    <h1>Welcome to GeoChess</h1>
    <!-- <div v-for="Tour of Tours" :key="Tour.TourName">
        {{ Tour.TourName }}
      </div> -->
    {{ Tours }}
  </div>
</template>

<script setup lang="ts">
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const response = await fetch(VITE_BASE_URL + "/tournaments", {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
});
console.log(response);
const Tours = await response.json();

console.log(Tours);
</script>

<style scoped></style>
