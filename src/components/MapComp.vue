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
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { useStore } from "@/stores/tourStore";
import { useDisplay } from "vuetify";
import type { Tournament } from "@/stores/tournament";
import { storeToRefs } from "pinia";

const { smAndDown } = useDisplay();

const store = useStore();
const baseUrl = "https://ratings.fide.com/";
await store.fetchTours();
const { Tournaments: Tours } = storeToRefs(store);

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

  // map.on("click", onMapClick);

  // searchInput.value = search.input;
  addTourMarkers();
  map.addControl(search);
});

// console.log(search.value.searchElement.input.value);

function onMapClick(e: any) {
  popup.value
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${e.latlng.toString()}`)
    .openOn(map);
}

function getLcontent(e: any) {
  var popup = e.target.getPopup();
  var content = popup.getContent();
  console.log(content);
}

function addTourMarkers() {
  const markers = L.markerClusterGroup({
    chunkedLoading: true,
    //singleMarkerMode: true,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 40,
  });
  for (let Tour of Tours.value) {
    if (
      Tour.lat &&
      Tour.lon &&
      Tour.startingDate >= new Date(Date.now()).toISOString() // add Tournaments only for future dates
    ) {
      counterToursAdded.value++;
      // console.log(`working with ${Tour.location}`);
      // let length = Tours.value.filter((el) => {
      //   return el.location === Tour.location;
      // }).length;
      // console.log(Tour.location, " found multiple times");
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
    } else {
      // console.log(
      //   `${Tour.startingDate} --- ${new Date(Date.now())
      //     .toISOString()
      //     .slice(0, 10)}`
      // );
    }
  }
  map.addLayer(markers);
}
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100vw;
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
