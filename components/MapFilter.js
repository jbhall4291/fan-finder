import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useState, useEffect } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from '@rneui/themed';

export default function MapFilter({
  setSelectedDate = { setSelectedDate },
  setSelectedDistance = { setSelectedDistance },
}) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState('thisWeek');
  const [datePickerItems, setDatePickerItems] = useState([
    { label: 'Today', value: 'today' },
    { label: 'Today & Tomorrow', value: 'tomorrow' },
    { label: 'Next 7 days', value: 'thisWeek' },
    { label: 'Next 30 days', value: 'thisMonth' },
  ]);

  const [distancePickerOpen, setDistancePickerOpen] = useState(false);
  const [distancePickerValue, setDistancePickerValue] = useState(25);
  const [distancePickerItems, setDistancePickerItems] = useState([
    { label: '5 miles', value: 5 },
    { label: '10 miles', value: 10 },
    { label: '25 miles', value: 25 },
    { label: '50 miles', value: 50 },
    { label: '100 miles', value: 100 },
  ]);

  const handleFilterButtonPress = (date, distance) => {
    // console.log(
    //   `MapFilter button pressed with these values: ${datePickerValue} ${distancePickerValue}`
    // );
    setSelectedDate(datePickerValue);
    setSelectedDistance(distancePickerValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <DropDownPicker
          open={datePickerOpen}
          value={datePickerValue}
          items={datePickerItems}
          setOpen={setDatePickerOpen}
          setValue={setDatePickerValue}
          setItems={setDatePickerItems}
          containerStyle={styles.pickerContainer}
        />
        <DropDownPicker
          open={distancePickerOpen}
          value={distancePickerValue}
          items={distancePickerItems}
          setOpen={setDistancePickerOpen}
          setValue={setDistancePickerValue}
          setItems={setDistancePickerItems}
          containerStyle={styles.pickerContainer}
        />
        <Button
          onPress={handleFilterButtonPress}
          icon={{
            name: 'search',
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
          buttonStyle={styles.button}
        />
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // backgroundColor: 'grey',
    margin: 10,
  },
  pickerContainer: {
    color: 'red',
    flex: 1,
    // height: 40,
    marginRight: 2,
    // backgroundColor: 'lightgray',
    zIndex: 1,
    borderColor: '#4b006e',
  },
  button: {
    backgroundColor: '#4b006e',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 15,
    width: 50,
    height: 50,
    margin: 2,
  },
});
