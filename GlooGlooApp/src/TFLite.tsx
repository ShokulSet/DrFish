import * as tf from 'react-native-fast-tflite'

const getPredictions = async ( image: any )=>{
    const model = await tf.loadTensorflowModel(require('../model/model.tflite'))
    const prediction = await model.run(image)
    return prediction
}

export default getPredictions;