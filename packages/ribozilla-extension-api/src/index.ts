/* eslint-disable max-classes-per-file */
import * as jetpack from 'fs-jetpack'
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv'
import { basename } from 'path'

export enum RequiredTypes {
  COMMON_IN = 'common/in',
  COMMON_OUT = 'common/out',
  MAIN_IN = ' main/in',
  MAIN_OUT = 'main/out',
  REQ_IN = 'req/in',
  REQ_OUT = 'req/out'
}

export enum ParamsTypes {
  FLAG = 'flag',
  ARG = 'arg'
}

export enum InputTypes {
  ENUM='enum',
  STRING='string',
  BOOLEAN='boolean',
  NUMBER='number',
  DIR='dir',
  FILE='file'
}

export enum Categories {
  ALIGNMENT='Alignment',
  TRIMMING='Trimming',
  GENOME_INDEX='Genome Index',
  QUALITY_ASSESSMENT='Quality Assessment',
  OTHER='Other'
}

export interface InputProps {
  type: InputTypes,
  values?:string[]
}

export interface IParameter {
  type: ParamsTypes
  signature: string
  label: string
  places: number
  inputs: InputProps[]
  isRequired: RequiredTypes
  description: string
}
export interface CommandProps {
  name: string
  id: string
  category: Categories
  params: IParameter[],
}

export interface RibozillaSchema {
  name: string
  version: string
  commands: CommandProps[]
}

const RibozillaValidationSchema: JSONSchemaType<RibozillaSchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    version: { type: 'string' },
    commands: { type: 'array',
      items: { type: 'object',
        properties: {
          name: { type: 'string' },
          id: { type: 'string' },
          category: { type: 'string', enum: Object.values(Categories).map((value) => value) },
          params: { type: 'array',
            items: {
              type: 'object',
              properties: {
                type: { type: 'string', enum: [ParamsTypes.ARG, ParamsTypes.FLAG] },
                signature: { type: 'string' },
                label: { type: 'string' },
                places: { type: 'integer' },
                inputs: { type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string', enum: [InputTypes.BOOLEAN, InputTypes.DIR, InputTypes.ENUM, InputTypes.FILE, InputTypes.NUMBER, InputTypes.STRING] },
                      values: { type: 'array',
                        nullable: true,
                        items: {
                          type: 'string'
                        } }
                    },
                    required: ['type']
                  } },
                isRequired: { type: 'string', enum: Object.values(RequiredTypes).map((value) => value) },
                description: { type: 'string' }
              },
              required: ['type', 'label', 'places', 'signature', 'inputs']
            } }
        },
        required: ['name', 'id', 'category', 'params'] } }
  },
  required: ['name', 'version', 'commands']
}

export class RibozillaExtensionValidator {
  private ajv: Ajv

  private jsonValidator: ValidateFunction<RibozillaSchema>

  constructor() {
    this.ajv = new Ajv()
    this.jsonValidator = this.ajv.compile(RibozillaValidationSchema)
  }

  public validate(data: any) {
    return this.jsonValidator(data)
  }
}

export default class RibozillaExtension {
  private software: string

  private version: string

  private commands: string[]

  private categories: Categories[]

  private idNumber: number

  private params: IParameter[]

  private paramsStore: IParameter[][]

  private extensionValidator: RibozillaExtensionValidator

  constructor(software: string, version: string) {
    this.software = software
    this.version = version
    this.commands = []
    this.categories = []
    this.idNumber = 0
    this.params = []
    this.paramsStore = []
    this.extensionValidator = new RibozillaExtensionValidator()
  }

  public generateExtension(filename: string, dirname: string, print = true, validate = true) {
    const schema: RibozillaSchema = {
      name: this.software,
      version: this.version,
      commands: this.commands.map((value, index) => ({
        name: value,
        id: this.setId(value),
        category: this.categories[index] ? this.categories[index] : Categories.OTHER,
        params: this.paramsStore[index]
      }))
    }

    const isValid = this.extensionValidator.validate(schema)

    if (print) console.log(schema)

    if (dirname !== undefined) {
      if (validate && !isValid) {
        console.log('\x1b[31mPlease check the extension development or source code!')
        return
      }
      jetpack.cwd(dirname).file(`${filename}.manifest.json`, { content: schema })
      console.info(`\x1b[32mExtension created\n\x1b[36m${filename}.manifest.json -> ${jetpack.path(dirname)}`)
    }
  }

  private setId(name: string) {
    const id = `${this.software}-${name}-${this.idNumber}`.replace(/\W+(?!$)/g, '-').toLowerCase()
    this.idNumber += 1
    return id
  }

  public command(command: string) {
    this.commands = [...this.commands, command]
    return this
  }

  public category(category: Categories) {
    this.categories = [...this.categories, category]
    return this
  }

  /**
   * @param type `flag | argument`
   * @param signature Flag on command line
   * @param label Flag title on GUI
   * @param places Input qty of each flag
   *               - For `places = 0` `input` types must be `boolean | enum`
   *                -- For `enum` values are the available options
   *                -- For `boolean` values are empty array (`[]`)
   *               - For `places = -1` `input` define type and values are user-defined on GUI
   *               - For `places >= 1` `input` define each type and values
   * @param inputss  Input type and values of each place
   * @param required Flag is require `true | false`
   * @param description Flag information
   */

  public param(type: ParamsTypes, signature: string, label: string, places: number, inputs: [InputTypes, string[]?][], isRequired = RequiredTypes.COMMON_IN, description = 'No description') {
    const handleInputs = () : InputProps[] => {
      if (inputs.length === 0) return [{ type: InputTypes.BOOLEAN }]

      return inputs.map((input) => ({
        type: input[0],
        values: input[1]
      }))
    }

    const inputProps = handleInputs()

    const param: IParameter = { type, signature, label, places, inputs: inputProps, isRequired, description }
    this.params = [...this.params, param]
    return this
  }

  public end() {
    this.paramsStore = [...this.paramsStore, [...this.params]]
    this.params = []
  }
}
