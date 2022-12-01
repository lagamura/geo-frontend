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
  },
  actions: {
    async fetchTours() {
      try {
        const response = await fetch(
          "https://geo-backend-production.up.railway.app/tournaments",
          {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "same-origin", // no-cors, *cors, same-origin
          }
        );
        this.Tournaments = await response.json();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    SystemTheme: () => {
      let theme;
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        theme = "dark";
      } else {
        theme = "light";
      }
      return theme;
    },
  },
});
