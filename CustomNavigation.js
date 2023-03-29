import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import NestedScreen from "./components/NestedScreen";

import {Map} from "./components/Map"


const Stack = createStackNavigator();  // creates object for Stack Navigator

const SecondScreenNavigator = () => {
    return (
      <Stack.Navigator >
          <Stack.Screen
            name="Map"
            component={Map}
        />
         <Stack.Screen
          name="NestedScreen2"
          component={NestedScreen}
        />
      </Stack.Navigator>
    );
  }
  
  export {SecondScreenNavigator}; // Stack-Navigator for Screen 2 Tab