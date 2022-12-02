<template>
  <div>
    <div class="d-block">
      <h1>Welcome to GeoChess</h1>
      <Suspense>
        <template #default>
          <Transition appear>
            <div>
              <MapComp />
            </div>
          </Transition>
        </template>
        <template #fallback>
          <span>Loading... Map</span>
        </template>
      </Suspense>
    </div>

    <Suspense>
      <template #default>
        <MainComp />
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>
    <!-- <Transition appear>
      <h3>This is Jerry</h3>
    </Transition> -->
  </div>
</template>

<script setup lang="ts">
import MainComp from "@/components/MainComp.vue";
import MapComp from "@/components/MapComp.vue";
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
