export interface Tournament {
  name: string;
  location: string;
  city?: string;
  system: string;
  startingDate: string;
  endingDate?: string;
  linkInfo: string;
  lat?: number;
  lon?: number;
  region?: string;
}

export interface TournamentMap extends Tournament {
  city: string;
  lat: number;
  lon: number;
}

export interface TournamentChessResults {
  TourName: string;
  Organizers: string;
  Federation: string;
  Tournament_director: string;
  Chief_Arbiter: string;
  Deputy_Chief_Arbiter: string;
  Arbiter: string;
  Time_control_Blitz: string;
  Location: string;
  Number_of_rounds: string;
  Rating_calculation: string;
  Date: string;
  //   "Rating-Ø": string;
}

export type SearchMode = "singleDate" | "rangeOfDates" | "clear"| undefined;

