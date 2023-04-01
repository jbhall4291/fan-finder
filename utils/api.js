import axios from "axios";
import { apiKey } from "../apikey";

const ticketMasterAPI = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/events",
});

export const getGigs = (lat, long) => {
  // get todays date into the correct format for making calls to the ticketmaster api
  const currentDate = new Date();
  const fromNow = currentDate.toISOString().slice(0, 19) + "Z"; // lop off the millisecs & replace the Z
  const untilMidnight = currentDate.toISOString().slice(0, 11) + "23:59:59Z"; // hardcode until midnight of the current day

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

        startDateTime: fromNow,
        endDateTime: untilMidnight,

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
  let path = `/gigs/${gigId}/comments`;
  return fanfinderAPI.get(`/gigs/${gigId}/comments`).then((results) => {
    return results.data.comments;
  });
};

export const postComment = ({ id, commentText }) => {
  console.log(id, "id from api");
  console.log(commentText, "comment from api");
  return fanfinderAPI
    .post(`/gigs/${id}/comments`, {
      gig_id: id,
      user: "teamexpress",
      text: commentText,
      created_at: new Date(),
    })
    .then((results) => {
      console.log(results.data.comment, "results in api");
      return results.data.comment;
    })
    .catch((err) => {
      console.log(err, "<< err");
    });
};

export const getUserGigs = () => {
  console.log("gigs");
  return fanfinderAPI
    .get(`/users/teamexpress/gigs`)
    .then((results) => {
      console.log(results.data.gigs, "these are the users gigs");
      return results.data.gigs;
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const getGigComments = (gigId) => {
//   let path = `/gigs/${gigId}/comments`;
//   return fanfinderAPI.get(`/gigs/${gigId}/comments`).then((results) => {
//     return results.data.comments;
//   });
// };
// export const getGigById = (gig_id) => {
//   let path = `${gig_id}?`;
//   return ticketMasterAPI.get(`/${path}apikey=${apiKey}`).then((results) => {
//     return results.data;
//   });
// };
