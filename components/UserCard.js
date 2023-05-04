import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export const UserCard = (props) => {
  console.log(props, "<<<<<props in usercard");
  //   const commentText = props.comment.text;
  return (
    <View style={styles.UserCard}>
      <Image
        style={styles.avatarImg}
        source={require("../assets/avatars/purpleDefault.png")} // temp hardcode a 'nicer' avatar
        // source={{ uri: `${props.avatar}` }}
      />
      <Text style={styles.Username}>{props.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  UserCard: {
    // justifyContent: "flex-start",
    // alignItem: "",
    backgroundColor: "#ffffff",
    padding: 10,
    // margin: 6,
    // borderColor: "#271A31",
    alignSelf: "center",
    borderRadius: 10,
    // borderStyle: "solid",
    // borderWidth: 5,
    width: 325,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  Username: {
    fontSize: 15,
    // textAlign: "center",
    // justifyContent: "center",
    // height: 120
    marginLeft: 15,
  },

  avatarImg: {
    height: 40,
    width: 40,
  },
});
