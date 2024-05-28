import { useRef, useState } from 'react';
import { useCameraDevice, Camera, useCameraPermission, PhotoFile } from 'react-native-vision-camera';
import { Pressable, StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import FocusSvg from '../assets/svg/Focus.svg'


const requestPermission = async () => {
  try {
    const grantedCamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'App needs access to your camera ' +
          'so you can take pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedWrite = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write Permission',
        message:
          'App needs access to write file ' +
          'so you can save picture.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    )
    if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED && grantedWrite === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission Granted');
      return true;
    } else {
      console.log('Permission Denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

function CameraScreen({ navigation }) {
    const device = useCameraDevice('back')
    const [photo, setPhoto] = useState<PhotoFile>();
    const [modalVisible, setModalVisible] = useState(false);
    const camera = useRef<Camera>(null)
    const onTakePicturePressed = async () => {
        const photo = await camera.current?.takePhoto({
          enableShutterSound: false,
          enablePrecapture: true,
          qualityPrioritization: 'quality'
        });
        console.log(photo)
        navigation.navigate('PreviewScreen', { photo: photo});
        // CameraRoll.save(file:{photo.})
        // Magic AI Work then pokedex
        // setModalVisible(true)
    }

    if (!requestPermission()) {
      requestPermission();
    }
    if (!device) {
      return <Text> Camera not found.</Text>
    }

    return (
      // Display camera view
      <View style={styles.centeredView}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        /> 
        
        <FocusSvg style={{marginBottom: 200}}/>

        {/* Camera button */}
        <View style={styles.buttonBackground}>
          <Pressable
              onPress={onTakePicturePressed}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                },
                styles.buttonContainer
              ]}
          />
        </View>
      </View>
    )
}

export default CameraScreen;

const styles = StyleSheet.create({
  buttonContainer : {
    position: 'absolute',
    alignSelf: "center", 
    bottom: 7, 
    width: 60, 
    height: 60, 
    borderRadius: 50,
    opacity: 1,
  },
  buttonBackground : {
    position: 'absolute',
    alignSelf: "center", 
    bottom: 130, 
    width: 75, 
    height: 75, 
    borderRadius: 50,
    opacity: 0.7,
    backgroundColor: '#FFFFFF'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }
})

