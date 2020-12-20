/* eslint-disable no-underscore-dangle */
import * as jetpack from 'fs-jetpack'

export type Categories = 'alignment' | 'trimming' | 'genindex'
export type ParamsTypes = 'enum' | 'string' | 'boolean'|'number' | 'dir' | 'file'

export interface Input {
  type: ParamsTypes,
  values?:string[]
}

export interface IFlag {
  signature: string[]| string
  label: string
  places: number
  input: Input[]
  required: boolean
  description: string
}

export interface IArgument extends IFlag {
  after?: string
  before?: string
}

export type IParams = Parameters<(type?: ParamsTypes, values?:string[]) => void>

export default class RibozillaExtension {
  private _software: string

  private _version: string

  private _commands: string[]

  private _categories: string[]

  private _flags: IFlag[]

  private _flagsStore: IFlag[][]

  private _arguments: IArgument[]

  private _argumentsStore: IArgument[][]

  /**
   * @param software Nome do software
   * @param version Versão do software
   */
  constructor(software: string, version: string) {
    this._software = software
    this._version = version
    this._categories = []
    this._commands = []
    this._flags = []
    this._flagsStore = []
    this._arguments = []
    this._argumentsStore = []
  }

  /**
  * Para salvar escreva o nome do diretório do software
  * um arquivo com o mesmo nome será criado
  */
  public stringIt(write: boolean, path: string = '.') {
    const schema = {
      name: this._software,
      version: this._version,
      commands: this._commands.map((value, index) => {
        const cmd = {
          name: value,
          category: this._categories[index],
          flags: this._flagsStore[index],
          args: this._argumentsStore[index]
        }
        return cmd
      })
    }

    if (write) {
      jetpack.cwd(path).file(`${path}.json`, { content: schema })
      console.log('\x1b[33m', `Criado o arquivo ${path}.json`)
    }
  }

  public end() {
    this._flagsStore = [...this._flagsStore, [...this._flags]]
    this._flags = []

    this._argumentsStore = [...this._argumentsStore, [...this._arguments]]
    this._arguments = []
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
   * @param signature Forma da flag na linha de comando sem os traços, caso haja
   * @param label Título exibido na interface que se refere a esta flag
   * @param places Quantidade de entradas que a flag recebe, caso nenhum, input deve ser boolean
   * @param input - Tipo da entrada e valores no caso de 'enums'.
   *              - `boolean` se no caso de `places = 0`.
   *              - No caso de `places > 1` cada input é um campo
   * @param required Define se a flag é obrigatória ou não
   * @param description Documentação da flag
   */

  public flag(
    signature: string[] | string,
    label: string,
    places: number,
    input: IParams[],
    required: boolean,
    description: string = 'No description',
  ) {
    let flagin: Input[]

    if (input.length === 0) {
      flagin = [{ type: 'boolean' }]
    } else {
      flagin = input.map((value) => ({
        type: value[0],
        values: value[1]
      }))
    }

    const flag: IFlag = {
      signature,
      label,
      places,
      input: flagin,
      required,
      description
    }

    this._flags = [...this._flags, flag]
    return this
  }

  /**
   * @param signature - Forma do argumento na linha de comando, `default = none`
   *                  - É recomendável definir um ID para faciliar o params `after` e `before`
   * @param label Título exibido na interface que se refere a este argumento
   * @param places
   * @param input
   * @param required
   * @param description
   * @param after Define qual argumento ele procede na ordem da CLI
   * @param after Define qual argumento ele antecede na ordem da CLI
   */
  public argument(
    signature:string[]|string = 'none',
    label:string,
    places:number,
    input: IParams[],
    required:boolean,
    after?: string,
    before?:string,
    description:string = 'No description'
  ) {
    let argin: Input[]

    if (input.length === 0) {
      argin = [{ type: 'boolean' }]
    } else {
      argin = input.map((value) => ({
        type: value[0],
        values: value[1]
      }))
    }

    const argument : IArgument = {
      signature,
      label,
      places,
      input: argin,
      required,
      after,
      before,
      description
    }

    this._arguments = [...this._arguments, argument]
    return this
  }
}
