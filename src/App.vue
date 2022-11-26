<template>
  <div>
    <h1>Welcome to GeoChess</h1>
    <Suspense>
      <template #default>
        <MapComp />
      </template>
      <template #fallback>
        <span>Loading... Map</span>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <MainComp />
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import MainComp from "./components/MainComp.vue";
import MapComp from "./components/MapComp.vue";
</script>

<style scoped></style>
