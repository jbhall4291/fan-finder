// expo snack doesn't play nice with axios, known issue with babel!
// import axios from "axios";

import { apiKey } from '../apikey';

export const getGigs = (lat, long) => {
  
console.log(`https://app.ticketmaster.com/discovery/v2/events/?apikey=${apiKey}&latlong=${lat},${long}&radius=30&locale=*&segmentName=Music&size=20`)

  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events/?apikey=${apiKey}&latlong=${lat},${long}&radius=1000&locale=*&segmentName=Music&size=200`
  )
    .then((response) => {
      // console.log('Response status:', response.status);
      return response.json();
    })
    .then((results) => {
      //  console.log(results._embedded.events);
      return results._embedded.events; // Return the parsed JSON data
    })
    .catch((error) => {
      // console.log('Error:', error);
      throw error;
    });
};