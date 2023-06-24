// creates the ugly o.UIManager error when expo snack is opened and defaulted to 'web'
import MapPage from './pages/MapPage';

import { View, Text, Platform } from 'react-native';

export default function App() {
  if (Platform.OS === 'web') {
    return (
      <View>
        <Text>
          Please select an iOS or Android simulator, or My Device to scan a QR
          code with your physical device.
        </Text>
      </View>
    );
  } else {
    return (
     <MapPage />
    );
  }
}
