import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Map } from "./Map";
import { MapPinNavigator } from "../InnerStackNavigation";
import { Chats } from './Chats'
import { ChatsStackNavigation } from '../ChatsStackNavigation'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Here is the bottom tab navigation

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={{
        headerShown: false,
    }}
    initialRouteName="Home">
        <Tab.Screen 
        name="Home" 
        component={MapPinNavigator} />
         <Tab.Screen 
        name="ChatsScreen" 
        component={ChatsStackNavigation} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
