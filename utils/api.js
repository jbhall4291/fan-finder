import axios from "axios";
import { apiKey } from "../apikey";

const ticketMasterAPI = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/events",
});

export const getGigs = (lat, long) => {
  // just queries with getGigs, no path
  let path = "";

  return ticketMasterAPI
    .get(path, {
      params: {
        apikey: apiKey,
        latlong: `${lat},${long}`,
        radius: 25, // defaults to 25miles if not queried
        locale: "*",
        segmentName: "Music",
        // this is where we could add queries for specific genres (genreID) or subgenres (subGenreID)
      },
    })
    .then((results) => {
      return results.data._embedded.events; // array of all gigs
    });
};
