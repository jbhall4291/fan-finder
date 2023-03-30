import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { getGigs } from "../utils/api";

export const Chats = ({navigation}) => {
    return (
        <View>
            <Button title={"Button"} onPress={()=>{navigation.navigate('SingleChat')}}></Button>
        </View>
    )
}
