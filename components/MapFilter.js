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

export default function MapFilter() {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState('thisWeek');
  const [datePickerItems, setDatePickerItems] = useState([
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This Week', value: 'thisWeek' },
    { label: 'Next Week', value: 'nextWeek' },
    { label: 'This Month', value: 'thisMonth' },
  ]);

  const [distancePickerOpen, setDistancePickerOpen] = useState(false);
  const [distancePickerValue, setDistancePickerValue] = useState('25miles');
  const [distancePickerItems, setDistancePickerItems] = useState([
    { label: '5 miles', value: '5miles' },
    { label: '10 miles', value: '10miles' },
    { label: '25 miles', value: '25miles' },
    { label: '50 miles', value: '50miles' },
    { label: '80 miles+', value: '80miles' },
  ]);

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
