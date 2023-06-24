// expo snack doesn't play nice with axios, known issue with babel!
// import axios from "axios";

import { apiKey } from '../apikey';

export const getGigs = () => {
  
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events/?apikey=${apiKey}&latlong=51.50937515739257,-0.12690104907847516&radius=30&locale=*&segmentName=Music&size=20`
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