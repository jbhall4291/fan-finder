import axios from "axios";
import { apiKey } from "../apikey";

const baseURL = "https://app.ticketmaster.com/discovery/v2/events?";

export const getGigs = (lat, long) => {
  let latlong = `latlong=${lat},${long}`;
  // console.log(latlong);

  //   let latlong = "latlong=51.807779660497,1.1491083819429846";
  let radius = "radius=20";
  //   let locale = "locale=*";
  //   let path = `${apikey}&${latlong}&${radius}&${locale}`;

  // let path = `https://app.ticketmaster.com/discovery/v2/events?apikey=oRmdF1NQGATLsLk6XgMois40a3m0qs1Q&latlong=53.6221281,-2.1770889&radius=20&locale=*`;

  return axios
    .get(`${baseURL}apikey=${apiKey}&${latlong}&${radius}&locale=*`)
    .then((results) => {
      // console.log(results.data._embedded.events[0].name);

      return results.data._embedded.events.map((event) => {
        return {
          name: event.name,
          latitude: event._embedded.venues[0].location.latitude,
          longitude: event._embedded.venues[0].location.longitude,
        };
      });
    });
};

//  53.6221281,-2.1770889
// 51.807779660497,1.1491083819429846
