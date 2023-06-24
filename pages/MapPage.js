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
  const [filterData, setFilterData] = useState({}); // State for filter data

  // Function to handle filter data changes
  const handleFilterChange = (newFilterData) => {
    setFilterData(newFilterData);
  };

  return (
    <View style={styles.container}>
      <Map onFilterChange={handleFilterChange} />
       <View style={styles.mapFilterContainer}>
      <MapFilter filterData={filterData} />
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
