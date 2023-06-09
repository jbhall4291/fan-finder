# :guitar: Fan Finder


<img src="https://github.com/jbhall4291/fan-finder/blob/main/fanfinder_screenshots.png" />


## Welcome to Fan Finder!

Fan Finder is a location-based social networking app based on live music gigs, allowing users to find gigs in their area and interact with other music fans.

You can watch a [short video of me demonstrating the app here](https://www.youtube.com/watch?v=kQ7weiOZzHM&t=2s), or check out the [team presentation over on Northcoders](https://northcoders.com/projects/apr-2023/fanfinder)... otherwise read on!

This project was initially built as part of a team of 4 (big shout out to Team Express!) during the amazing [Northcoders Full-Stack Software Developer Bootcamp](https://northcoders.com/) with the aim of demonstrating & developing the following skills:

* Spiking our own choice of technologies
* Building a React Native mobile app
* Developing using pair programming & remote working as part of a small team
* Use of Agile methodologies, inc. Kanban boards and daily Stand Ups
* Implementing the Software Development Lifecycle framework

The corresponding backend for this project can [be found here](https://github.com/jbhall4291/fan-finder-backend), which utilised the following skills:
* Building a RESTful Web API
* Interacting with Mongo databases
* Developing using TDD 

## Features

* View all upcoming gigs within a 30 mile radius of the users current location
* View details of a a specific gig, with a direct link to buy tickets
* Access a forum for each gig to view/add comments for all users to see
* Chat directly with other users of the app
* View users profile, including upcoming gigs & forum rank

## Using Fan Finder

The app has not been published to the Apple / Google Play store, however there are two options to see the app in action:

### Option One - Android users only!

Due to a change in Apple policy this option is now only available to Android smart phone users.

Simply [download the Expo Go app](https://expo.dev/expo-go) and scan the QR code below. The app will then build to your device within 20 seconds or so, but please bear in mind the backend is hosted on the free tier of Render so you may have to be patient with the forum/chat features until the server wakes up!

<img src="https://qr.expo.dev/expo-go?owner=jbhall4291&slug=fan-finder&releaseChannel=default&host=exp.host" width="200" />

### Option Two

To run a local copy please ensure you are running node (minimum version 19.5.0) then follow these steps:

1. Clone this repository:
   ```
   git clone https://github.com/jbhall4291/fan-finder-fe
   ```

2. Change into this repos directory:
   ```
   cd fan-finder-fe
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Create the following file in the project root:
   ```
   apikey.js
   ```

5.  Into this file, add the below line which includes your own Ticketmaster API key, which you can receieve instantly & free of charge [once registered for a Ticketmaster Developer account](https://developer-acct.ticketmaster.com/user/register).
   ```
   export const apiKey = "YOUR_TICKETMASTER_API_KEY_HERE"
   ```

6. Start the Metro Bundler
   ```
   npx expo start
   ```
   
7. [Download the Expo Go app](https://expo.dev/expo-go) and scan the generated QR code with your either your Camera app on iOS / directly within the Expo Go app on Andoid. The app will build to your device within 20 seconds or so, but please bear in mind the backend is hosted on a free tier of Render so may take a few seconds to wake up on first use of the forum or chat features.

8. Enjoy! 🎉
