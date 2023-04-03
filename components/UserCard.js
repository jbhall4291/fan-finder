import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export const UserCard = (props) => {
  console.log(props, "<<<<<props in usercard");
  //   const commentText = props.comment.text;
  return (
    <View style={styles.UserCard}>
      <Image
        style={styles.avatarImg}
        source={require("../assets/avatars/Jagger.png")} // temp hardcode a 'nicer' avatar
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
    backgroundColor: "darkgrey",
    padding: 10,
    // margin: 6,
    borderColor: "black",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 5,
    width: "100%",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
  },
  Username: {
    fontSize: 50,
    // textAlign: "center",
    // justifyContent: "center",
    // height: 120
    marginLeft: 25,
  },

  avatarImg: {
    height: 100,
    width: 100,
  },
});
