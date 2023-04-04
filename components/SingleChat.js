import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { getChatHistoryById, postMessageToChat } from "../utils/api";
import { io } from "socket.io-client";

export const SingleChat = ({ route }) => {
  const socket = io.connect("http://localhost:4000");
  const chatId = route.params.id;
  const room = route.params.room;
  const [text, setText] = useState("");
  const [user, setUser] = useState("Team_Express");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChatHistoryById(chatId)
      .then((results) => {
        console.log(results);
        // results.forEach((result)=>{
        //     parseInt(result._id)
        // })
        setMessages(results);
        console.log(loading);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [handlePostMessage]);

  const handlePostMessage = () => {
    console.log("sending message :", text);
    setMessages([...messages, { message: text, user: user }]);
    postMessageToChat(text, user, chatId);
    setText("");
  };

  // useEffect(()=>{
  //     socket.on('send_message', (data) => {
  //         console.log('getting message')
  //         setMessages(...messages,data)
  //         // Add new messages to list of messages
  //     })
  //     console.log(`socket connected? ${socket.connected}`)
  // }, [socket])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView key={1} style={styles.container}>
        {loading ? (
          <View style={styles.LoadingContainer}>
            <ActivityIndicator
              style={styles.ActivityIndicator}
              size="large"
              color="#4e2e65"
            />
            <Text>loading conversations...</Text>
          </View>
        ) : (
          messages.map((msg) => {
            if (msg.user === user) {
              return (
                <View key={msg._id}>
                  <Text style={styles.loggedInUser}>{msg.user}</Text>
                  <Text style={styles.loggedInUserMessage}>{msg.message}</Text>
                </View>
              );
            } else {
              return (
                <View msg={msg._id}>
                  <Text style={styles.otherUser}>{msg.user}</Text>
                  <Text style={styles.otherUserMessage}>{msg.message}</Text>
                </View>
              );
            }
            // console.log(msg)
          })
        )}
      </ScrollView>
      <TextInput
        key={2}
        onChangeText={(text) => {
          setText(text);
        }}
        value={text}
        placeholder={"send a message..."}
        onSubmitEditing={handlePostMessage}
        style={styles.textInput}
      ></TextInput>
      <Button
        key={3}
        style={styles.sendButton}
        title={"send"}
        onPress={handlePostMessage}
        color="#4e2e65"
        size="lg"
        radius="lg"
        buttonStyle={{ width: 250 }}
      ></Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 65,
    padding: 15,
    lineHeight: 15,
    fontSize: 16,
    backgroundColor: "white",
  },
  sendButton: {
    backgroundColor: "#7121AB",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "purple",
  },
  otherUser: {
    fontWeight: "bold",
    // backgroundColor: '#00bfff',
    textAlign: "left",
    marginTop: 10,
    fontSize: 11,
    // textAlign: 'left'
  },
  otherUserMessage: {
    // backgroundColor: '#00bfff',
    alignSelf: "flex-start",
    marginRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B84259",
    lineHeight: 20,
    fontSize: 16,
  },
  loggedInUser: {
    fontWeight: "bold",
    // backgroundColor: '#00bfff',
    alignSelf: "flex-end",
    marginTop: 10,
    fontSize: 11,
  },
  loggedInUserMessage: {
    alignSelf: "flex-end",
    textAlign: "right",
    marginLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7121AB",
    lineHeight: 20,
    fontSize: 16,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: "#F2F1F0"
  },
  ActivityIndicator: {
    justifyContent: "center",
    paddingTop: "40%",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  LoadingContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
});
