import { defineStore } from "pinia";
import type { Tournament } from "./tournament";

// let Tournaments: Tournament []

export const useStore = defineStore("tournaments", {
  state: () => ({
    Tournaments: [] as Tournament[],
    theme: " ",
  }),
  getters: {
    getTournaments: (state): Tournament[] => {
      return state.Tournaments;
    },
    getTheme: (state) => {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
      return state.theme;
    },
  },
  actions: {
    async fetchTours() {
      try {
        const response = await fetch("api/tournaments", {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "same-origin", // no-cors, *cors, same-origin
        });
        this.Tournaments = await response.json();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
});
