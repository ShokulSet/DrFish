import { useEffect, useRef } from 'react';
import { useCameraDevice, Camera, useCameraPermission,} from 'react-native-vision-camera';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

function CameraScreen() {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

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
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        /> 
      </View>
    )
}

export default CameraScreen;