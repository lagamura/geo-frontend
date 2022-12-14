<template>
  <div>
    <v-select
      label="Filter Tournaments"
      v-model="select"
      :items="['Tournaments starts after date', 'Tournaments starts in range']"
      variant="underlined"
    ></v-select>

    <!-- <label for="filter">filter Tournaments</label>

    <select name="filter" id="filter-tournaments" v-model="select">
      <option value="Tournaments starts after date">
        Tournaments starts after date
      </option>
      <option value="Tournaments starts in range">
        Tournaments starts in range
      </option>
    </select> -->

    <Datepicker
      v-if="select"
      v-model="date"
      :range="isRange"
      :enable-time-picker="false"
    ></Datepicker>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useStore } from "@/stores/tourStore";

const store = useStore();
const date = ref(); // Date | Date[]
const select = ref("");

// const format = (date: Date) => {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   return `Selected date is ${day}/${month}/${year}`;
// };

const isRange = computed(() => {
  return select.value == "Tournaments starts in range" ? true : false;
});

watch(date, () => {
  if (select.value == "Tournaments starts after date") {
    store.daterange.startingDate = date.value;
    store.mode = "singleDate";
    console.log("State should be changed to singleDate and values accordingly");
  } else if (select.value == "Tournaments starts in range") {
    store.daterange.startingDate = date.value[0];
    store.daterange.endingDate = date.value[1];
    store.mode = "rangeOfDates";
    console.log(
      "State should be changed to rangeofDates and values accordingly"
    );
  }
});
</script>

<style scoped>
#filter-tournaments {
  background-color: rgba(253, 253, 253, 0.981);
  color: black;
}
</style>
