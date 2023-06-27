import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';

const SingleGigPage = ({route}) => {


  const id = route.params.gig;

  return (
    <View style={styles.container}>
     <Text>hello from SingleGig page for {id} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },

});

export default SingleGigPage;