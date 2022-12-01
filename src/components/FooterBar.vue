<template>
  <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>Alpha Version 0.1</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="plain"
        size="small"
        href="https://github.com/lagamura/geo-frontend"
      >
      </v-btn>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Geochess</strong>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const icons = ["mdi-github"];
</script>

<style scoped>
.v-footer {
  padding: 0;
}
</style>
