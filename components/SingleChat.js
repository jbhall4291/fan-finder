import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Button } from "@rneui/base";
import { useState, useEffect, useRef } from "react";
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

  const scrollViewRef = useRef();

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
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 200);
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
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
      }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView key={1} ref={scrollViewRef} style={styles.container}>
        {loading ? (
          <View style={styles.LoadingContainer}>
            <ActivityIndicator
              style={styles.ActivityIndicator}
              size="large"
              color="#4b006e"
            />
            <Text>loading conversations...</Text>
          </View>
        ) : (
          messages.map((msg, index) => {
            if (msg.user === user) {
              return (
                <View key={index}>
                  <Text style={styles.loggedInUser}>{msg.user}</Text>
                  <Text style={styles.loggedInUserMessage}>{msg.message}</Text>
                </View>
              );
            } else {
              return (
                <View msg={msg._id} key={msg._id}>
                  <Text style={styles.otherUser}>{msg.user}</Text>
                  <Text style={styles.otherUserMessage}>{msg.message}</Text>
                </View>
              );
            }
            // console.log(msg)
          })
        )}
      </ScrollView>
      <View style={styles.SendContainer}>
        <TextInput
          key={2}
          onChangeText={(text) => {
            setText(text);
          }}
          value={text}
          placeholder={"type a message here..."}
          onSubmitEditing={handlePostMessage}
          style={styles.textInput}
        ></TextInput>
        <Button
          key={3}
          style={styles.sendButton}
          title={"send"}
          onPress={handlePostMessage}
          color="#4b006e"
          // size="lg"
          radius="lg"
          marginLeft="50"
          // buttonStyle={{ width: 250 }}
        ></Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  SendContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#4b006e",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    
    
  },
  sendButton: {
    marginLeft: 10

  },
  textInput: {
    // marginTop: 5,
    width: "80%",
    height: 40,
    padding: 7,
    marginLeft: 4,
    lineHeight: 15,
    fontSize: 16,
    backgroundColor: "white",
    borderColor: "#4b006e",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2
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
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 2,
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
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4b006e",
    lineHeight: 20,
    fontSize: 16,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    // backgroundColor: "green"
  },
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 5,
    
    // backgroundColor: "blue"
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
