import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { getUserChatIds, getUsersByChatId } from "../utils/api";
// import {getSocketServerAddress} from './utils/api'
// const socketAddress = getSocketServerAddress()
// Make sure socket server is running
import {io} from 'socket.io-client'
const socket = io.connect('http://localhost:4000')


export const Chats = ({navigation}) => {
    const [user, setUser] = useState("Test User")
    const [room, setRoom] = useState('')
    // a room is the connection socketio makes between clients :)

    const allChatIds = getUserChatIds()

    

    const joinRoom = (room) => {
        socket.emit('join_room', {"room": room, "user": user})
        console.log("joining room")
        console.log(socket)
    }

    useEffect(()=>{
        socket.on('connection', () => {
            console.log(socket.id)
        })
    },[])

    return (
        <View>
            {
                allChatIds.map((chat) => {
                    return (
                        <Button 
                            id={chat}
                            title={getUsersByChatId(chat)[1]}
                            onPress={()=>{
                                setRoom(chat)
                                joinRoom(room)
                                navigation.navigate('SingleChat', {id: chat, "room": room})
                            }
                        }></Button>
                    )
                })
            }
        </View>
    )
}
