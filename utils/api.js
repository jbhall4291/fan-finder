import axios from "axios";
import { apiKey } from "../apikey";

const ticketMasterApi = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/events?",
});

export const getGigs = () => {
//   let apikey = `apikey=${apiKey}`;
//   let latlong = "latlong=51.807779660497,1.1491083819429846";
//   let radius = "radius=20";
//   let locale = "locale=*";
//   let path = `${apikey}&${latlong}&${radius}&${locale}`;

    let path = `https://app.ticketmaster.com/discovery/v2/events?apikey=oRmdF1NQGATLsLk6XgMois40a3m0qs1Q&latlong=51.807779660497,1.1491083819429846&radius=20&locale=*`

  return ticketMasterApi.get(path).then((results) => {
    console.log(results.data._embedded.events[0].name);
    // return results;
  });
};
