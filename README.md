# :guitar: Fan Finder

## Welcome to Fan Finder!

Fan Finder is a location-based social networking app based on live music gigs, allowing users to find gigs in their area and interact with other music fans.

This project was initially built as part of a team of 4 (big shout out to Team Express!) during the amazing [Northcoders Full-Stack Software Developer Bootcamp](https://northcoders.com/) with the aim of demonstrating & developing the following skills:

* Spiking our own choice of new technologies
* Building a React Native mobile app
* Building a RESTful Web API
* Interacting with Mongo databases
* Developing using TDD, pair programming and remote working as part of a small team
* Use of Agile methodologies, inc. Kanban boards and daily Stand Ups
* Implementing the Software Development Lifecycle framework

## Features

* View all upcoming gigs within a 30 mile radius of the users current location
* View details of a a specific gig, with a direct link to buy tickets
* Access a forum for each gig to view/add comments for all users to see
* Chat directly with other users of the app
* View users profile, including upcoming gigs & forum rank

## Using Fan Finder

The app has not been published to the Apple / Google Play store, however there are two options to see the app in action:

Option One - android users only!

Simply [download the Expo Go app](https://expo.dev/expo-go) and scan the QR code below. The app will then build to your device within 20 seconds or so, but please bear in mind the backend is hosted on the free tier of Render so you may have to be patient with the forum/chat features until the server wakes up!

<img src="https://qr.expo.dev/expo-go?owner=jbhall4291&slug=fan-finder&releaseChannel=default&host=exp.host" width="200" />

Due to a change in Apple policy this option is now only available to Android smart phone users.


Option Two

run this with npx expo start, add an apikey from ticketmaster, scan qr code having download expo go app.


A live version of this API can be found here:

https://backend-project-nc-news-49l4.onrender.com/

Please bear in mind this is hosted on a free tier of Render so may take a few seconds to start.

Alternatively, to run a local copy please ensure you are running node (minimum version 19.5.0) and postgreSQL (minimum version 14.6), then follow these steps:

1. Clone this repository:
   ```
   git clone https://github.com/jbhall4291/backend-nc-news
   ```

2. Change into this repos directory:
   ```
   cd backend-nc-news
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Use the provided scripts to set up and seed the dev and test databases.
   ```
   npm run setup-dbs && npm run seed
   ```

5. Create the following two .env files in the main project folder:
   ```
   .env.test
   .env.development
   ```

   Into each of these files, add the single line *PGDATABASE=<database_name_placeholder>*, replacing the placeholder text with the corresponding database name for each environment. Please see `/db/setup.sql` for what each database should be. Double check that these .env files are in `.gitignored`!

6. Start the express server and the app will start listening on 
port 9090 of your localhost
   ```
   npm start
   ```
7. Point your browser at `localhost:9090/api` to see a list of all the endpoints, how to interact with them, and example responses.

8. This app has been fully tested with the use of Jest and the Supertest library. To install the necessary dependencies and run the test suite use:
   ```
   npm install -D jest jest-sorted supertest
   npm test
   ```

9. Enjoy! 🎉












