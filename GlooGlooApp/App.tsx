import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import BootSplash from "react-native-bootsplash";
import CameraScreen from './src/Camera.tsx'
import PokedexScreen from './src/Pokedex.tsx'
import { View } from 'react-native-reanimated/lib/typescript/Animated';

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
      <Tab.Navigator screenOptions={{
        tabBarBackground: () => (
          <view  style={{backgroundColor:"black"}}/>
        ), 
      }}>
      <Tab.Screen name="Cam" component={CameraScreen} />
      <Tab.Screen name="Dex" component={PokedexScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  navigatorContainer : {
    backgroundColor: 'white'
  }
})