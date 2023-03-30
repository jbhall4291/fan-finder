import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { getUserChatIds, getUsersByChatId } from "../utils/api";


export const Chats = ({navigation}) => {

    const allChatIds = getUserChatIds()


    return (
        <View>
            {
                allChatIds.map((chat) => {
                    return (
                        <Button 
                            id={chat}
                            title={getUsersByChatId(chat)[1]}
                            onPress={()=>{navigation.navigate('SingleChat', {id: chat})}
                        }></Button>
                    )
                })
            }
        </View>
    )
}
