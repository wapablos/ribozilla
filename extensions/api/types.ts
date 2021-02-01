export enum ParamsTypes {
  FLAG = 'flag',
  ARG = 'arg'
}

export enum Categories {
  ALIGNMET='Alignment',
  TRIMMING='Trimming',
  GENOME_INDEX='Genome index'
}

export enum InputTypes {
  ENUM='enum',
  STRING='string',
  BOOLEAN='boolean',
  NUMBER='number',
  DIR='dir',
  FILE='file'
}

export interface IParameter {
  type: ParamsTypes
  signature: string
  label: string
  places: number
  input: IInputProps[]
  required: boolean
  description: string
  after?: string
  before?: string
}

// A interface e o tipo são para facilitar o desenvolvimento da API
export type InputProps = Parameters<(type?: InputTypes, values?:string[]) => void>

export interface IInputProps {
  type: InputTypes,
  values?:string[]
}

export interface CommandProps {
  name: string
  cmdId: string
  category: Categories
  params: IParameter[]
}

export interface RibozillaSchema {
  name: string
  version: string
  commands: CommandProps[]
}

export interface IRibozillaSchema {
  [id:string]: RibozillaSchema
}
