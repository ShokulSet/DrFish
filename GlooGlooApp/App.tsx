import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import BootSplash from "react-native-bootsplash";
import CameraScreen from './src/Camera.tsx'
import PokedexScreen from './src/Pokedex.tsx'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

function App() {
  useEffect(() => {
    const init = async () => {
    // loading process
    };
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#545370',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            fontFamily: 'Dangrek'
          },
          tabBarStyle: {
            height: 100,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: '#0F1035',
            opacity: 0.9,
            position: 'absolute',
            borderTopWidth: 0,
        },
      })}
      >
      <Tab.Screenrr
        name="Camera" 
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({color}) => (<Icon name="camera" color={color} size={30} />),
        }}
      />
      <Tab.Screen name="Deck" component={PokedexScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;