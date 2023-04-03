import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { convertTimeAndDate } from "../utils/functions";

export const UserCard = (props) => {
  console.log(props, "<<<<<props in usercard");
  //   const commentText = props.comment.text;
  return (
    <View style={styles.commentCard}>
      <Text style={styles.commentText}>{props.username}</Text>
      <Image
        style={styles.avatarImg}
        source={{ uri: `${props.avatar}` }}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  commentCard: {
    justifyContent: "center",
    alignItem: "center",
    backgroundColor: "darkgrey",
    padding: 10,
    margin: 6,
    borderColor: "black",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 5,
  },
  commentText: {
    fontSize: 25,
    textAlign: "center",
  },
  commentBy: {
    fontSize: 18,
    textAlign: "center",
  },
  commentTimeDate: {
    fontSize: 15,
    textAlign: "center",
  },
  avatarImg: {
    height: "20%",
    width: "75%",
  }
});
