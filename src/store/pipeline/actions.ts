import { action } from 'typesafe-actions'
import { PipelineActionTypes, NodeMetadata } from './types'

const addPipelineSoftware = (nodeMeta: NodeMetadata[]) => action(PipelineActionTypes.ADD_NODE, nodeMeta)

export { addPipelineSoftware }
