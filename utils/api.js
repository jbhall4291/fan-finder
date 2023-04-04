import axios from "axios";
import { apiKey } from "../apikey";

const ticketMasterAPI = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/events",
});

const fanFinderAPI = axios.create({
  baseURL: "https://fanfinder-api.onrender.com"
})

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

// fanfinder api

export const getUserChatIds = (user = "Geoff") => {

  return fanFinderAPI
    .get(`api/users/${user}/chats`)
    .then((results => {
      console.log(results.data.chats, "api results")
      return results.data.chats
    }))

  // return ["chat-1", "chat-2", "chat-3"];
}

export const getUsersByChatId = (id = "chat-1") => {
// need  to stop using this endpoint
  const chats = {
    "chat-1": ["testUser", "Geoff"],
    "chat-2": ["testUser", "Kate"],
    "chat-3": ["testUser", "BlueShoes"]
  }

  return chats[id]
}

export const getChatHistoryById = (id = "chat-1") => {
  
  return fanFinderAPI
  .get(`/api/users/Geoff/${id}`)
  .then((results) => {
    return results.data.chat_history
  })
}

export const postMessageToChat = (message, user, chat_id) => {
  console.log('trying to post message : ', message, user, chat_id )
  return fanFinderAPI
    .post(`/api/users/${user}/${chat_id}`, {"message": message})
    .then((result)=>{
      console.log(result.status, "<sent a message?")
      return result
    })

}

export const getSocketServerAddress = () => {
  return 'https://fanfinder-api.onrender.com/'
}