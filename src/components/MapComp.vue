<template>
  <div class="map-wrapper">
    <div id="map"></div>
    <p>{{ searchInput }}</p>
    <div>
      <span>{{ counterToursAdded }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import L from "leaflet";
import * as GeoSearch from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useStore } from "@/stores/tourStore";
import type { Tournament } from "@/stores/tournament";

const store = useStore();
await store.fetchTours();
const Tours: Tournament[] = store.getTournaments;

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
  map.setView([37.98381, 23.727539], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  popup.value = L.popup()
    .setLatLng([37.9, 23.7])
    .setContent("I am a standalone popup.")
    .openOn(map);

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
  for (let Tour of Tours) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search/${Tour.location}?` +
        new URLSearchParams({
          format: "json",
          countrycodes: "gr",
          limit: "1",
        })
    );
    // translate Tour to geodata
    const nominatim = await response.json();
    // add Tour marker
    if (!(Object.keys(nominatim).length === 0)) {
      console.log(nominatim);
      L.marker([nominatim[0].lat, nominatim[0].lon]) //[lat,lon]
        .addTo(map)
        .bindPopup(
          `${nominatim[0].display_name} \n ----
         ${Tour.name} ----- ${Tour.location} ----- ${Tour.linkInfo}`
        )
        .openPopup();
    }
  }
}
</script>

<style scoped>
#map {
  height: 80vh;
  width: 80vh;
  color: black !important;
}

div :deep() input {
  color: rgb(11, 12, 12);
}

/* geosearch leaflet-bar leaflet-control leaflet-control-geosearch leaflet-geosearch-button active" */
</style>
