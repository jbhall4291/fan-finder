// expo snack doesn't play nice with axios, known issue with babel!
// import axios from "axios";

import { apiKey } from '../apikey';

export const getGigs = (lat, long, date, distance) => {
  console.log(date, ' from getGigs');

  // get the passed 'date' into the correct format for making calls to the ticketmaster api

  let dateRange = '';

  if (date == 'today') {
    const currentDate = new Date();
    dateRange = currentDate.toISOString().slice(0, 11) + '23:59:59Z';
  } // until midnight of the current day}
  else if (date == 'tomorrow') {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const tomorrow = new Date(date);

    dateRange = tomorrow.toISOString().slice(0, 11) + '23:59:59Z';
  } else if (date == 'thisWeek') {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    const thisWeek = new Date(date);

    dateRange = thisWeek.toISOString().slice(0, 11) + '23:59:59Z';
  } else if (date == 'thisMonth') {
    const date = new Date();
    date.setDate(date.getDate() + 30);

    const thisMonth = new Date(date);

    dateRange = thisMonth.toISOString().slice(0, 11) + '23:59:59Z';
  }

  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events/?apikey=${apiKey}&latlong=${lat},${long}&radius=${distance}&endDateTime=${dateRange}&unit=miles&sort=distance,asc&locale=*&segmentName=Music&size=200`
    
  )
    .then((response) => {
      

      return response.json();
    }).then((results) => {
      if (results._embedded) {
        console.log("Got some results");
        return results._embedded.events;
      } else {
        console.log("Got no results");
        return []; // Return an empty array when there are no results
      }
    })

    
    .catch((error) => {
      // console.log('Error:', error);
      throw error;
    });




};
