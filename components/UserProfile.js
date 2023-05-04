import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export const UserProfile = () => {
  return (
    <View style={styles.UserProfile}>
      <Text>This is your profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  UserProfile: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
    color: "black",
    backgroundColor: "white",
  },
});
