import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "@rneui/themed";

export const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Welcome to</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/fan_finder_logo.png")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          color="primary"
          size="lg"
          buttonStyle={{ width: 80 }}
          onPress={() => setIsLoggedIn(true)}
          // type="outline"
        />
      </View>
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
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    marginTop: 300,
  },
  logo: {
    resizeMode: "contain",
    height: 150,
    width: 350,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
});
