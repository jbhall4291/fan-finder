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

export const getUserChatIds = (user = "geoff") => {
// user.toLowerCase()
  return fanFinderAPI
  .get(`api/users/${user}/chats`).then((results => {
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
    console.log(results.data.chat_history)
    return results.data.chat_history
  })

  // const chatHistories = {
  //   "chat-1": [
  //       {
  //           message: "Hello",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-28")
  //       },
  //       {
  //           message: "Hola",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-27")
  //       },
  //       {
  //           message: "Bonjour",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-26")
  //       },
  //       {
  //           message: "Howdy",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-25")
  //       },
  //       {
  //           message: "Epic gig tonight",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-24")
  //       },
  //       {
  //           message: "Whatsup?",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-23")
  //       },
  //       {
  //           message: "Hiya",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-22")
  //       },
  //       {
  //           message: "How are you?",
  //           room: "chat-1",
  //           user: "Geoff",
  //           created_at: new Date ("2023-03-21")
  //       }],
  //   "chat-2": [
  //     {
  //       message: "Hello",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-28")
  //   },
  //   {
  //       message: "Hola",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-27")
  //   },
  //   {
  //       message: "Bonjour",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-26")
  //   },
  //   {
  //       message: "Howdy",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-25")
  //   },
  //   {
  //       message: "Epic gig tonight",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-24")
  //   },
  //   {
  //       message: "Whatsup?",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-23")
  //   },
  //   {
  //       message: "Hiya",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-22")
  //   },
  //   {
  //       message: "How are you?",
  //       room: "chat-2",
  //       user: "Kate",
  //       created_at: new Date ("2023-02-21")
  //   }
  //   ],
  //   "chat-3": [
  //     {
  //       message: "Hello",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-28")
  //   },
  //   {
  //       message: "Hola",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-27")
  //   },
  //   {
  //       message: "Bonjour",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-26")
  //   },
  //   {
  //       message: "Howdy",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-25")
  //   },
  //   {
  //       message: "Epic gig tonight",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-24")
  //   },
  //   {
  //       message: "Whatsup?",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-23")
  //   },
  //   {
  //       message: "Hiya",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-22")
  //   },
  //   {
  //       message: "How are you?",
  //       room: "chat-3",
  //       user: "BlueShoes",
  //       created_at: new Date ("2023-01-21")
  //   }
  //   ]
  // }

  // return chatHistories[id]
}

export const postMessageToChat = (message, user, chat_id) => {
  return fanFinderAPI(`/api/users/:user_id/:chat_id`)

}

export const getSocketServerAddress = () => {
  return 'https://fanfinder-api.onrender.com/'
}