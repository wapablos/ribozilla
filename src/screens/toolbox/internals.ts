import { RibozillaNode } from '@screens/pipeline/internals'
import { ParamsTypes, InputTypes } from '@ribozilla/clui-api'

// FIX: Os lastsValues estão no formato errado tem um array dentro de um array
export function buildCommandLine({ id, data }: RibozillaNode) {
  const { software, command, params } = data
  const struct = params.map(({ type, signature, lastValues, inputs, separator }, index) => {
    console.log(`${signature} -> ${lastValues}`)
    switch (type) {
      case ParamsTypes.FLAG:
        // console.log(signature, inputs, separator)
        if (inputs[0].type === InputTypes.BOOLEAN) {
          if (`${lastValues[0]}` === 'true') return signature
          return null
        }
        return signature + separator[0] + lastValues.flat(1).join(separator[1])
      case ParamsTypes.ARG:
        return lastValues.flat(1).join(separator[0])
      default:
        return signature
    }
  })

  return `${command} ${struct.join(' ')}`
}

export function handleTypeValues(type: InputTypes, lastValues: string) {

}
