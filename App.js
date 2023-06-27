// creates the ugly o.UIManager error when expo snack is opened and defaulted to 'web'
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialCommunityIcons } from '@expo/vector-icons';



import MapPage from './pages/MapPage';
import ChatsPage from './pages/ChatsPage';
import ProfilePage from './pages/ProfilePage';
import SingleGigPage from './pages/SingleGigPage';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();




const TabScreens = () => (
  <Tab.Navigator>
 <Tab.Screen   name="MapPage" component={MapPage} />
        <Tab.Screen name="ChatsPage" component={ChatsPage} />
        <Tab.Screen name="ProfilePage" component={ProfilePage} />
    
  </Tab.Navigator>
);



function App() {
  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName="TabScreens" >
      <Stack.Screen name="TabScreens" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="SingleGigPage" component={SingleGigPage} options={{ headerTitle: 'Single Gig', headerBackTitle: 'Back to Map' }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}





export default App;
