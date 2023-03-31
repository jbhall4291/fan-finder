import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { getChatHistoryById } from "../utils/api";
import { socket } from "../App";

export const SingleChat = ({route}) => {

    const chatId = route.params.id
    const room = route.params.room
    const [text, onChangeText] = React.useState('. . .');

    const [messages, setMessages] = useState([])
    useEffect(()=>{
        setMessages(getChatHistoryById(chatId))
    },[])
    
    useEffect(()=>{
        socket.on('send_message', (data) => {
            console.log('getting message')
            setMessages(...messages,data)
            // Add new messages to list of messages
        })
    }, [socket])

    return (
        <View>
            <View>

            {messages?.map((msg)=>{
                return (
                    <Text >{msg.msg}</Text> // android bugs here adding chat id
                )
            })}
            <TextInput 
                onChangeText={onChangeText}
                value={text}
                >
            </TextInput>
            
            </View>
            <View>
                <Button title={"send"} onPress={()=>{
                    socket.emit('send_message', {msg: text})
                }}></Button>
            </View>
        </View>
    )
}