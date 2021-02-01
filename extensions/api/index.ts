/* eslint-disable no-underscore-dangle */
import * as jetpack from 'fs-jetpack'
import {
  Categories, IParameter, ParamsTypes, InputProps, IInputProps,
  InputTypes, RibozillaSchema, CommandProps
} from './types'

export default class RibozillaExtension {
  private _software: string

  private _version: string

  private _commands: string[]

  private _categories: Categories[]

  private _cmdId: number

  private _params: IParameter[]

  private _paramsStore: IParameter[][]

  /**
   * @param software Nome do software
   * @param version Versão do software
   */
  constructor(software: string, version: string) {
    this._software = software
    this._version = version
    this._categories = []
    this._commands = []
    this._params = []
    this._paramsStore = []
    this._cmdId = 0
  }

  /**
  * Para salvar escreva o nome do diretório do software
  * um arquivo com o mesmo nome será criado
  */
  public stringIt(write: boolean, path: string = '.') {
    const schema : RibozillaSchema = {
      name: this._software,
      version: this._version,
      commands: this._commands.map((value, index) => ({
        name: value,
        cmdId: this.setCmdId(this._software),
        category: this._categories[index],
        params: this._paramsStore[index]
      }))
    }

    if (write) {
      jetpack.cwd(path).file(`${path}.json`, { content: schema })
      console.info('\x1b[33m', `Criado o arquivo ${path}.json`)
    }
  }

  public end() {
    this._paramsStore = [...this._paramsStore, [...this._params]]
    this._params = []
  }

  private setCmdId(name: string): string {
    const id = `${name.toLowerCase()}_${this._cmdId}`
    this._cmdId += 1
    return id
  }

  public command(command: string) {
    this._commands = [...this._commands, command]
    return this
  }

  public category(category: Categories) {
    this._categories = [...this._categories, category]
    return this
  }

  /**
   * @param type Define se o parametro é `flag` ou `argumento`
   * @param signature Forma da flag na linha de comando sem os traços, caso haja
   * @param label Título exibido na interface que se refere a esta flag
   * @param places Quantidade de entradas que a flag recebe, caso nenhum, input deve ser boolean
   * @param input - Tipo da entrada e valores no caso de 'enums'.
   *              - `boolean` se no caso de `places = 0`.
   *              - No caso de `places > 1` cada input é um campo
   * @param required Define se a flag é obrigatória ou não
   * @param description Documentação da flag
   */

  public param(
    type: ParamsTypes,
    signature: string,
    label: string,
    places: number,
    input: InputProps[],
    required: boolean,
    description: string = 'No description',
  ) {
    let paramInput: IInputProps[]

    if (input.length === 0) {
      paramInput = [{ type: InputTypes.BOOLEAN }]
    } else {
      paramInput = input.map((value) => ({
        type: value[0],
        values: value[1]
      }))
    }

    const param: IParameter = {
      type,
      signature,
      label,
      places,
      input: paramInput,
      required,
      description
    }

    this._params = [...this._params, param]
    return this
  }
}
