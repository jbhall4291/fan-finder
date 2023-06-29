import * as React from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useState, useEffect } from "react";
const customMarker = require("../../assets/custom_marker.png");
import { convertToFriendlyDate } from "../../utils/functions";
import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";

import { getGigs } from "../../utils/api";

import * as Device from "expo-device";

export default function Map({ selectedDate, selectedDistance }) {
  const [haveUserLocation, setHaveUserLocation] = useState(false);

  // store all gigs the ticketmaster API returns
  const [fetchedGigs, setFetchedGigs] = useState([]);

  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  const navigation = useNavigation();

  // ask for location permissions, and set lat & long into state
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      // if running on a physical device, get the GPS lat & long...
      if (Device.isDevice) {
        setUserLat(location.coords.latitude);
        setUserLong(location.coords.longitude);
      } else {
        //... if it's not a physical device, default to london area
        // (rather than a random US city where the simulator is hosted!)
        setUserLat(51.94260293312824);
        setUserLong(0.21641179942055638);
      }
      setHaveUserLocation(true);
    })();
  }, []);

  useEffect(() => {
    getGigs(userLat, userLong, selectedDate, selectedDistance)
      .then((results) => {
        setFetchedGigs(results);
      })
      .catch((err) => {
        // error handling
      });
  }, [selectedDate, selectedDistance]);

  if (haveUserLocation) {
    return (
      <View style={styles.container}>
        {/* <View>
          <Text>
            date: {selectedDate}! distance: {selectedDistance}!
          </Text>
        </View> */}
        <MapView
          showsMyLocationButton={Device.isDevice} // only show the location button if on an actual device (as simular will be in random US city!)
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            //delta values - the higher the number, the more zoomed out
            latitude: userLat,
            longitude: userLong,
            latitudeDelta: 1.10408435934594706,
            longitudeDelta: 1.08552860468626022,
          }}
        >
          {fetchedGigs.map((gig, index) => {
            return (
              <Marker
                image={customMarker}
                key={index}
                coordinate={{
                  latitude: Number(gig._embedded.venues[0].location.latitude),
                  longitude: Number(gig._embedded.venues[0].location.longitude),
                }}
              >
                <Callout
                  // style={{ height: 100, width: 160 }}
                  style={{ width: 150, backgroundColor: "white" }}
                  onPress={() =>
                    navigation.navigate("StackSingleGig", { gig: gig })
                  }
                >
                  <Text style={styles.GigName}>{gig.name}</Text>
                  <Text style={styles.GigStart}>
                    On: {convertToFriendlyDate(gig.dates.start.localDate)}
                  </Text>
                  <Text style={styles.GigStart}>
                    At: {gig.dates.start.localTime?.slice(0, 5)}
                  </Text>
                </Callout>
              </Marker>
            );
          })}

          <Circle
            strokeWidth={1}
            strokeColor="rgba(75, 0, 110,0.1)"
            fillColor="rgba(75, 0, 110,0.1)"
            center={{ latitude: userLat, longitude: userLong }}
            radius={selectedDistance * 1609.344}
          />
        </MapView>
      </View>
    );
  }

  // whilst waiting for the user location to be set, display a loading message
  return (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator
        style={styles.ActivityIndicator}
        size="large"
        color="#4b006e"
      />
      <Text style={styles.LoadingText}>loading map...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
