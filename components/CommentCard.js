import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { convertTimeAndDate } from "../utils/functions";

export const CommentCard = (props) => {
  console.log(props.comment.text);
  const commentText = props.comment.text;
  return (
    <View style={styles.CommentCard}>
      <Image
        style={styles.avatarImg}
        source={require("../assets/avatars/Jagger.png")} // temp hardcode a 'nicer' avatar
        // source={{ uri: `${props.avatar}` }}
      />
      <View style={styles.CommentTextContainer}>
        <Text style={styles.commentText}>{commentText}</Text>
        <Text style={styles.commentBy}>Comment by: {props.comment.user}</Text>
        <Text style={styles.commentTimeDate}>
          Posted: {convertTimeAndDate(props.comment.created_at)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CommentCard: {
    justifyContent: "center",
    alignItem: "center",
    backgroundColor: "darkgrey",
    padding: 10,
    margin: 6,
    borderColor: "black",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: {
    fontSize: 20,
  },
  commentBy: {
    fontSize: 15,
  },
  commentTimeDate: {
    fontSize: 12,
  },
  avatarImg: {
    height: 100,
    width: 100,
  },
  CommentTextContainer: {
    textAlign: "justify",
    marginLeft: 25,
  },
});
