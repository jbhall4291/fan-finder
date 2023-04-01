import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { convertTimeAndDate } from "../utils/functions";

export const CommentCard = (props) => {
  console.log(props.comment.text);
  const commentText = props.comment.text;
  return (
    <View style={styles.commentCard}>
      <Text style={styles.commentText}>{commentText}</Text>
      <Text style={styles.commentBy}>Comment by: {props.comment.user}</Text>
      <Text style={styles.commentTimeDate}>
        Posted: {convertTimeAndDate(props.comment.created_at)}
      </Text>
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
});
