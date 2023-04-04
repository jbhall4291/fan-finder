import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const SplashScreen = () => (
  <View style={styles.container}>
    <Text style={styles.Text}>Made By</Text>
    <Image
      style={styles.logo}
      source={require("../assets/team-express-logo.jpg")}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  Text: {
    marginBottom: 25,
    fontFamily: "Courier New",
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default SplashScreen;
