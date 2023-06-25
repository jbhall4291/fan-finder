// creates the ugly o.UIManager error when expo snack is opened and defaulted to 'web'
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapPage from './pages/MapPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapPage">
        <Stack.Screen name="MapPage" component={MapPage} />
        <Stack.Screen name="MapPage 2" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
