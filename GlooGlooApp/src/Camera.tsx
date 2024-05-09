import { useEffect, useRef, useState } from 'react';
import { useCameraDevice, Camera, useCameraPermission, PhotoFile } from 'react-native-vision-camera';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, Modal, } from 'react-native';


function CameraScreen() {
    const { hasPermission, requestPermission } = useCameraPermission()
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
        // Magic AI Work then pokedex
        setModalVisible(true)
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
      
      <View style={styles.centeredView}>
        <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        /> 

        <Pressable 
            onPress={onTakePicturePressed}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              },
              styles.buttonContainer
            ]}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("load Closed")
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.loadView}>
              <Text>Modal testing</Text>
            </View>
          </View>
        </Modal>

      </View>
    )
}

const styles = StyleSheet.create({
  buttonContainer : {
    position: 'absolute',
    alignSelf: "center", 
    bottom: 50, 
    width: 70, 
    height: 70, 
    borderRadius: 75
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  loadView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  }
})

export default CameraScreen;