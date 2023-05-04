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
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Here is the bottom tab navigation

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: route.name,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: 85,
          },
          tabBarLabelStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#4e2e65",
            backgroundColor: "#ffffff",
          },
        })}

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
          name="Gigs"
          component={MapPinNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="map-search"
                  size={28}
                  color="#4e2e65"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Chats"
          component={ChatsStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <FontAwesome5 name="rocketchat" size={26} color="#4e2e65" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ChatsStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <FontAwesome name="user-circle-o" size={28} color="#4e2e65" />
              );
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
