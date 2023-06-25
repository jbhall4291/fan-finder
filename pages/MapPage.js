import React, { useState } from 'react';
import Map from '../components/Map';
import MapFilter from '../components/MapFilter';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';

const MapPage = () => {
  // const [datePickerValue, setDatePickerValue] = useState('thisWeek');
  // const [distancePickerValue, setDistancePickerValue] = useState('25miles');

  // // Function to handle filter data changes
  // const handleFilterChange = (newFilterData) => {
  //   setFilterData(newFilterData);
  // };

const [selectedDate, setSelectedDate] = useState("thisWeek");
const [selectedDistance, setSelectedDistance] = useState(25);



  return (
    <View style={styles.container}>
      <Map selectedDate={selectedDate} selectedDistance={selectedDistance}  />
       <View style={styles.mapFilterContainer}>
      <MapFilter setSelectedDate={setSelectedDate} setSelectedDistance={setSelectedDistance} />
    </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapFilterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default MapPage;
