import * as tf from '@tensorflow/tfjs'
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';

const modelJSON = require('../model/class/model.json')
const modelWeights = require('../model/class/group1-shard1of1.bin')

const loadModel = async ():Promise<void|tf.LayersModel>=>{
    //.ts: const loadModel = async ():Promise<void|tf.LayersModel>=>{
        const model = await tf.loadLayersModel(
            bundleResourceIO(modelJSON, modelWeights)
        ).catch((e)=>{
          console.log("[LOADING ERROR] info:",e)
        })
        return model
}

const transformImageToTensor = async (uri:string):Promise<tf.Tensor>=>{
    //.ts: const transformImageToTensor = async (uri:string):Promise<tf.Tensor>=>{
    //read the image as base64
    const img64 = await FileSystem.readAsStringAsync(uri, {encoding:FileSystem.EncodingType.Base64})
    console.log("img64"+ typeof(img64))
    const imgBuffer =  tf.util.encodeString(img64, 'base64').buffer
    const raw = new Uint8Array(imgBuffer)
    let imgTensor = decodeJpeg(raw)
    const scalar = tf.scalar(255)
    //resize the image
      imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [255, 255])
    //normalize; if a normalization layer is in the model, this step can be skipped
      const tensorScaled = imgTensor.div(scalar)
    //final shape of the rensor
      const img = tf.reshape(tensorScaled, [1,255,255,3])
      return img
}

const makePredictions = async (batch:number, model:tf.LayersModel,imagesTensor:tf.Tensor<tf.Rank>):Promise<tf.Tensor<tf.Rank>[]>=>{
    //.ts: const makePredictions = async (batch:number, model:tf.LayersModel,imagesTensor:tf.Tensor<tf.Rank>):Promise<tf.Tensor<tf.Rank>[]>=>{
    //cast output prediction to tensor
    //const predictionsdata= model.predict(imagesTensor)
    const predictionsdata:tf.Tensor = model.predict(imagesTensor) as tf.Tensor
    let pred = predictionsdata.split(batch) //split by batch size
    //return predictions 
    return pred
}

const getPredictions = async ( image:string )=>{
    await tf.ready()
    const model = await loadModel() as tf.LayersModel
    const tensor_image = await transformImageToTensor(image)
    const predictions = await makePredictions(1, model, tensor_image)
    return predictions
}

export default getPredictions;