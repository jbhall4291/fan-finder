//THIS FILE NEEDS TO BE KEPT OUTSIDE OF COMPONENTS OR CREATES A 500 ANGRY DOG ERROR!

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SingleGigCard from "./components/SingleGigCard";

import {Map} from "./components/Map"


const Stack = createStackNavigator();  // creates object for Stack Navigator

const MapPinNavigator = () => {
    return (
      <Stack.Navigator >
          <Stack.Screen
            name="Map"
            component={Map}
        />
         <Stack.Screen
          name="SingleGigCard"
          component={SingleGigCard}
        />
      </Stack.Navigator>
    );
  }
  
  export {MapPinNavigator}; // Stack-Navigator for Screen 2 Tab