/* eslint-disable no-unused-vars */
export enum PipelineActionTypes {
  ADD_NODE='@@pipeline/ADD_NODE'
}

export interface NodeMetadata {
  id: string
  softwareName: string
  cmdId: string
}

export interface PipelineState {
  readonly nodeId: number
  readonly data: NodeMetadata[]
}
