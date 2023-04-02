import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/themed";

export const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <View style={styles.layout}>
      <Image
        style={styles.logo}
        source={require("../assets/fan_finder_logo.png")}
      />

      <Button
        style={styles.button}
        title="Login"
        color="#4e2e65"
        size="lg"
        radius="lg"
        buttonStyle={{ width: 120 }}
        onPress={() => setIsLoggedIn(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: "center",
  },

  logo: {
    resizeMode: "contain",
    height: 350,
    width: 350,
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 20,
  },
  button: {
    justifyContent: "center",
    marginVertical: 20,
    marginTop: 100,
  },
});
