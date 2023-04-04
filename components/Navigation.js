import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Map } from "./Map";
import { MapPinNavigator } from "../InnerStackNavigation";
import { Chats } from "./Chats";
import { ChatsStackNavigation } from "../ChatsStackNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Here is the bottom tab navigation

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // screenOptions={{
      //   headerShown: false,
      //   tabBarIcon: ({ focused, color, size }) => {
      //     return (
      //       <MaterialCommunityIcons
      //         name="map-search"
      //         size={28}
      //         color="black"
      //       />
      //     );
      //   },
      // }}
      // initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={MapPinNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="map-search"
                  size={28}
                  color="black"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="My Chats"
          component={ChatsStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <FontAwesome5 name="rocketchat" size={24} color="black" />;
            },
          }}
        />
        <Tab.Screen
          name="My Profile"
          component={ChatsStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <FontAwesome name="user-circle-o" size={24} color="black" />;
            },
          }}
        />
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
