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
        radius: 150, // defaults to 25miles if not queried
        locale: "*",
        segmentName: "Music",


        startDateTime: "2023-03-31T12:48:00Z",
        endDateTime: "2023-03-31T23:59:00Z",

        size: 200, // max number of results returned; 200 is the limit from the API, unless we deal with pagination
        // <--- this is where we could add queries for specific genres (genreID) or subgenres (subGenreID)
      },
    })
    .then((results) => {
      return results.data._embedded.events; // array of all gigs
    });
};

export const getGigById = (gig_id) => {
  let path = `${gig_id}?`;
  return ticketMasterAPI.get(`/${path}apikey=${apiKey}`).then((results) => {
    return results.data;
  });
};

const fanfinderAPI = axios.create({
  baseURL: "https://fanfinder-api.onrender.com/api",
});

export const getGigComments = (gigId) => {
  let path = `/gigs/${gigId}/comments`
  return fanfinderAPI.get(`/gigs/${gigId}/comments`)
  .then((results) => {
    return results.data.comments
  })
};
