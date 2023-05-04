import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/base";

export const UserProfile = () => {
  return (
    <View style={styles.UserProfile}>
      <View style={styles.UserContainer}>
        <Image
          style={styles.avatarImg}
          source={require("../assets/avatars/purpleDefault.png")} // temp hardcode a 'nicer' avatar
          // source={{ uri: `${props.avatar}` }}
        />

        <Text style={styles.Username}>Team_Express</Text>
      </View>

      <View style={styles.UpcomingGigs}>
        <View style={styles.Text}>
          <Text style={styles.Text}>You have</Text>
          <Text style={[styles.Text, styles.Large]}>7</Text>
          <Text style={styles.Text}>upcoming gigs</Text>
        </View>
        <View style={styles.ForumRank}>
          <Text style={styles.Text}>Your forum rank is</Text>
          <Text style={[styles.Text, styles.Large]}>Rock Legend</Text>
        </View>
      </View>

      <Button
          key={3}
          style={styles.SignOutButton}
          title="SIGN OUT"
          // onPress={handlePostMessage}
          color="#4b006e"
          // size="lg"
          radius="lg"
          marginRight="40"
          // buttonStyle={{ width: 250 }}
        ></Button>
      
    </View>
  );
};

const styles = StyleSheet.create({
  UserContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "lightgrey",

    marginBottom: 70,
  },
  UserProfile: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
    color: "black",
    backgroundColor: "white",
  },
  avatarImg: {
    height: 90,
    width: 90,
    marginRight: 25,
  },
  Username: {
    fontSize: 25,
    color: "#4b006e",
  },
  Info: {
    justifyContent: "center",
    alignItem: "center",
  },
  TextHighlight: {
    fontFamily: "San Francisco",
  },
  Text: {
    fontSize: 30,
    textAlign: "center",
    color: "#4b006e",
  },
  Large: {
    fontSize: 50,
  },
  ForumRank: {
    marginTop: 70,
  },
  SignOutButton: {
    marginTop: 100,
    marginHorizontal: 100
  }
});
