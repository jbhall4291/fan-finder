import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Map } from "./Map";
// import { SingleGig } from "./SingleGig";

import { SecondScreenNavigator } from "../CustomNavigation";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen 
        name="Home" 
        component={SecondScreenNavigator} />
        {/* <Tab.Screen
        name="Screen 2"
        component={SecondScreenNavigator}
        /> */}
      </Tab.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="SingleGig" component={SingleGig} />
      </Stack.Navigator> */}
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
