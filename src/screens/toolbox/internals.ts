import { RibozillaNode } from '@screens/pipeline/internals'
import { ParamsTypes, InputTypes } from '@ribozilla/extension-api'

export function buildCommandLine({ id, data }: RibozillaNode) {
  const { software, command, params } = data
  const struct = params.map(({ type, signature, lastValues, inputs, separator }, index) => {
    switch (type) {
      case ParamsTypes.FLAG:
        console.log(signature, inputs)
        if (inputs[0].type === InputTypes.BOOLEAN) {
          if (`${lastValues[0]}` === 'true') return signature
          return null
        }
        return signature + separator[0] + lastValues.join(separator[1])
      case ParamsTypes.ARG:
        return lastValues.join(separator[0])
      default:
        return signature
    }
  })

  return `${command} ${struct.join(' ')}`
}

export function handleTypeValues(type: InputTypes, lastValues: string) {

}
