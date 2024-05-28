import React from 'react';
import { View, ImageBackground, StyleSheet, Pressable, Dimensions, Text } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

function PreviewScreen({ navigation, route }) {
    const { photo } = route.params;
    const { width } = Dimensions.get('window');

    return (
        <ImageBackground source={{ uri: 'file://' + photo }} style={StyleSheet.absoluteFill} resizeMode='cover'>
            <View style={styles.crossContainer}>
                <Pressable 
                style={styles.cross}
                onPress={() => navigation.goBack()}
                >
                    <EvilIcons name='close' color={'white'} size={30}/>
                </Pressable>
            </View>
            <View style={styles.tabBarContainer}>
                <View style={styles.buttonContainer}>
                  <AntDesign name='download' color={'white'} size={35} />
                  <Text style={styles.buttonText}>Download</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <AntDesign name='caretright' color={'white'} size={35} />
                </View>
                <View style={styles.buttonContainer}>
                  <Entypo name='share' color={'white'} size={35} />                  
                </View>
            </View>
        </ImageBackground>

  );
};

const styles = StyleSheet.create({
  crossContainer: {
    position: 'absolute',
    alignSelf: "center", 
    top: 22,
    right: 22,
    width: 40, 
    height: 40, 
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cross: {
    alignSelf: "center",
    bottom: 3
  },
  tabBarContainer: {
    height: 100,
    width: '100%',
    bottom: 0,
    paddingHorizontal: 5,
    paddingTop: 0,
    backgroundColor: '#0F1035',
    opacity: 0.9,
    position: 'absolute',
    borderTopWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: 40, 
    height: 40, 
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Dangrek-Regular',
    position: 'absolute',
    top: 30
  }
});

export default PreviewScreen;
