import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { getChatHistoryById, postMessageToChat } from "../utils/api";
import {io} from 'socket.io-client'



export const SingleChat = ({route}) => {
    const socket = io.connect('http://localhost:4000')
    const chatId = route.params.id
    const room = route.params.room
    const [text, setText] = useState('Send a message...');

    const [messages, setMessages] = useState([])



    useEffect(()=>{
        getChatHistoryById(chatId)
        .then((results) => {
            setMessages(results)
        })
        .catch((err) => {
            console.log(err, "error");
        })
    }, [messages, handlePostMessage]);
    
    const handlePostMessage = () =>{
        console.log("sending message :", text)
        setMessages([...messages, {message: text, user: "Geoff"}])
        postMessageToChat(text, 'Geoff', chatId )
        setText("Send a message...")
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
        <View>
            <View>

            {messages?.map((msg)=>{
                return (
                    <> 
                    <Text>User: {msg.user}</Text>
                    <Text >{msg.message}</Text>
                    </> // android bugs here adding chat id
                )
            })}
            <TextInput 
                onChangeText= {(text) => {setText(text)} }
                value={text}
                >
            </TextInput>
            
            </View>
            <View>
                <Button title={"send"} onPress={handlePostMessage}></Button>
            </View>
        </View>
    )
}