import { defineStore } from "pinia";
import type { Tournament } from "./tournament";

// let Tournaments: Tournament []
let url: string;
if (import.meta.env.DEV) {
  url = "api/tournaments";
} else {
  url = "https://geo-backend-production.up.railway.app/tournaments";
}

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
        const response = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
        });
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
