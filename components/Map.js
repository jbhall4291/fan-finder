import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { getGigs } from "../utils/api";
import { Navigation } from "./Navigation";

export const Map = ({navigation}) => {
  // check if we have the users location, so we don't immediately make the ticketmaster API call
  const [haveUserLocation, setHaveUserLocation] = useState(false);

  // store all gigs the ticketmaster API returns
  const [fetchedGigs, setFetchedGigs] = useState([]);

  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  const onRegionChange = (region) => {
    //this is used when the user moves around the map view i.e. panning/zooming
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
      setHaveUserLocation(true);
    })();
  }, []);

  //NOTE: ticketmaster long and lat comes back on _embedded.events[0]._embedded.venues[0].location.longitude
  useEffect(() => {
    if (haveUserLocation) {
      getGigs(userLat, userLong)
        .then((results) => {
          setFetchedGigs(results);
        })
        .catch((err) => {
          // some error handling here
          console.log(err);
        });
    }
  }, [haveUserLocation]);

  if (haveUserLocation) {
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
          {fetchedGigs.map((gig, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number(gig._embedded.venues[0].location.latitude),
                  longitude: Number(gig._embedded.venues[0].location.longitude),
                }}
                
                // onPress={()=>navigation.navigate('NestedScreen1',{msg:"From Screen 1"})}
                // title={gig.name}
                // description={`nice gig, that\nunique id: ${gig.id}\n${gig.url}`}
              >
                <Callout onPress={()=>navigation.navigate('NestedScreen2',{msg:"From Screen 2"})} >
                  <Text>{gig.name}</Text>
                  <Text>Gig id: {gig.id}</Text>
                  <Text>Start time?</Text>
                  <Text>Ticket price?</Text>
                  <Text>Etc etc</Text>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }

  // whilst waiting for the user location to get set, display a loading message
  return (
    <View style={styles.container}>
      <Text>loading map...</Text>
    </View>
  );
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
    height: "100%",
  },
});
