import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Welcome to FanFinder!</Text>
      <Button
        title="Login"
        color="#841584"
        onPress={() => (setIsLoggedIn(true))}
      />
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
