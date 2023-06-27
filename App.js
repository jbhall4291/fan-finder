// creates the ugly o.UIManager error when expo snack is opened and defaulted to 'web'
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import MapPage from './pages/MapPage';
import ChatsPage from './pages/ChatsPage';
import ProfilePage from './pages/ProfilePage';
import SingleGigPage from './pages/SingleGigPage';

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    
    <NavigationContainer >
    <Tab.Navigator
      initialRouteName="Map"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >

    
        <Tab.Screen   name="MapPage" component={MapPage} />
        <Tab.Screen name="ChatsPage" component={ChatsPage} />
        <Tab.Screen name="ProfilePage" component={SingleGigPage} />
</Tab.Navigator>

</NavigationContainer>
    
  );
}





export default App;
