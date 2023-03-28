import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { getGigs } from "../utils/api";

let locationsOfInterest = [
  {
    title: "Northcoders",
    location: {
      latitude: 53.47237955300849,
      longitude: -2.2382431,
    },
    description: "Northcoders HQ Manchester",
  },
  {
    title: "Manchester Academy",
    location: {
      latitude: 53.46375031620907,
      longitude: -2.2314531000949103,
    },
    description: "Concert venue in the Student's Union",
  },
];

export const Map = () => {
  const [practiceData, setPracticeData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  const [markersList, setMarkersList] = useState([]);

  const onRegionChange = (region) => {
    // console.log(region);
  };

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text(errorMsg);
  } else if (location) {
    text = JSON.stringify(location);
  }

  // console.log(userLat);
  // console.log(userLong);

  //allows ticket master api to get event around user location, err code works to prevent axios errors somehow...7

  //ticketmaster long and lat comes back on _embedded.events[0]._embedded.venues[0].location.longitude

  
  useEffect(() => {
    getGigs(userLat, userLong)
      .then((results) => {
        setPracticeData(results);

        console.log(results);
        setMarkersList(results);
        results.forEach((eachEvent) => {
          // console.log(eachEvent._embedded.venues[0].location.latitude);
          // console.log(eachEvent._embedded.venues[0].location.longitude);
          // setMarkersList([
          //   ...markersList,
          //   {
          //     name: eachEvent.name,
          //     latitude: eachEvent._embedded.venues[0].location.latitude,
          //     longitude: eachEvent._embedded.venues[0].location.longitude,
          //   },
          // ]);
        });


        console.log(markersList);
      })
      .catch((err) => {
        // some error handling here
        console.log(err);
      });
  }, []);

  if (userLat !== null && userLong !== null) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          onRegionChange={onRegionChange}
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            //delta values - the higher the number, the more zoomed out
            latitude: userLat,
            latitudeDelta: 0.10408435934594706,
            longitude: userLong,
            longitudeDelta: 0.08552860468626022,
          }}
        >
          {showLocationsOfInterest()}
          {markersList.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
                // description={marker.description}
              />
            );
          })}
        </MapView>
        <Text>FanFinder Map</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: "95%",
  },
});
