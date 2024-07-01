import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from "react-native-flash-message";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BootSplash from "react-native-bootsplash";
import CameraScreen from './Camera.tsx'
import PokedexScreen from './Pokedex.tsx'
import PreviewScreen from './Preview.tsx'
import InfoScreen from './Info.tsx'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CameraStack() {
  return (
    <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#545370',
          tabBarLabelStyle: {
            fontSize: 20,
            fontFamily: 'Dangrek-Regular',
            marginTop: -35,
            marginBottom: 10
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
      <Tab.Screen
        name="Camera" 
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({color}) => (<FontAwesome name="camera" color={color} size={31} />),
        }}
      />
     <Tab.Screen 
        name="Deck"
        component={PokedexScreen}
        options={{
          tabBarLabel: 'Deck',
          tabBarIcon: ({color}) => (<FontAwesome name="book" color={color} size={35} />),
        }}
      />
  </Tab.Navigator>
  );
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CameraScreen" component={CameraStack} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen}/>
        <Stack.Screen name="InfoScreen" component={InfoScreen}/>
      </Stack.Navigator>
      <FlashMessage position="top" textStyle={styles.falshText}/>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  falshText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Dangrek-Regular',
    textAlign: 'center'
  }
})
