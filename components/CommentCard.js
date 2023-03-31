import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export const CommentCard = (props) => {
    console.log(props.comment.text)
    const commentText = props.comment.text
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>{commentText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    // flex: 1,
    justifyContent: "center",
    alignItem: "center",
  },
  title: {
    fontSize: 12,
    // marginBottom: 16,
  },
});
