import { useRef, useState, useEffect } from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
    PhotoFile,
} from 'react-native-vision-camera';
import {
  Tensor,
  TensorflowModel,
  useTensorflowModel,
} from 'react-native-fast-tflite'
import { useResizePlugin } from 'vision-camera-resize-plugin'
import { useSharedValue } from 'react-native-worklets-core';
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function tensorToString(tensor: Tensor): string {
  return `\n  - ${tensor.dataType} ${tensor.name}[${tensor.shape}]`
}
function modelToString(model: TensorflowModel): string {
  return (
    `TFLite Model (${model.delegate}):\n` +
    `- Inputs: ${model.inputs.map(tensorToString).join('')}\n` +
    `- Outputs: ${model.outputs.map(tensorToString).join('')}`
  )
}

function CameraScreen({ navigation }: any) {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [photo, setPhoto] = useState<PhotoFile>();
    const camera = useRef<Camera>(null)
    const onTakePicturePressed = async () => {
        const photo = await camera.current?.takePhoto({
          enableShutterSound: false,
          enablePrecapture: true,
          qualityPrioritization: 'quality'
        });
        console.log(`Photo: ${photo}`)
        console.log(`Prediction: ${pred}`)
        navigation.navigate('PreviewScreen', { photo: photo});
    }

    const model = useTensorflowModel(require('../assets/model/model.tflite'))
    const actualModel = model.state === 'loaded' ? model.model : undefined

    useEffect(() => {
      if (actualModel == null) return
      console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`)
    }, [actualModel])

    const { resize } = useResizePlugin()
    let pred = useSharedValue(0)
    const frameProcessor = useFrameProcessor(
      (frame) => {
        'worklet'
        if (actualModel == null) {
          // model is still loading...
          return
        }
  
        // console.log(`Running inference on ${frame}`)
        const resized = resize(frame, {
          scale: {
            width: 224,
            height: 224,
          },
          pixelFormat: 'rgb',
          dataType: 'float32',
        })
        const result = actualModel.runSync([resized])
        const logit = result[0]
        let maxIndex = 0
        for (let i = 0; i < logit.length; i++) {
          if (logit[i] > logit[maxIndex]) {
            maxIndex = i
          }
        }
        pred.value = maxIndex
      },
      [actualModel, pred]
    )
  
    useEffect(() => {
      requestPermission()
    }, [requestPermission])

    console.log(`Model: ${model.state} (${model.model != null})`)

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
          
          {model.state === 'loading' && (
            <ActivityIndicator size="small" color="white" />
          )}

          {model.state === 'error' && (
            <Text>Failed to load model! {model.error.message}</Text>
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

