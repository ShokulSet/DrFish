import React from 'react';
import { View, ImageBackground, StyleSheet, Pressable, Dimensions, Text } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { showMessage, hideMessage } from "react-native-flash-message"
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

function PreviewScreen({ navigation, route }) {
    const { photo } = route.params;
    const { width } = Dimensions.get('window');
    const onPressedDownload = async () => {
      await CameraRoll.save(`file://${photo.path}`, { type: 'photo' });
      console.log("CameraRoll:Saved");
      showMessage({
        message: "Image Saved",
        type: "info",
        backgroundColor: '#0F1035',
        duration: 1000,
      });
    }
    const onPressedNext = async () => {
      // Implement next button functionality here
    }
    const onPressedShare = async () => {
      // Implement share button functionality here
    }

    return (
      <ImageBackground source={{ uri: 'file://' + photo.path }} style={StyleSheet.absoluteFill} resizeMode='cover'>
        <View style={styles.crossContainer}>
          <Pressable
            style={styles.cross}
            onPress={() => navigation.goBack()}
          >
            <EvilIcons name='close' color={'white'} size={30} />
          </Pressable>
        </View>
        <View style={styles.tabBarContainer}>
          <View style={styles.buttonContainer}>
            <Pressable onPress={onPressedDownload} style={styles.pressable}>
              <AntDesign name='download' color={'white'} size={35} />
              <Text style={styles.buttonText}>Download</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={onPressedNext} style={styles.pressable}>
              <AntDesign name='caretright' color={'white'} size={35} />
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={onPressedShare} style={styles.pressable}>
              <Entypo name='share' color={'white'} size={35} />
              <Text style={styles.buttonText}>Share</Text>
            </Pressable>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12

  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Dangrek-Regular',
    textAlign: 'center'
  }
});

export default PreviewScreen;
