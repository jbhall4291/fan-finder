import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {convertTimeAndDate} from "../utils/functions"

export const CommentCard = (props) => {
    console.log(props.comment.text)
    const commentText = props.comment.text
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>{commentText}</Text>
      <Text style={styles.commentText}>Comment by: {props.comment.user}</Text>
      <Text style={styles.commentText}>Posted: {convertTimeAndDate(props.comment.created_at)}</Text>
      <Text style={styles.commentText}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    // flex: 1,
    justifyContent: "center",
    alignItem: "center",
    backgroundColor: "red",
    width: "100%"
  },
  title: {
    fontSize: 12,
    width: "100%"
    // marginBottom: 16,
  },
});
