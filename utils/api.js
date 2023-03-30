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
        radius: 50, // defaults to 25miles if not queried
        locale: "*",
        segmentName: "Music",
        size: 200, // max number of results returned; 200 is the limit from the API, unless we deal with pagination
        // <--- this is where we could add queries for specific genres (genreID) or subgenres (subGenreID)
      },
    })
    .then((results) => {
      return results.data._embedded.events; // array of all gigs
    });
};

export const getGigById = (gig_id) => {
  let path =`${gig_id}?`
  return ticketMasterAPI
    .get(`/${path}apikey=${apiKey}`).then((results) => {
      console.log(results.data)
      return results.data
      
    })
  }

  
export const getUserChatIds = (user = "testUser") => {

  return ["chat-1", "chat-2", "chat-3"];
}

export const getUsersByChatId = (id = "chat-1") => {

  const chats = {
    "chat-1": ["testUser", "user-2"],
    "chat-2": ["testUser", "user-4"],
    "chat-3": ["testUser", "user-3"]
  }

  return chats[id]
}

export const getChatHistoryById = (id = "chat-1") => {

  const chatHistories = {
    "chat-1": [
      {msg: "Hello", id:1},
      {msg: "Howdy",id:2},
      {msg: "Whatsup",id:3},
      {msg: "hiya",id:4},
      {msg: "hola",id:5},
      {msg: "bonjour",id:6},
      {msg: "dumela",id:7},
    ],
    "chat-2": [
      {msg: "Hello", id:1},
      {msg: "Howdy",id:2},
      {msg: "Whatsup",id:3},
      {msg: "hiya",id:4},
      {msg: "hola",id:5},
      {msg: "bonjour",id:6},
      {msg: "dumela",id:7},
    ],
    "chat-3": [
      {msg: "Hello", id:1},
      {msg: "Howdy",id:2},
      {msg: "Whatsup",id:3},
      {msg: "hiya",id:4},
      {msg: "hola",id:5},
      {msg: "bonjour",id:6},
      {msg: "dumela",id:7},
    ]
  }

  return chatHistories[id]
}

export const getSocketServerAddress = () => {
  return 'http://localhost:4000'
}