<template>
  <div>
    <v-row>
      <v-col cols="12" md="8">
        <!-- <div class="d-block"> -->
        <h1 class="text-xs-h6 text-sm-h5 text-md-h4 hidden-sm-and-down">
          Welcome to GeoChess
        </h1>
        <Suspense>
          <template #default>
            <Transition appear>
              <div>
                <MapComp :key="daterange.startingDate.toISOString()" />
              </div>
            </Transition>
          </template>
          <template #fallback>
            <span>Loading... Map</span>
          </template>
        </Suspense>
        <!-- </div> -->
      </v-col>
      <v-col
        cols="12"
        md="4"
        :order="smAndDown ? 'first' : 'last'"
        class="mt-0 mt-md-8 pt-md-6"
      >
        <DatePicker />
        <!-- <VselectBug /> -->
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// import MainComp from "@/components/MainComp.vue";
import MapComp from "@/components/MapComp.vue";
import DatePicker from "@/components/DatePicker.vue";
import { useStore } from "@/stores/tourStore";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const store = useStore();
const { daterange } = storeToRefs(store);
const componentKey = ref(0);

watch(daterange, () => {
  componentKey.value++;
  console.log(componentKey);
});
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
