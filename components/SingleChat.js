import React from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState, useEffect } from "react";
import { getChatHistoryById, postMessageToChat } from "../utils/api";
import {io} from 'socket.io-client'



export const SingleChat = ({route}) => {
    const socket = io.connect('http://localhost:4000')
    const chatId = route.params.id
    const room = route.params.room
    const [text, setText] = useState('');
    const [user, setUser] = useState('Team Express')

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(()=>{

        getChatHistoryById(chatId)
        .then((results) => {
            setMessages(results)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err, "error");
        })
    }, [messages, handlePostMessage]);
    
    const handlePostMessage = () =>{
        console.log("sending message :", text)
        setMessages([...messages, {message: text, user: user}])
        postMessageToChat(text, user, chatId )
        setText("")
    }

    // useEffect(()=>{
    //     socket.on('send_message', (data) => {
    //         console.log('getting message')
    //         setMessages(...messages,data)
    //         // Add new messages to list of messages
    //     })
    //     console.log(`socket connected? ${socket.connected}`)
    // }, [socket])

    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>

            <ScrollView style={styles.container}
                
            >
            {loading? (<Text>Loading. . . </Text>) :
            messages.map((msg)=>{
                if (msg.user === user) {
                    return (
                        <>
                        <Text style={styles.user}>{msg.user}</Text>
                        <Text style={styles.loggedInUser}>{msg.message}</Text>
                        </> // android bugs here adding chat id
                    )
                } else {
                    return (
                        <> 
                        <Text style={styles.user}>{msg.user}</Text>
                        <Text >{msg.message}</Text>
                        </>
                    )
                }
                // console.log(msg) 
            })}
           <View>
            </View>
            </ScrollView>
                <TextInput 
                    onChangeText= {(text) => {setText(text)} }
                    value={text}
                    placeholder={"send a message..."}
                    onSubmitEditing={handlePostMessage}
                    style={styles.textInput}
                    >
                </TextInput>
                <Button title={"send"} onPress={handlePostMessage}></Button>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40
    },
    user: {
        fontWeight: 'bold',
        // textAlign: 'right'
    },
    message: {
        backgroundColor: '#00bfff'
    },
    loggedInUser: {
        fontWeight: 'bold',
        // backgroundColor: '#00bfff',
        // textAlign: 'right',
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        marginRight: 10    
    }
})