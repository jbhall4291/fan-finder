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

const ChatsPage = () => {

  return (
    <View style={styles.container}>
     <Text>hello from chats page</Text>
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

export default ChatsPage;