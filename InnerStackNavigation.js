//THIS FILE NEEDS TO BE KEPT OUTSIDE OF COMPONENTS OR CREATES A 500 ANGRY DOG ERROR!

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SingleGigCard from "./components/SingleGigCard";
import { Map } from "./components/Map";
import { ForumCard } from "./components/ForumCard";

const Stack = createStackNavigator(); // creates object for Stack Navigator

const MapPinNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Screen
        name="Select A Gig"
        component={Map}
        options={{
          headerTitleStyle: {
            color: "#4b006e",
            fontWeight: "bold",
            fontSize: 18,
          },
          headerBackTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#4b006e",
          },
          headerTintColor: "#4b006e",
        }}
      />
      <Stack.Screen
        name="Current Gig"
        component={SingleGigCard}
        options={{
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerBackTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#4b006e",
          },
          headerTintColor: "#4b006e",
        }}
      />
      <Stack.Screen
        name="ForumCard"
        component={ForumCard}
        options={{
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerBackTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#4b006e",
          },
          headerTintColor: "#4b006e",
        }}
      />
    </Stack.Navigator>
  );
};

export { MapPinNavigator }; // Stack-Navigator for Screen 2 Tab
