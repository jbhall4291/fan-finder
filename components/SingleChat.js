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
            setMessages(...messages,data)
            // Add new messages to list of messages
        })
    }, [socket])

    return (
        <View>
            {messages?.map((msg)=>{
                return (
                    <Text id={msg.id}>{msg.msg}</Text>
                )
            })}
            <TextInput 
                onChangeText={onChangeText}
                value={text}
            />
        </View>
    )
}