import React, { useEffect, useState } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Pressable,
    Text
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { showMessage } from "react-native-flash-message"
import Share from 'react-native-share';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import InfoScreen from './Info';

function PreviewScreen({navigation, route}: {navigation: any, route: any}) {
    const { photo, label, id } = route.params;
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
    const onPressedDownload = async () => {
      await CameraRoll.save(`file://${photo.path}`, { type: 'photo' });
      console.log("CameraRoll:Saved");
      showMessage({
        message: "Image Saved",
        type: "info",
        backgroundColor: '#0F1035',
        duration: 1000,
      });
    };
    const onPressedNext = async () => {
      navigation.navigate('InfoScreen', { label: label, id: id});
      // getDBconnection().then((db) => {
      //   getFish(db, id).then(([results]) => {
      //     console.log(results.rows.item(0));
      //   })
      //   .catch((error) => 
      //     console.error(error)
      //   )
      // }).catch((error) =>
      //   console.error(error)
      // )
    };

  
    const onPressedShare = async () => {
      try{
        console.log("Image Sharing")
        await Share.open({url: `file://${photo.path}`});
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <ImageBackground source={{ uri: 'file://' + photo.path }} style={StyleSheet.absoluteFill} resizeMode='cover'>
        {isVisible && (
          <View style={{ flex: 1}}>
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
          </View>
        )}
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
