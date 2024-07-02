import { useRef, useEffect } from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
} from 'react-native-vision-camera';
import {
  Tensor,
  TensorflowModel,
  useTensorflowModel,
} from 'react-native-fast-tflite'
import { useResizePlugin } from 'vision-camera-resize-plugin'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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

function LiveScreen({ navigation }: any) {
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const camera = useRef<Camera>(null)

    const model = useTensorflowModel(require('../assets/model/model.tflite'))
    const actualModel = model.state === 'loaded' ? model.model : undefined

    useEffect(() => {
      if (actualModel == null) return
      console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`)
    }, [actualModel])

    const { resize } = useResizePlugin()

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
      },
      [actualModel]
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
      </View>
    )
}
export default LiveScreen;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }
})

