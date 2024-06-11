import * as tflite from 'react-native-fast-tflite'
import RNFS from 'react-native-fs'
import * as tf from '@tensorflow/tfjs'
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native'

const fetchImage = async (uri: string) => {
    //const response = await fetch(uri, {}, { isBinary: true })
    
    const img64 = await RNFS.readFile(uri, 'base64')
    
    // const imgBuffer = tf.util.encodeString(img64, 'base64')

    // const rawImageData = await response.arrayBuffer()
    console.log("2")
    // const imageTensor = decodeJpeg(new Uint8Array(rawImageData), 3)
    // console.log("3")
    return null
}

const getPredictions = async ( imageUri: string )=>{
    const model = await tflite.loadTensorflowModel(require('../model/model.tflite'))
    console.log("model")
    const imageTensor = await fetchImage(imageUri)
    console.log("imageTensor")
    // const prediction = await model.run(imageTensor)
    return null
}

export default getPredictions;