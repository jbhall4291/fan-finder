// creates the ugly o.UIManager error when expo snack is opened and defaulted to 'web'
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabMap from "./navigation/TabMap";
import TabChats from "./navigation/TabChats";
import TabProfile from "./navigation/TabProfile";
import StackSingleGig from "./navigation/StackSingleGig";
import StackGigForum from "./navigation/StackGigForum";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreens = () => (
  <Tab.Navigator>
    <Tab.Screen name="TabMap" component={TabMap} />
    <Tab.Screen name="TabChats" component={TabChats} />
    <Tab.Screen name="TabProfile" component={TabProfile} />
  </Tab.Navigator>
);

function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabScreens">
        <Stack.Screen
          name="TabScreens"
          component={TabScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StackSingleGig"
          component={StackSingleGig}
          options={{
            headerTitle: "Single Gig",
            headerBackTitle: "Back to Map",
          }}
        />
        <Stack.Screen
          name="StackGigForum"
          component={StackGigForum}
          options={{
            headerTitle: "Forum Stack",
            headerBackTitle: "Back to Gig",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
