import { useRef, useState, useEffect } from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
    PhotoFile,
    runAtTargetFps
} from 'react-native-vision-camera';
import {
  Tensor,
  TensorflowModel,
  useTensorflowModel,
} from 'react-native-fast-tflite'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useResizePlugin } from 'vision-camera-resize-plugin'
import { useSharedValue } from 'react-native-worklets-core';
import { Pressable, StyleSheet, Text, View, ActivityIndicator, Switch } from 'react-native';
import { getDBconnection, getFishLabel } from '../services/DBManager';
import AgreementModal from './AgreementModal';

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
    const [isLive, setIsLive] = useState(false);
    const [value, setValue] = useState(0)
    const camera = useRef<Camera>(null)
    const onTakePicturePressed = async () => {
      const photo = await camera.current?.takePhoto({
          enableShutterSound: false,
          enablePrecapture: true,
          qualityPrioritization: 'quality'
        });
        navigation.navigate('PreviewScreen', { photo: photo, label: label, id: pred.value});
    }

    const model = useTensorflowModel(require('../../assets/model/model.tflite'))
    const actualModel = model.state === 'loaded' ? model.model : undefined

    useEffect(() => {
      if (actualModel == null) return
      console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`)
    }, [actualModel])

    const { resize } = useResizePlugin()
    let pred = useSharedValue(0)
    let isloading = useSharedValue(false)
    const frameProcessor = useFrameProcessor(
      (frame) => {
        'worklet'
        if (!actualModel) {
            console.error('Model is not loaded yet');
            return;
        }
        runAtTargetFps(1, () => {
          'worklet'
          isloading.value = true
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
          // console.log(`Prediction: ${maxIndex}`)
        })
      },
      [pred, isloading, actualModel]
    )
    
    const [label, setLabel] = useState('')
    useEffect(() => {
      const intervalId = setInterval(() => {
        getDBconnection().then((db) => {
          getFishLabel(db, pred.value).then(([results]) => {
            //console.log(results.rows.item(0)["Common name"])
            setLabel(results.rows.item(0)["CommonName"])
            })
            .catch((error) => 
            console.error(error)
          )
        }).catch((error) =>
          console.error(error)
      )
      }, 1000);
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
      requestPermission()
    }, [requestPermission])

    // console.log(`Model: ${model.state} (${model.model != null})`)

    return (
      <View style={styles.centeredView}>
        <AgreementModal />
        {hasPermission && device != null ? (
          <Camera
            ref={camera}
            device={device}
            style={styles.cameraContainer}
            isActive={true}
            frameProcessor={frameProcessor}
            pixelFormat="yuv"
            photo={true}
            enableZoomGesture={true}
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

        {/* <Feather name='maximize' color={'white'} size={180} style={{bottom: 80}}/> */}

        
        { isLive ? (
          // check if loaded
          isloading.value ? (
            <View style={styles.liveContainer}>
              <Text style={{color: 'white', fontFamily:'Dangrek-Regular', fontSize: 30}}>
              {label}
              </Text>
            </View>
          ) : (
            <View style={styles.liveContainer}>
              <Text style={{color: 'white', fontFamily:'Dangrek-Regular', fontSize: 30}}>
              Loading...
              </Text>
            </View>
          )
        ) : (
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
        )}


        <View
          style={styles.changeModeContainer}
        >
          <Pressable
            onPress={() => {setIsLive(!isLive)}}
            style={({pressed}) => [
              {
                width: 55,
                height: 55,
                borderRadius: 50,
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#F0EFEF'
              },
              
            ]}
          >

            { isLive ? 
              <FontAwesome5 name="camera" size={30} style={styles.centered} />            
            :
              <FontAwesome5 name="video" size={30} style={styles.centered} />
            }
          </Pressable>
        </View>
      </View>
    )
}

export default CameraScreen;
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#2E3069',
  },
  cameraContainer: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: -25, 
    bottom: 0,
    objectFit: 'cover',
  },
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
  changeModeContainer : {
    position: 'absolute',
    alignSelf: "center",
    bottom: 135,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#F0EFEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)'
  },
 centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  liveContainer: {
    position: 'absolute',
    alignSelf: "center",
    top: 10,
    width: "auto",
    paddingHorizontal: 20,
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
})