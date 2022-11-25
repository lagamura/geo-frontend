<template>
  <Suspense>
    <template #default>
      <MainComp />
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import MainComp from "./components/MainComp.vue";
</script>

<style scoped></style>
