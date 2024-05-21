import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import BootSplash from "react-native-bootsplash";
import CameraScreen from './src/Camera.tsx'
import PokedexScreen from './src/Pokedex.tsx'

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
    // navigation bar at the  buttom
    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator>
      <Tab.Screen name="Cam" component={CameraScreen} />
      <Tab.Screen name="Dex" component={PokedexScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;