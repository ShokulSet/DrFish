import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './src/Camera.tsx'
import PokedexScreen from './src/Pokedex.tsx'

const Tab = createBottomTabNavigator();

function App() {
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
export default App;