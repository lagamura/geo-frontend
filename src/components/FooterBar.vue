<template>
  <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>Alpha Version 0.1</strong>
      <a class="pl-4" target="_blank" href="https://icons8.com/icon/59795/globe">Globe icon by&nbsp;</a>
      <a target="_blank" href="https://icons8.com">Icons8</a>
      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="plain"
        size="small"
        href="https://github.com/lagamura/geochess"
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
