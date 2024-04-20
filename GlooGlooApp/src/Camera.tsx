import { useEffect, useRef } from 'react';
import { useCameraDevice, Camera, useCameraPermission, TakePhotoOptions} from 'react-native-vision-camera';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

function CameraScreen() {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)
    
    const onTakePicturePressed = async () => {
        const photo = await camera.current?.takePhoto({
          enableShutterSound: false
        });
        console.log(photo)
        // Magic AI Work then pokedex
    }

    useEffect(() => {
      if (!hasPermission) {
        requestPermission();
      }
    }, [hasPermission]);
  
    if (!hasPermission) {
      return <ActivityIndicator />;
    }
    
    if (!device) {
      return <Text> Camera not found.</Text>
    }

    return (
      <View style={{ flex: 1}}>
        <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        /> 
        <Pressable 
            onPress={onTakePicturePressed}
            style={{
                position: 'absolute',
                alignSelf: "center", 
                bottom: 50, 
                width: 70, 
                height: 70, 
                backgroundColor: 'white',
                borderRadius: 75
            }} 
        />
      </View>
    )
}

const styles = StyleSheet.create

export default CameraScreen;