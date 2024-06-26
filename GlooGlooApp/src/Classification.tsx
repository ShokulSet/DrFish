import {
    Tensor,
    TensorflowModel,
    useTensorflowModel,
} from 'react-native-fast-tflite'
import { useResizePlugin } from 'vision-camera-resize-plugin'

function tensorToString(tensor: tensor): string {
    return '\n - ${tensor.dataType} ${tensor.name}[${tensor.shape}]'
}
function modelToString(model: TensorflowModel): string {
    return (
        `TFLite Model (${model.delegate}):\n` +
        `- Inputs: ${model.inputs.map(tensorToString).join('')}\n` +
        `- Outputs: ${model.outputs.map(tensorToString).join('')}`
    )
}

const getClassify = async ( sharedFrame )=>{
    consolge.log('getClassify')
    const model = useTensorflowModel(require('../assets/model/model.tflite'))
    console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`)
    const resized = useResizePlugin(sharedFrame, {
        scale: {
            width: 244,
            height: 244,
        },
            pixelFormat: 'rgb',
            dataType: 'uint8',
        })
    const result = model.runSync([resized])
    return result
}

export default getClasify;
