import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { getUserChatIds, getUsersByChatId } from "../utils/api";
import { socket } from "../App";

export const Chats = ({navigation}) => {

    const [room, setRoom] = useState('')
    // a room is the connection socketio makes between clients :)

    const allChatIds = getUserChatIds()

    const joinRoom = () => {
        socket.emit('join_room',{room})
    }

    useEffect(()=>{

    },[room, socket])


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
