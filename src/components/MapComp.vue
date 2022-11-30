<template>
  <div>
    <div
      id="map"
      :class="smAndDown ? 'map-container' : 'map-container-lg'"
    ></div>
    <p>{{ searchInput }}</p>
    <!-- </div>
  <v-btn @click="fetchToursAction()"> Fetch Tournaments </v-btn>
  <div> -->
    <span>{{ `Tournaments fetched: ${counterToursAdded} ` }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import L from "leaflet";
import * as GeoSearch from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useStore } from "@/stores/tourStore";
import { useDisplay } from "vuetify";
import type { Tournament } from "@/stores/tournament";

const { smAndDown } = useDisplay();

const store = useStore();
const Tours = ref();
const baseUrl = "https://ratings.fide.com/";
await store.fetchTours();
Tours.value = store.getTournaments;

const counterToursAdded = ref(0);
const popup = ref();
const searchInput = ref(""); // needs refactoring to get value from box

const search = GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
  style: "bar",
});

let map: any;

onMounted(() => {
  map = L.map("map");
  // map.setView([lat, lng], zoom);
  map.setView([37.98381, 23.727539], 6);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // popup.value = L.popup()
  //   .setLatLng([37.9, 23.7])
  //   .setContent("I am a standalone popup.")
  //   .openOn(map);

  map.on("click", onMapClick);

  // searchInput.value = search.input;
  map.addControl(search);
  addTourMarkers();
});

// console.log(search.value.searchElement.input.value);

function onMapClick(e: any) {
  popup.value
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${e.latlng.toString()}`)
    .openOn(map);
}

async function addTourMarkers() {
  for (let Tour of Tours.value) {
    if (Tour.lat && Tour.lon) {
      counterToursAdded.value++;
      L.marker([Tour.lat, Tour.lon]) //[lat,lon]
        .addTo(map)
        .bindPopup(
          `${Tour.name} ----- ${Tour.location} ----- <a href="${
            baseUrl + Tour.linkInfo
          }">${Tour.linkInfo}</a>`
        )
        .openPopup();
    }
  }
}
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100vw;
}
.map-container-lg {
  height: 80vh;
  width: 80vw;
}
#map {
  color: black !important;
}

div :deep() input {
  color: rgb(11, 12, 12);
}

/* geosearch leaflet-bar leaflet-control leaflet-control-geosearch leaflet-geosearch-button active" */
</style>
