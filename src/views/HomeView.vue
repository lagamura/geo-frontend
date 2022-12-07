<template>
  <div>
    <v-row>
      <v-col cols="8">
        <!-- <div class="d-block"> -->
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
        <!-- </div> -->
      </v-col>
      <v-col cols="4" class="pt-6 mt-8">
        <!-- <MainComp ></MainComp> -->
      </v-col>
    </v-row>
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
