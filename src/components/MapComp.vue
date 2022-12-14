<template>
  <div>
    <div
      id="map"
      class='map-container-lg'
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
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { useStore } from "@/stores/tourStore";
import type { Tournament } from "@/stores/tournament";
import type { TournamentMap } from "@/stores/tournament";
import type { SearchMode } from "@/stores/tournament";
import { storeToRefs } from "pinia";


const store = useStore();
const baseUrl = "https://ratings.fide.com/";
await store.fetchTours();
const { Tournaments: Tours } = storeToRefs(store);
const TourstoMap = ref<Tournament[]>(Tours.value);

const counterToursAdded = ref(0);
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

  // map.on("click", onMapClick);

  // searchInput.value = search.input;
  addTourMarkers(store.mode); //WATCH out for reactivity
  map.addControl(search);
});

// console.log(search.value.searchElement.input.value);

function getLcontent(e: any) {
  var popup = e.target.getPopup();
  var content = popup.getContent();
  console.log(content);
}

function addTourMarkers(mode?: SearchMode) {
  const markers = L.markerClusterGroup({
    chunkedLoading: true,
    //singleMarkerMode: true,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 40,
  });

  if (mode == "singleDate") {
    TourstoMap.value = Tours.value.filter((tour) => {
      return new Date(tour.startingDate) >= store.daterange.startingDate;
    });
  } else if (mode == "rangeOfDates") {
    TourstoMap.value = Tours.value.filter((tour) => {
      if (typeof tour.endingDate !== "undefined") {
        return (
          new Date(tour.startingDate) >= store.daterange.startingDate &&
          new Date(tour.endingDate) <= store.daterange.endingDate
        );
      }
    });
  }
  console.log(`TourstoMap value: ${TourstoMap.value.length}`);

  for (let Tour of TourstoMap.value) {
    counterToursAdded.value++;
    if (Tour.lat && Tour.lon) {
      markers.addLayer(
        L.marker([Tour.lat, Tour.lon]) //[lat,lon]
          .on("click", getLcontent)
          // .addTo(map)
          .bindPopup(
            `${Tour.name} ----- ${Tour.location} ----- <a href="${
              baseUrl + Tour.linkInfo
            }">${Tour.linkInfo}</a> -----
          Starting on: <b>${Tour.startingDate}</b>
          `
          )
      );
      // ... Add more layers ...
    }
  }
  map.addLayer(markers);
}
</script>

<style scoped>
.map-container {
  height: 100vh;
  /* width: 100vw; */
}
.map-container-lg {
  height: 100vh;
  width: 100%;
}
#map {
  color: black !important;
}

div :deep() input {
  color: rgb(11, 12, 12);
}

/* geosearch leaflet-bar leaflet-control leaflet-control-geosearch leaflet-geosearch-button active" */
</style>
