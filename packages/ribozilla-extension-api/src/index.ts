/* eslint-disable max-classes-per-file */
import * as jetpack from 'fs-jetpack'
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv'
import { basename } from 'path'

export interface RibozillaSchema {
    name: string
    version: string
}

const RibozillaValidationSchema: JSONSchemaType<RibozillaSchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    version: { type: 'string' }
  },
  required: ['name', 'version']
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

  // private commands: string[]

  // private categories: Categories[]

  // private cmdId: number

  // private params: IParameter[]

  // private paramsStore: IParameter[][]

  private extensionValidator: RibozillaExtensionValidator

  constructor(software: string, version: string) {
    this.software = software
    this.version = version
    this.extensionValidator = new RibozillaExtensionValidator()
  }

  public generateExtension(dirname?: string, print = true, validate = true) {
    const schema: RibozillaSchema = {
      name: this.software,
      version: this.version
    }

    const dirBasename = basename(`${dirname}`)

    const isValid = this.extensionValidator.validate(schema)

    if (dirname !== undefined) {
      if (validate && !isValid) {
        console.log('\x1b[31mPlease check the extension development or source code!')
        return
      }
      jetpack.cwd(dirname).file(`${dirBasename}.manifest.json`, { content: schema })
      console.info(`\x1b[32mExtension created\n\x1b[36m${dirBasename}.manifest.json -> ${jetpack.path(dirname)}`)
    }

    return schema
  }
}
