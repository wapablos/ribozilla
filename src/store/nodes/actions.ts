import { action } from 'typesafe-actions'
import { FlowElement } from 'react-flow-renderer'
import { NodesActionTypes } from './types'

export const addNode = (nodes: FlowElement) => action(NodesActionTypes.ADD_NODE, nodes)
export const deleteNode = action(NodesActionTypes.DELETE_NODE)
export const loadNodes = action(NodesActionTypes.LOAD_NODES)
