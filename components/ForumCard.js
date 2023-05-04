import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button } from "@rneui/base";

import { getGigComments } from "../utils/api";

import { CommentCard } from "./CommentCard";
import { postComment } from "../utils/api";

export const ForumCard = ({ route }) => {
  const id = route.params.msg;
  const fullGigInfo = route.params.infoForGig;

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [haveCommentsLoaded, setHaveCommentsLoaded] = useState(false);

  const commentInputBoxRef = useRef(null); // used by the button so it can 'blur' the input and hide the virtual keyboard

  const submitComment = () => {
    commentInputBoxRef.current.blur();
    postComment({ id, commentText }).then((returnedComment) => {
      setCommentText("");
      setComments((currentComments) => {
        console.log(returnedComment, "returned comment in forumcard");
        return [returnedComment, ...currentComments];
      });
    });
  };

  useEffect(() => {
    getGigComments(id).then((data) => {
      setComments(data.reverse());
      setHaveCommentsLoaded(true);
      console.log(comments);
    });
  }, []);

  const ForumCardHeader = () => {
    return (
      <View style={styles.ForumCardHeader}>
        <Text style={styles.ForumCardHeaderText}>This is the forum for</Text>
        <Text style={styles.ForumCardHeaderTextName}>{fullGigInfo.name}</Text>
        <Text style={styles.ForumCardHeaderText}>Join the discussion!</Text>
      </View>
    );
  };

  const CommentsDisplayer = () => {
    if (!haveCommentsLoaded) {
      return (
        <>
          <ActivityIndicator
            style={styles.ActivityIndicator}
            size="large"
            color="#ffffff"
          />
          <Text>loading comments...</Text>
        </>
      );

      // return <Text>comments loading... please wait!</Text>;
    } else if (haveCommentsLoaded && comments.length === 0) {
      return (
        <Text style={styles.NoComments}>
          no comments found... be the first to comment!
        </Text>
      );
    } else if (comments.length > 0) {
      return (
        <ScrollView style={styles.ScrollView}>
          {comments.map((comment) => {
            return <CommentCard key={comment._id} comment={comment} />;
          })}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.screen}>
      <ForumCardHeader />

      <TextInput
        style={styles.CommentAdderText}
        ref={commentInputBoxRef}
        onChangeText={setCommentText}
        placeholder="enter your comment here"
        placeholderTextColor="#4b006e"
        value={commentText}
        onSubmitEditing={() => submitComment()}
        // multiline={true}
        // numberOfLines={4} // necessary for android only
        // blurOnSubmit={true} // unnecessary as taken care of within submitComment via ref
      />
      <Button
        title="POST COMMENT!"
        color="#4b006e"
        onPress={() => {
          submitComment();
        }}
        size="lg"
        buttonStyle={{
          width: 200,
          height: 60,
          // backgroundColor: "blue"
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 0,
          marginVertical: 10,
        }}
      />

      <CommentsDisplayer />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#4b006e",
    padding: 10,
  },

  CommentAdder: {
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
  },

  ForumCardHeader: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    alignItem: "center",
    // backgroundColor: "darkgrey",
    padding: 10,
    // borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#4b006e",
    marginVertical: 5,
    // borderStyle: "solid",
    // borderWidth: 5,
  },

  ForumCardHeaderText: {
    color: "#ffffff",

    fontSize: 20,
  },

  ForumCardHeaderTextName: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 28,
  },

  ScrollView: {
    backgroundColor: "#4b006e",
    width: "100%",
    // borderColor: "black",
    borderRadius: 10,
    // borderStyle: "solid",
    // borderWidth: 5,
    marginVertical: 5,
  },
  ActivityIndicator: {
    justifyContent: "center",
    paddingTop: "40%",
  },
  NoComments: {
    justifyContent: "center",
    paddingTop: "40%",
    color: "#ffffff",
    fontStyle: "italic",
  },
  CommentAdderText: {
    backgroundColor: "#ffffff",
    padding: 10,
    width: "90%",
    borderRadius: 5,
  },
});
