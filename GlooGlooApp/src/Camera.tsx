import { useRef, useState, useEffect } from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
    PhotoFile,
} from 'react-native-vision-camera';
import { Pressable, StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function CameraScreen({ navigation }) {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
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
        navigation.navigate('PreviewScreen', { photo: photo, sharedFrame: sharedValue});
    }
    useEffect(() => {
      requestPermission()
    }, [requestPermission])
    
    const sharedFrame = useSharedValue([])
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        sharedFrame = frame
    }, [sharedFrame])

    return (
      <View style={styles.centeredView}>
        {hasPermission && device != null ? (
          <Camera
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={true}
            frameProcessor={frameProcessor}
            pixelFormat="yuv"
            photo={true}
          />
        ) : (
          <Text>No Camera available.</Text>
        )}
          
        <Feather name='maximize' color={'white'} size={180} style={{bottom: 80}}/>


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

