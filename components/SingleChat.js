import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { getChatHistoryById } from "../utils/api";

export const SingleChat = ({route}) => {

    const chatId = route.params.id

    const chatHistory = getChatHistoryById(chatId)

    return (
        <View>
            {chatHistory.map((msg)=>{
                return (
                    <Text id={msg.id}>{msg.msg}</Text>
                )
            })}
        </View>
    )
}