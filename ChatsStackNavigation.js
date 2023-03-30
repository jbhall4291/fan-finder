//THIS FILE NEEDS TO BE KEPT OUTSIDE OF COMPONENTS OR CREATES A 500 ANGRY DOG ERROR!

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import {Chats} from './components/Chats'
import {SingleChat} from './components/SingleChat'

const Stack = createStackNavigator();  // creates object for Stack Navigator

const ChatsStackNavigation = () => {
    return (
      <Stack.Navigator >
          <Stack.Screen
            name="Chats"
            component={Chats}
        />
         <Stack.Screen
          name="SingleChat"
          component={SingleChat}
        />
      </Stack.Navigator>
    );
  }
  
  export {ChatsStackNavigation}; // Stack-Navigator for Screen 2 Tab