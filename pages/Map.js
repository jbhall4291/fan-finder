import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useState, useEffect } from 'react';
const customMarker = require('../assets/custom_marker.png');
import { convertToFriendlyDate } from '../utils/functions';
import * as Location from 'expo-location';

import { getGigs } from '../utils/api';

import * as Device from 'expo-device';

export default function Map() {
  const [haveUserLocation, setHaveUserLocation] = useState(false);

  // store all gigs the ticketmaster API returns
  const [fetchedGigs, setFetchedGigs] = useState([]);

  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  // ask for location permissions, and set lat & long into state
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
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
    getGigs()
      .then((results) => {
        setFetchedGigs(results);
      })
      .catch((err) => {
        // some error handling here
        // console.log(err);
      });
  }, []);

  if (haveUserLocation) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            //delta values - the higher the number, the more zoomed out
            latitude: userLat,

            longitude: userLong,
            latitudeDelta: 1.10408435934594706,
            longitudeDelta: 1.08552860468626022,
          }}>
          {fetchedGigs.map((gig, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number(gig._embedded.venues[0].location.latitude),
                  longitude: Number(gig._embedded.venues[0].location.longitude),
                }}>
                <Image
                  source={customMarker}
                  style={{ height: 45, width: 45 }}
                />
                <Callout
                  // style={{ height: 100, width: 160 }}
                  style={{ width: 150, backgroundColor: 'white' }}
                  onPress={() =>
                    navigation.navigate('Current Gig', { msg: `${gig.id}` })
                  }>
                  <View>
                    <Text style={styles.GigName}>{gig.name}</Text>
                    <Text style={styles.GigStart}>
                      On: {convertToFriendlyDate(gig.dates.start.localDate)}
                    </Text>
                    <Text style={styles.GigStart}>
                      At: {gig.dates.start.localTime?.slice(0, 5)}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
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
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
