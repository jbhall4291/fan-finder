import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import Constants from "expo-constants";
import {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapView from "react-native-map-clustering";

import { useState, useEffect, useRef } from "react";
const customMarker = require("../../assets/custom_marker.png");
import { convertToFriendlyDate } from "../../utils/functions";
import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";
// import { BottomSheet } from "react-native-elements"; // for the modal pop-up at the bottom

import GigModal from "./GigModal";

import { getGigs } from "../../utils/api";

import * as Device from "expo-device";

export default function Map({ selectedDate, selectedDistance }) {

  // const handleRegionChangeComplete = (region) => {
  //   const { latitudeDelta, longitudeDelta } = region;
  //   console.log("Zoom Level - Latitude Delta:", latitudeDelta);
  //   console.log("Zoom Level - Longitude Delta:", longitudeDelta);
  // };

  const mapRef = useRef();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [haveUserLocation, setHaveUserLocation] = useState(false);

  // store all gigs the ticketmaster API returns
  const [fetchedGigs, setFetchedGigs] = useState([]);

  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  const [selectedGig, setSelectedGig] = useState(null);

  const navigation = useNavigation();

  const markerTapped = (markerLat, markerLong) => {
    const mapHeight = Dimensions.get("window").height;
    const offset = mapHeight * 0.00000012; // centre marker in top half of map viewport
    // console.log(offset);
    const region = {
      latitude: markerLat - offset,
      longitude: markerLong,
      latitudeDelta: 0.0003598589742495051,
      longitudeDelta: 0.00031717121601104736,
      // latitudeDelta: 0.02,
      // longitudeDelta: 0.02,
    };
    mapRef.current.animateToRegion(region, 1000);

    //  mapView.animateToRegion(region, 500);
    setIsBottomSheetVisible(true);
  };

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
                onRegionChangeComplete={handleRegionChangeComplete}

        clusterColor="#4b006e"
        spiderLineColor="#4b006e"
        ref={mapRef}

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
                onPress={() => {
                  markerTapped(
                    Number(gig._embedded.venues[0].location.latitude),
                    Number(gig._embedded.venues[0].location.longitude)
                  );
                  
                  setSelectedGig(gig)
                }}
                image={customMarker}
                key={index}
                coordinate={{
                  latitude: Number(gig._embedded.venues[0].location.latitude),
                  longitude: Number(gig._embedded.venues[0].location.longitude),
                }}
              >
                
                {/* <Callout
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
                </Callout> */}
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
        <GigModal
          gig={selectedGig}
          isBottomSheetVisible={isBottomSheetVisible}
          setIsBottomSheetVisible={setIsBottomSheetVisible}
        />
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
