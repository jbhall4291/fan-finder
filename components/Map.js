import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";


export const Map = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Welcome to the map!</Text>
      
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
});
