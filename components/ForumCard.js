import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TextInput,
  Button
} from "react-native";

import { getGigById } from "../utils/api";
import { getGigComments } from "../utils/api";

import { CommentCard } from "./CommentCard";

export const ForumCard = ({ route }) => {
  const id = route.params.msg;
  const fullGigInfo = route.params.infoForGig;
  console.log(id + "<<<< this is from forumcard!!!!!");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("")
  const [text, steText] = useState("")

  useEffect(() => {
    getGigComments(id).then((data) => {
      setComments(data);
      console.log(comments);
    });
  }, []);
  return comments.length === 0 ? (
    <View style={styles.screen}>
      <Text style={styles.titleText}>
        Join the discussion for {fullGigInfo.name} -
        {fullGigInfo.dates.start.localDate}
      </Text>
      <Text>Be the first to comment! </Text>
    </View>
  ) : (
    <View style={styles.screen}>
      <Text style={styles.titleText}>
        Join the discussion for {fullGigInfo.name} -
        {fullGigInfo.dates.start.localDate}
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={setCommentText}
        placeholder="enter your comment here"
        value={commentText}
      />
      <Button
        title="POST COMMENT"
        color="#841584"
        // onPress={() => ()}
      />

      {comments.map((comment) => {
        return <CommentCard key={comment._id} comment={comment} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "`#000000`",
  },
  titleText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 30,
  },
  bodyText: {
    color: "#000",
    fontSize: 20,
  },
  gigImage: {
    height: "25%",
    width: "75%",
  },
});
