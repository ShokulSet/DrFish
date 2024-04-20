import { useEffect, useRef } from 'react';
import { useCameraDevice, Camera, useCameraPermission,} from 'react-native-vision-camera';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function CameraScreen() {
  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  const device = useCameraDevice('back')
  if (!device) {
    return <Text> Camera not found.</Text>
  }
  const camera = useRef<Camera>(null)
  return (
    <View style={{ flex: 1}}>

      <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      /> 

    </View>
  )
}

function PokedexScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color: "black"}}>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // navigation bar at the  buttom 
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Cam" component={CameraScreen} />
      <Tab.Screen name="Dex" component={PokedexScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}