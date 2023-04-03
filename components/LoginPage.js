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
      <Image
        style={styles.expressLogo}
        source={require("../assets/team-express-logo.jpg")}
      />
  
      <Button
        style={styles.button}
        title="Continue as teamexpress"
        color="#4e2e65"
        size="lg"
        radius="lg"
        buttonStyle={{ width: 250 }}
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
  expressLogo: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 20,
  },
  button: {
    justifyContent: "center",
    marginVertical: 20,
    marginTop: 10,
  },
});
