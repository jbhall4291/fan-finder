import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps'




let locationsOfInterest = [
  {
    title: "Northcoders",
    location: {
      latitude: 53.47237955300849,
      longitude: -2.2382431
    },
    description: "Northcoders HQ Manchester"
  },
  {
    title: "Manchester Academy",
    location: {
      latitude: 53.46375031620907,
      longitude: -2.2314531000949103
    },
    description: "Concert venue in the Student's Union"
  },
]

export const Map = () => {

  const onRegionChange = (region) => {
    console.log(region);
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
      )
    })
  }

  return (
    <View style={styles.container}>
    <MapView 
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    onRegionChange={onRegionChange}
    initialRegion={
      {"latitude": 53.4696815846948, 
      "latitudeDelta": 0.10408435934594706, 
      "longitude": -2.2426839731633663, 
      "longitudeDelta": 0.08552860468626022}
    }>
     {showLocationsOfInterest()}
    </MapView>
      
      
    
    
    <Text>FanFinder Map</Text>
    <Text></Text>
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
  map:{
    width:'100%',
    height:'95%'
  }
});
